/*jshint node:true*/

var Twitter = require('./public/js/twitter'), // returns singleton instance
	Cloudify = require('./public/js/cloudify'),
	LoremIpsum = require('./public/js/loremipsum');

exports.index = function(req, res) {
	res.render("index.html");
}
	
exports.twitter = function(req, res){

	queryString = req.param("query");
	if (!queryString) {
		queryString = "from:breakingnews";
	}
	
	//TODO lang: 'en', result_type: 'popular'
	Twitter.search(queryString+" exclude:retweets", { count: 100 }, function(data) {
		parameters = {
			data: data.statuses,
			textExtractFn: function(s) { return s.text; },
			idExtractFn: function(s) { return s.id; }
		};
		cloudified = Cloudify(parameters);
		cloudified.data = data.statuses;
		res.json(cloudified);
	});
}

exports.loremipsum = function(req, res){

	queryString = req.param("query");
	if (queryString) {
		queryArray = queryString.split(' ');
	} else {
		queryArray = [];
	}

	content = LoremIpsum();
	parameters = {
		data: content,
		query: queryArray,
		textExtractFn: function(s) { return s; },
		idExtractFn: function(s) { return s; }
	};
	cloudified = Cloudify(parameters);
	cloudified.data = content;
	res.json(cloudified);
}

exports.login = function(req, res){
	res.json("login"); //TODO
}