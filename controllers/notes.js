// controller - notes
//require model + script
var scrape = require("../scripts/scrape.js");
var generateDate = require("../scripts/date.js");
var Note = require("../models/Note.js");

module.exports = {
	get: function(data, callback){
		Note.find({
			ArticleId: data._id
		}, callback);
	},
	//save note
	save: function(data, callback){
		//new note with note model
		var newNote = {
			ArticleId: data._id,
			date: generateDate(),
			noteText: data.noteText
		};

		//save to mongoDB
		Note.create(newNote, function(err, doc){
			if(err){
				console.log(err);
			}
			else{
				console.log(doc);
				callback(doc);
			}
		});
	},
	delete: function(data, callback){
		//remove note from mongoDB
		Note.remove({
			_id: data._id
		}, callback);
	}
};