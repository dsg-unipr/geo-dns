const udp    = require('dgram');
const dns    = require('../');
const Packet = require('../packet');

const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

// instances
client.del("instance:_iot._udp");
client.rpush("instance:_iot._udp", "6gkzwgjz");
client.rpush("instance:_iot._udp", "6gkzwgjzn820");

// domains
client.set("domain:6gkzwgjzn820._iot._udp", "6gkzwgjzn820.unipr.it", redis.print);
client.set("domain:6gkzwgjz._iot._udp", "6gkzwgjz.unipr.it", redis.print);
var domainkeys = [];
client.keys("domain:*", function(err, reply) {
  domainkeys = reply;
});

// hosts
client.set("host:6gkzwgjzn820.unipr.it", "160.78.28.201", redis.print);
client.set("host:6gkzwgjz.unipr.it", "160.78.28.202", redis.print);


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

  var response = new Packet(request);
  response.header.qr = 1;
  response.header.ra = 1;
  response.additionals = [];


  if (type === Packet.TYPE.PTR)
  {
    // get list using instance:query as key
    //console.log(query);
    client.llen("instance:"+query, function(err, num) {
      client.lrange("instance:"+query, 0, num, function(err, reply) {
        // reply is null when the key is missing
        if (!!reply)
        {
          for (r of reply)
          {
            response.answers.push({
              name: query,
              type: Packet.TYPE.PTR,
              class: Packet.CLASS.IN,
              ttl: 100,
              domain: r + '.' + query,
            });
          }
          send(response);
        }
      });
    });
  }

  else if (type === Packet.TYPE.SRV)
  {
    var target;
    // case of query with single target
    if (!querytokens[0].includes("*"))
    {
      //console.log(query);
      client.get("domain:"+query, function(err, reply) {
        // reply is null when the key is missing
        if (!!reply)
        {
          //console.log(reply);
          var replytokens = reply.split(":");
          response.answers.push({
            name: query,
            type: Packet.TYPE.SRV,
            class: Packet.CLASS.IN,
            ttl: 100,
            priority: 10,
            weight: 20,
            port: 8080,
            target: reply + '.'
          });
          response.answers.push({
            name: query,
            type: Packet.TYPE.TXT,
            class: Packet.CLASS.IN,
            ttl: 100,
            data: 'bla bla'
          });
          send(response);
        }
      });
    }
    // case of query with wildcard
    else
    {
      var completedTasks = 0;
      var x;
      for (x of domainkeys)
      {
        //console.log('x = %s', x);
        var xtokens = x.split(".");
        //console.log('xtokens[0] = %s', xtokens[0]);
        //console.log('querytokens[0] = %s', querytokens[0]);
        if (xtokens[0].match(querytokens[0]))  // TODO check this carefully
        {
          client.get(x, function(err, reply) {
            // reply is null when the key is missing
            //console.log(reply);
            if (!!reply)
            {
              response.answers.push({
                name: query,
                type: Packet.TYPE.SRV,
                class: Packet.CLASS.IN,
                ttl: 100,
                priority: 10,
                weight: 20,
                port: 8080,
                target: reply + '.'
              });
              response.answers.push({
                name: query,
                type: Packet.TYPE.TXT,
                class: Packet.CLASS.IN,
                ttl: 100,
                data: 'bla bla'
              });
              //checkIfComplete(domainkeys.length, response);
              completedTasks++;
              if (completedTasks == domainkeys.length) {
                send(response);
              }
            }
          });
        }
      }
    }
  }

  else if (type === Packet.TYPE.A)
  {
    //console.log(query);
    client.get("host:"+query, function(err, reply) {
      // reply is null when the key is missing
      //console.log(reply);
      if (!!reply)
      {
        response.answers.push({
          name: query,
          type: Packet.TYPE.A,
          class: Packet.CLASS.IN,
          ttl: 100,
          address: reply,
        });
        send(response);
      }
    });
  }

  //send(response);

}).listen(53);
