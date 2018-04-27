//scrape

// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

//function scrapes buzzfeed
var scrape = function(callback){
	//grab the body of the html with request
	request("https://www.buzzfeed.com/news", function(error, response, html){
		//then load into cherrio and save it to $ fir a shorthand selector
		var $ = cheerio.load(html);
		//save article info in array
		var results = [];
		//find and loop through each element that has the "js-card_content" class 
		//section holding the articles
		$(".js-card_content").each(function(i, element){
			//grab children within the h2 tag
			//grab inner text and store it in h2_title var
			var h2_title = $(this).children("h2").text().trim();
			//grab children with the class "js-card_desciption"
			//grab inner text and store it in summary var
			var summary = $(this).children(".js-card_desciption").text().trim();

			//make sure both h2_title and summary are present
			if(h2_title && summary){
				//following removes extra (lines/spacing/tabs)
				var h2_titleNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        		var summaryNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        		//initialize object to push to results array
        		var info = {
        			title: h2_titleNeat,
        			summary: summaryNeat
        		};

        		results.push(info);
			};
		});
		//send back the results of info to callback
		callback(results);
	});
};

//export
module.exports = scrape;