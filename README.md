# geo-dns

> A DNS server supporting geographic service requests

### Installation

Clone the repository and run

```bash
$ npm install
```

in the main folder.


### Run the simple standalone server

```bash
$ cd example
$ node  geo-server-std.js
```

### Test the simple standalone server

```bash
$ dig @127.0.0.1 -p 53 _dr._iot._udp -t PTR
```

```bash
$ dig @127.0.0.1 -p 53 dr56.unipr.it -t A
```

### Run the server with Redis database

Install Redis (if you don't have it yet): https://redis.io/

Run Redis with default configuration (it will listen on port 6379).

Then:

```bash
$ npm install redis
$ cd example
$ node  geo-server-redis.js
```

You can test it using the same dig commands listed above.


### Relevant Specifications

+ [RFC-1034 - Domain Names - Concepts and Facilities](https://tools.ietf.org/html/rfc1034)
+ [RFC-1035 - Domain Names - Implementation and Specification](https://tools.ietf.org/html/rfc1035)
+ [RFC-2782 - A DNS RR for specifying the location of services (DNS SRV)](https://tools.ietf.org/html/rfc2782)
+ [RFC-6763 - DNS-Based Service Discovery](https://tools.ietf.org/html/rfc6763)

