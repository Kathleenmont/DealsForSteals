var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbPost
      });
      console.log(dbPost);
    });
  });

  // load uploads page
  app.get("/homepage", function(req, res) {
    res.render("homepage");
  });

  app.get("/newpost", function(req, res) {
    res.render("newpost");
  });

  app.get("/final", function(req, res) {
    res.render("thank_you_page");
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Post.findOne({ where: { id: req.params.id } }).then(function(dbPost) {
      res.render("example", {
        example: dbPost
      });
    });
  });
  // test search page
  app.get("/search", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      // console.log(dbPost);
      res.render("all_deals", {
        posts: dbPost
      });
      console.log(dbPost);
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
