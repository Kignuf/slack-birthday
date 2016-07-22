var restify = require('restify');
var server = restify.createServer();
server.name = 'Slack Birthday';
var fs = require('fs');

// load config file
try {
	var slack = require('./config/slack.json');
} catch(err) {
	console.log('Please create a slack.json file in ./config folder, based upon slack.example.json');
	process.exit(0);
}

// Load data file
try {
	var data = require('./data/data.json');
} catch(err) {
	fs.writeFile('./data/data.json', '[]', function(err){
		if (err){
			console.error('Fatal! Couldn\'nt create data.json file.', err);
			process.exit(0);
		}
	});
}

server.listen(8080, function(){
	console.log('%s listening at %s', server.name, server.url);
});

server.get('/', function(req, res, next){
	res.send('Hello world');
});

// ===== Routing ===== //

// route that is called by slack "slash command" integration
server.post('/',
	// verify query comes from the right slash integration
	function(req, res, next){
		if( req.body.token === slack.token ){
			next();
		} else {
			res.status(401).send('Wrong token');
		}
	},
	// deal with query
	function(req, res, next) {
		res.send('WIP');
	}
);


// ===== Notify slack chat room ===== //
