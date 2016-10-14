var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Salut tout le monde !');
});
//process.env.PORT est le port d'écoute 
server.listen(process.env.PORT);

