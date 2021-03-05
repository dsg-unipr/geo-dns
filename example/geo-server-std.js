const udp    = require('dgram');
const dns    = require('../');
const Packet = require('../packet');


var instances = {
  'humidity.dr12': '_iot._udp',
  'temperature.dr34': '_iot._udp',
  'temperature.dr56': '_iot._udp',
};
const instancekeys = Object.keys(instances);
const instancevalues = Object.values(instances);

var domains = {
  'humidity.dr12._iot._udp': 'dr12.unipr.it',
  'temperature.dr34._iot._udp': 'dr34.unipr.it',
  'temperature.dr56': 'dr56.unipr.it',
};
const domainkeys = Object.keys(domains);

var hosts = {
  'dr12.unipr.it': '160.78.28.201',
  'dr34.unipr.it': '160.78.28.202',
  'dr56.unipr.it': '160.78.28.203',
};
//const hostkeys = Object.keys(hosts);

// from https://github.com/sunng87/node-geohash
//var geohash = require('ngeohash');
//console.log(geohash.encode(40.689247, -74.044502));
//var latlon = geohash.decode('6gkzwgjzn820');
//console.log(latlon.latitude);
//console.log(latlon.longitude);

const server = dns.createServer(function(request, send){

  var query = request.questions[0].name;
  var type = request.questions[0].type;
  //console.log('> request %s of type %s', query, type);
  //console.log(Packet.TYPE.SRV);

  var querytokens = query.split(".");
  //console.log('querytokens[0] = %s', querytokens[0]);

  // TODO:
  // - match query with database, using geo discovery (currently done in memory)

  var response = new Packet(request);
  response.header.qr = 1;
  response.header.ra = 1;
  response.additionals = [];

  if (type === Packet.TYPE.SRV)
  {
    // case of query with single target
    if (!querytokens[0].includes("*"))
    {
      if (domains[query])
      {
        response.answers.push({
          name: query,
          type: Packet.TYPE.SRV,
          class: Packet.CLASS.IN,
          ttl: 100,
          priority: 10,
          weight: 20,
          port: 8080,
          target: domains[query] + '.'
        });
        response.answers.push({
          name: query,
          type: Packet.TYPE.TXT,
          class: Packet.CLASS.IN,
          ttl: 100,
          data: 'bla bla'
        });
      }
    }
    // case of query with wildcard
    else
    {
      var x;
      for (x of domainkeys)
      {
        //console.log('x = %s', x);
        var xtokens = x.split(".");
        //console.log('xtokens[0] = %s', xtokens[0]);
        if (xtokens[0].match(querytokens[0]))
        {
          response.answers.push({
            name: x,
            type: Packet.TYPE.SRV,
            class: Packet.CLASS.IN,
            ttl: 100,
            priority: 10,
            weight: 20,
            port: 8080,
            target: domains[x] + '.'
          });
          response.answers.push({
            name: x,
            type: Packet.TYPE.TXT,
            class: Packet.CLASS.IN,
            ttl: 100,
            data: 'bla bla'
          });
        }
      }
    }
  }
  else if (type === Packet.TYPE.PTR)
  {
    var x;
    var i = 0;
    for (x of instancevalues)
    {
      //if (x === query)
      if (query.includes(x))
      {
        response.answers.push({
          name: query,
          type: Packet.TYPE.PTR,
          class: Packet.CLASS.IN,
          ttl: 100,
          //domain: instancekeys[i] + '.' + query,
          domain: instancekeys[i] + '.' + x,
        });
      }
      i++;
    }
  }
  else if (type === Packet.TYPE.A)
  {
    if (hosts[query])
    {
      response.answers.push({
        name: query,
        type: Packet.TYPE.A,
        class: Packet.CLASS.IN,
        ttl: 100,
        address: hosts[query],
      });
    }
  }

  send(response);

}).listen(53);
