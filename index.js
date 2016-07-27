var restify = require('restify');
var server = restify.createServer();
server.name = 'Slack Birthday';
var fs = require('fs');
var request = require('request');
var schedule = require('node-schedule');

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

// modules
server.use(restify.bodyParser({mapParams: true}));

server.listen(80, function(){
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
		if( req.params.token === slack.slash_token ){
			next();
		} else {
			res.status(401);
			res.send('Wrong token');
		}
	},
	// deal with query
	function(req, res, next) {
		res.send('WIP');
	}
);


// ===== Notify slack chat room ===== //
var job = schedule.scheduleJob({
	hour: slack.notification_hour,
	minute: slack.notification_minute
}, checkAndNotify);

function checkAndNotify(){
	// 1. check birthdays  and populate an array of matches
	var matches = [];
	var today = new Date();

	data.forEach(function(member){
		var birthday = new Date(member.birthday);
		if(birthday.getDate() === today.getDate() && birthday.getMonth() === today.getMonth()){
			matches.push(member);
		}
	});

	// 2. build message
	if (matches.length >0){
		var msg = '';
		matches.forEach(function(match){
			msg += 'It\'s ' +match.name+ '\'s birthday ! \n';
		});

		// 3. send message to slack
		var options = {
			url: slack.incoming_webhook_url,
			body: JSON.stringify({text: msg})
		};
		request.post(options, function(err, httpResponse, body){
			if(err){
				console.error('Could not post birthdays to slack', err);
			} else {
				console.log('Successfully posted birthdays to slack');
			}
		});
	}
}
