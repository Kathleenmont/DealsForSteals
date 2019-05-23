var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Post.findAll({}).then(function (dbPost) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbPost
      });
    });
  });

  // load uploads page
  app.get("/uploads", function (req, res) {
    res.render("uploads");
  });

  //loads home page
  app.get("/home", function (req, res) {
    res.render("homepage");
  });



  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Post.findOne({ where: { id: req.params.id } }).then(function (dbPost) {
      res.render("example", {
        example: dbPost
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
