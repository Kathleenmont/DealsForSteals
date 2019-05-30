var db = require("../models");

// passport added _____________________________
// Requiring path to so we can use relative routes to our HTML files
// var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load index page
  // app.get("/", function(req, res) {
  //   db.Post.findAll({}).then(function(dbPost) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbPost
  //     });
  //     console.log(dbPost);
  //   });
  // });

  // load uploads page
  app.get("/", function(req, res) {
    res.render("homepage");
  });

  app.get("/newpost", isAuthenticated, function(req, res) {
    // PASPORT If STATEMENT - if the user already has an account send them to the search page
    // if (req.user) {
    res.render("newpost");
    // }
    // res.render("signup");
  });

  app.get("/final", function(req, res) {
    res.render("thank_you_page");
  });

  // PASSOPRT ADDED ______________________
  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      // res.redirect("/newpost");
      // return;
    }
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/newpost", isAuthenticated, function(req, res) {
  //   res.render("newpost");
  // });
  // ______________________________________

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
  //filtered results
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
