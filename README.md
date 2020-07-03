# geo-dns

> A DNS server supporting geographic service requests

### Installation

Clone the repository and run

```bash
$ npm install
```

in the main folder.


### Run the Server

```bash
$ cd example
$ node  geo-server.js
```

### Test the Server

```bash
$ dig @127.0.0.1 -p 53 _iot._udp -t PTR
```

```bash
$ dig @127.0.0.1 -p 53 6gkzwgjz*._iot._udp -t SRV
```

```bash
$ dig @127.0.0.1 -p 53 6gkzwgjz.unipr.it -t A
```

### Relevant Specifications

+ [RFC-1034 - Domain Names - Concepts and Facilities](https://tools.ietf.org/html/rfc1034)
+ [RFC-1035 - Domain Names - Implementation and Specification](https://tools.ietf.org/html/rfc1035)
+ [RFC-2782 - A DNS RR for specifying the location of services (DNS SRV)](https://tools.ietf.org/html/rfc2782)
+ [RFC-6763 - DNS-Based Service Discovery](https://tools.ietf.org/html/rfc6763)

