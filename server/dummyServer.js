var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
  var fileName = "Ref_02_preference_mbl.json";
  if (req && req.url) {
    if (req.url.includes('get-data')) {
      fileName = 'sampleData.json';
    }
  }

  if (req.url.includes('get-data')) {
    fs.readFile(fileName, function (err, data) {
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, OPTIONS, HEAD, PUT, POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': 'http://localhost:8100'
      });
      res.write(data);
      res.end();
    });
  } else {
    fs.readFile(fileName, function (err, data) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(data);
        res.end();
      }
    );
  }

}).listen(8887);
