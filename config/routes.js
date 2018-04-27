//server routes
//require scrape from scripts folder
var scrape = require("../scripts/scrape.js");
//require controllers
var titlesController = require("../controllers/titles.js");
var notesController = require("../controllers/notes.js");

module.exports = function(router){
  // Directs to the page without articles
  router.get("/", function(req, res) {
    res.render("noArticles");
  });
  //Directs to the scraped.handlebars
  router.get("/scraped" , function(req, res){
    res.render("scraped");
});
  //a GET request to scrape website
  router.get("/scrape", function(req, res){
    //only load NEW articles
    if(!docs || docs.insertedCount === 0){
      res.json({
        message: "No new articles to load"
      });
    } else{
      res.json({
        message: "Added " + docs.insertedCount + " new articles"
      });
    }
  });
};

//GET titles from mongoDB
router.get("/scrape/titles", function(req, res){
  // if save: true
  var query = {};
  if(req.query.saved){
    query = req.query;
  }

  titlesController.get(query, function(data){
    //return as JSON
    res.json(data);
  });
});

//delete chosen title
router.delete("/scrape/titles/:id", function(req, res){
  var query = {};
  query._id = req.params.id;
  //run delete method
  titlesController.delete(query, function(err, data){
    res.json(data);
  });
});

//save title
router.patch("/scrape/titles", function(err, data){
  titlesController.update(req.body, function(err, data){
    res.json(data);
  });
});

//retrieves notes by id
router.get("/scrape/notes/:ArticleId?", function(req, res){
  //add id to object
  var query = {};
  if(req.params.ArticleId){
    query._id  = req.params.ArticleId;
  }
  //results from notesController
  notesController.get(query, function(err, data){
    res.json(data);
  });
});

//deletes note
router.delete("/scrape/notes/:id", function(req, res){
  var query = {};
  query._id = req.params.id;
  notesController.delete(query, function(err, data){
    res.json(data);
  });
});

//saves a new note
router.post("/scrape/notes", function(req, res){
  notesController.save(req.body, function(data){
    res.json(data);
  });
});

