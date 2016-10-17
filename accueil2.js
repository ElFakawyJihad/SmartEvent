var http=require('http');
var url=require('url');
var bonjour=require('./bonjour');
var querystring=require('querystring');
var lancementFonction=function(req,res){
	bonjour.bonjour();
	bonjour.aurevoir();
	var page=url.parse(req.url).pathname;
	var params=querystring.parse(url.parse(req.url).query);
	res.writeHead(200,{"Content-Type":"text/plain"});
	if (page=="/"){
		if ('prenom' in params && 'nom' && params){
			console.log(params['prenom']);
			console.log(params['nom']);
			res.write('Vous vous appelez '+params['prenom']+' '+params['nom']);
		}
		else{
		res.write('Vous êtes à l accueil');
		}
	}
	else if (page=="/Test"){
		res.write('Vous êtes sur Test');
	}
	else{
		res.writeHead(404,{"Content-Type":"text/plain"});
		res.write('Pas Ok');
	}
	res.end();
}
var markdown = require('markdown').markdown;

console.log(markdown.toHTML('Un paragraphe en **markdown** !'));
var server=http.createServer(lancementFonction);
server.listen(process.env.PORT);
