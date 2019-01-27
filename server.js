var express = require('express');
var dns = require('dns');
var os = require('os');
var app = express();

app.use( express.static(__dirname + "/dist") );

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});
app.get('/api2', function (req, res) {
  res.send({
    "request" : 1,
    "request_2" : "test",
  });
});

let serverPort = 8080;
if (process.argv && process.argv.length) {
  process.argv.forEach((val) => {
    const args = val.split(/=/);
    if (args && args.length === 2) {
      const name = args[0];
      const value = args[1];

      switch (name) {
        case 'port':
          serverPort = value;
          break;
      }
    }
  });
}

var ifaces = os.networkInterfaces(),
  ipAddresses = null;

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;
  if ( ipAddresses !== null ){
    return;
  }

  ifaces[ifname].forEach( function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }
    if ( ipAddresses !== null ){
      return;
    }
    ipAddresses = iface.address + ":" + serverPort;
  } );
});

app.listen(serverPort, () => {
  var str = `Node Server started: \nlocalhost:${serverPort}`;
  dns.lookup(os.hostname(), function (err, add, fam) {
    console.log(ipAddresses)
    console.log(str + '\n' + ipAddresses + '\n' + add + ":" + serverPort);
  } );
});

