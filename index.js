var express = require('express');
var bodyParser = require('body-parser');
var Twit = require('twit');

var app = express();

app.use(express.static('./public'));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var T = new Twit({
	consumer_key: '',
	consumer_secret: '', 
	access_token: '', 
	access_token_secret: ''
});

app.set('view engine', 'ejs');

app.get('/', function(req,res){
	res.render('index');
});

app.post('/search-success', urlencodedParser, function(req, res){
	var tweets = [];
	if (req.body.search == ''){
		req.body.search = 'cats';
	}
	T.get('search/tweets', {q: req.body.search, count: 10}, function(err, data, response){
		data.statuses.forEach(function(status){
			tweets.push(status.text);
		});
		res.render('search-success', {data: req.body, tweets: tweets });
	});
});

app.listen(3000, function(){
	console.log("Now listening to port 3000");
});