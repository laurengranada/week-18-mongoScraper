//.ready function for modal
$(document).ready(function(){
	//calling on div as global var
	var articlesGoHere = $(".articles-go-here");
	$(document).on("click", "#savebutton", handleSave);
	$(document).on("click", "#scrapebutton", handleScrape);
	//function that start page functionality
	start();
	function start(){
		//empty div
		articlesGoHere.empty();
		$.get("/scrape/titles?saved=false").then(function(data){
			if (data && data.length){
				renderArticles(data);
			}else{
				renderEmpty();
			}
		});
	}

	function renderArticles(articles){
		var articleCards = [];
		for(var i=0; i<articles.length; i++){
			articleCards.push(createCards(articles[i]));
		}
		articlesGoHere.append(articleCards);
	}

	function createCards(article){
		var card =
		$(["<div class='card' style='background-color: #f9f0ff;'>",
  			"<h3 class='card-header' style='background-color: #d9c7ed;'>",
  			article.title,
  			"</h3>",
  			"<div class='card-block'>",
    		"<p class='card-text' style='color: grey;'>",
    		article.summary,
    		"</p>",
    		// "<br>",
    		// "<p class='card-text' style='color: grey;'>",
    		// article.link,
    		// "</p>",
    		"<button type='button' class='btn btn-primary' id='savebutton'>",
    		"Save Article",
    		"</button>",
    		"</div>",
			"</div>",
			"<br>"
			].join(""));
		card.data("_id", article._id);
		return card;
	}

	function renderEmpty(){
		var alertingEmpty =
		$(["<div class='card'>",
  			"<h3 class='card-header'>",
  			"No New Articles",
  			"</h3>",
  			"<div class='card-block'>",
    		"<p class='card-text'>",
    		"...",
    		"</p>",
    		"<button type='button' class='btn btn-primary' id='savebutton'>",
    		"Save Article",
    		"</button>",
    		"</div>",
			"</div>",
			].join(""));
		articlesGoHere.append(alertingEmpty);
	}

	function handleSave(){
		var articleToSave = $(this).parents(".card").data();
		articleToSave.saved = true;
		$.ajax({
			method: "PATCH", 
			url: "/scrape/titles",
			data: articleToSave
		}).then(function(data){
			if(data.ok){
				start();
			}
		});
	}

	function handleScrape(){
		$.get("/scrape").then(function(data){
			start();
			bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
		});
	}

});