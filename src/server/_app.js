import bee from 'beeline';
import nedb from 'nedb';
import path from 'path';
import {createServer} from 'http';
import querystring from 'querystring';

const port = 7000;

let database = new nedb({
	filename: path.resolve(__filename, '../../../db/highscores.db'),
	autoload: true
});

function cors(res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

let router = bee.route({
	'/': function(req, res) {
		cors();
		res.writeHead(200);
		res.end();
	},

	'/highscores': {
		'OPTIONS': function(req, res) {
			cors(res);
			res.writeHead(200);
			res.end();
		},

		'GET': function(req, res) {
			console.log('GET /highscore');

			cors(res);
			database.find({}).sort({ score: -1 }).limit(10).exec((err, highscores) => {
				let body = JSON.stringify(highscores);

				res.setHeader('Content-Type', 'application/json');
				res.write(body);
				res.end();
			});
		},

		'POST PUT': function(req, res) {
			console.log('POST /highscore');

			var data = '';

			req.on('data', (chunk) => {
				data += chunk.toString();
			});

			req.on('end', () => {
				cors(res);
				console.log(data);
				let form = querystring.parse(data);

				let username = form.username;
				let score = parseInt(form.score, 10);

				if(username && score) {
					database.insert({ username: username, score: score }, (err) => {
						if(err) {
							console.error(err);
						}
					});

					res.end();
				}
				else {
					console.log('no data');
					res.writeHead(400);
					res.end();
				}
			});
		}
	} 
});

let server = createServer(router);

server.listen(port, () => {
	console.log('Server is listening on port %s', port);
});