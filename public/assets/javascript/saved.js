//.ready function for modal
$(document).ready(function(){
	//calling on div as global var
	var articlesGoHere = $(".articles-go-here");
	$(document).on("click", "#deletebutton", handleDelete);
	$(document).on("click", "#notesbutton", handleNotes);
	$(document).on("click", "#notesSave", NoteSave);
	$(document).on("click", "#notesDelete", NoteDelete);
	//function that start page functionality
	start();
	function start(){
		//empty div
		articlesGoHere.empty();
		$.get("/scrape/titles?saved=true").then(function(data){
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
    		"<button type='button' class='btn btn-danger' id='deletebutton'>",
    		"Delete From Your Saved",
    		"</button>",
    		"<p></p>",
    		"<button type='button' class='btn btn-primary' id='notesbutton'>",
    		"Add Notes",
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
			"</div>"
			].join(""));
		articlesGoHere.append(alertingEmpty);
	}

	function renderNotesList(data){
		var notesToRender = [];
		var currentNote;
		if(!data.notes.length){
			currentNote = [
	        "<li class='list-group-item'>",
	        "No notes for this article yet.",
	        "</li>"
			].join("");
			notesToRender.push(currentNote);
		}else{
			for(var i = 0; i < data.notes.length; i++){
				currentNote = $([
			        "<li class='list-group-item note'>",
			        data.notes[i].noteText,
			        "<button class='btn btn-danger' id='notesDelete'>x</button>",
			        "</li>"					
				].join(""));
				currentNote.children("button").data("_id", data.notes[i]._id);
				notesToRender.push(currentNote);
			} 
		}
		$(".note-container").append(notesToRender);
	}

	function handleDelete(){
		var artictleToDelete = $(this).parents(".card").data();
		$.ajax({
			method: "DELETE",
			url: "scrape/titles/" + artictleToDelete._id
		}).then(function(data){
			if(data.ok){
				start();
			}
		});
	}

	function handleNotes(){
		var currentArticle = $(this).parents(".card").data();
		$.get("/scrape/notes/" + currentArticle._id).then(function(data){
			var modalText = [
			"<div class='container-fluid text-center'>",
	        "<h4>Notes For Article: ",
	        currentArticle._id,
	        "</h4>",
	        "<hr />",
	        "<ul class='list-group note-container'>",
	        "</ul>",
	        "<br>",
	        "<textarea placeholder='New Note' rows='4' cols='60' style='width: 100%;'></textarea>",
	        "<button class='btn btn-success save' id='notesSave'>Save Note</button>",
	        "</div>"
			].join("");
			bootbox.dialog({
				message: modalText,
				closeButton: true
			});
			var noteData = {
				_id: currentArticle._id,
				notes: data || []
			};
			$("#notesSave").data("article", noteData);
			renderNotesList(noteData);
		});
	}

	function NoteSave(){
		var noteData;
		var newNote = $(".bootbox-body textarea").val().trim();
		if(newNote){
			noteData = {
				_id: $(this).data("article")._id,
				noteText: newNote
			};
			$.post("/scrape/notes", noteData).then(function(){
				bootbox.hideAll();
			});
		}
	}

	function NoteDelete(){
		var noteToDelete = $(this).data("_id");
		$.ajax({
			url: "/scrape/notes/" + noteToDelete,
			method: "DELETE"
		}).then(function(){
			bootbox.hideAll();
		});
	}

});