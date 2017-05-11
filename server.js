var express = require('express');
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

var serverPort = 8080;
app.listen(serverPort, function () {
  console.log("Node Server started on localhost:" + serverPort);
});
