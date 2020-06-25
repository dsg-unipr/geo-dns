# geo-dns 

![NPM version](https://img.shields.io/npm/v/dns2.svg?style=flat)
[![Build Status](https://travis-ci.org/song940/node-dns.svg?branch=master)](https://travis-ci.org/song940/node-dns)

> A DNS server with geo-features, based on dns2

### How to use it (on Linux / MacOS machines)

Clone the whole repository, then enter the main folder and run 

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


### MIT license

Copyright (c) 2016 lsong

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS," WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
