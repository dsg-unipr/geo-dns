# geo-dns 

![NPM version](https://img.shields.io/npm/v/dns2.svg?style=flat)
[![Build Status](https://travis-ci.org/song940/node-dns.svg?branch=master)](https://travis-ci.org/song940/node-dns)

> A DNS server with geo-features, based on dns2

### How to use it (on Linux / MacOS machines)

Clone the whole repository, then enter the main folder and install dependencies by

```bash
$ npm install
```

Then enter the example folder and run

```bash
$ node geo-server.js
```

Finally, test the server using dig:

```bash
$ dig @127.0.0.1 -p 53 6gkzwgjz*._iot._udp.unipr.it -t ptr
```

### Relevant Specifications

+ [RFC-1034 - Domain Names - Concepts and Facilities](https://tools.ietf.org/html/rfc1034)
+ [RFC-1035 - Domain Names - Implementation and Specification](https://tools.ietf.org/html/rfc1035)
+ [RFC-2782 - A DNS RR for specifying the location of services (DNS SRV)](https://tools.ietf.org/html/rfc2782)
+ [RFC-6763 - DNS-Based Service Discovery](https://tools.ietf.org/html/rfc6763)


