//scrape

// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

//function scrapes buzzfeed
var scrape = function(callback){
	//grab the body of the html with request
	request("http://www.buzzfeed.com/news", function(error, response, html){
		//then load into cherrio and save it to $ fir a shorthand selector
		var $ = cheerio.load(html);
		//save article info in array
		var articles = [];
		//find and loop through each element that has the "link-gray" class 
		//section holding the articles
		$(".link-gray").each(function(i, element){
			//grab children within the h2 tag
			//grab inner text and store it in h2 var
			var title = $(this).children("h2").text();
			//grab children with the class "p"
			//grab inner text and store it in summary var
			var summary = $(this).children("p").text();
			//make sure both h2_title and summary are present
			if(title && summary){
				//following removes extra (lines/spacing/tabs)
				var titleNeat = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        		var summaryNeat = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        		//initialize object to push to results array
        		var info = {
        			title: titleNeat,
        			summary: summaryNeat,
        		};

        		articles.push(info);
			};
		});
		//send back the results of info to callback
		callback(articles);
	});
};

//export
module.exports = scrape;