var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // load uploads page
  app.get("/", function(req, res) {
    res.render("homepage");
  });

  // passport authentation checked for niew post page
  app.get("/newpost", isAuthenticated, function(req, res) {
    res.render("newpost");
  });

  app.get("/final", function(req, res) {
    res.render("thank_you_page");
  });

  // PASSOPRT
  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      // res.redirect("/newpost");
    }
    res.render("login");
  });



  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Post.findOne({ where: { id: req.params.id } }).then(function (dbPost) {
      res.render("example", {
        example: dbPost
      });
    });
  });

  // test search page
  app.get("/search", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      console.log(dbPost);
      res.render("all_deals", {
        posts: dbPost
      });
      console.log(dbPost);
    });
  });

  //filtered results search
  app.get("/search/meals", function (req, res) {
    db.Post.findAll({
      where: {
        category: "meal"
      }
    }).then(function (dbPost) {
      console.log(dbPost);
      res.render("all_deals", {
        posts: dbPost
      });
      console.log(dbPost);
    });
  });

  app.get("/search/snacks", function (req, res) {
    db.Post.findAll({
      where: {
        category: "snack"
      }
    }).then(function (dbPost) {
      console.log(dbPost);
      res.render("all_deals", {
        posts: dbPost
      });
      console.log(dbPost);
    });
  });
  app.get("/search/treats", function (req, res) {
    db.Post.findAll({
      where: {
        category: "treat"
      }
    }).then(function (dbPost) {
      console.log(dbPost);
      res.render("all_deals", {
        posts: dbPost
      });
      console.log(dbPost);
    });
  });
  app.get("/search/drinks", function (req, res) {
    db.Post.findAll({
      where: {
        category: "drink"
      }
    }).then(function (dbPost) {
      console.log(dbPost);
      res.render("all_deals", {
        posts: dbPost
      });
      console.log(dbPost);
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
