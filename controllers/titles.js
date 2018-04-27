//controller - titles

//scrape tools
var scrape = require("../scripts/scrape.js");
var generateDate = require("../scripts/date.js");
//models
var Article = require("../models/Article.js");
var Note = require("../models/Note.js");

module.exports = {
	fetch: function(callback){
		//run scrape function
		scrape(function(data){
			//data = article objects
			var articles = data;
			for(var i = 0; i<articles.length; i++){
				//date for article object
				articles[i].date = generateDate();
				//don't automatically save
				articles[i].saved = false;
			}
			//Mongo insertMany method
			Article.collection.insertMany(articles, { ordered: false }, function(err, docs){
				callback(err, docs);
			});
		});
	},
	delete: function(query, callback){
		Article.remove(query, callback);
	},
	get: function(query, callback){
		//data scraped
		Article.find(query)
		//sort
		.sort({
			_id: -1
		})
		//execute query
		.exec(function(err, doc){
			callback(doc);
		});
	},
	update: function(query, callback){
		Article.update({ _id: query._id}, {
			$set: query
		}, {}, callback);
	}
};
