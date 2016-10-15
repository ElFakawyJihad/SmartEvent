var http = require('http');

var server = http.createServer(function(req, res) {
  //Ecrire dans le Head,retour OK et type du renvoie
  res.writeHead(200,{"Content-Type": "text/html"});
  res.end('<p>Voici un paragraphe <strong>HTML</strong>! </p>');
});
//process.env.PORT est le port d'écoute 
server.listen(process.env.PORT);

