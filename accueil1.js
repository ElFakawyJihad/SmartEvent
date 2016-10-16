var http = require('http');
var url = require('url');
var server = http.createServer(function(req, res) {
	var page=url.parse(req.url).pathname;
	console.log(page);
    res.writeHead(200, {"Content-Type": "text/html"});
    if (page=='/test'){
    res.write('Bien le Bonjour Test');
    }
    else if (page=='/plage'){
     res.write('On est dans la plage')
    }
    else {
    res.write("Le Reste")	
    }
    res.end();
});
//process.env.PORT est le port d'écoute 
server.listen(process.env.PORT);

