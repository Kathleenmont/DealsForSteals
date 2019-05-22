module.exports = function (app) {
  const db = require("../models");
  const multer = require("multer");
  const fs = require("fs");

  //storage of the file 
  const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
      const writeFile = file.fieldname + Date.now().toString() + file.originalname;
      cb(null, writeFile);
    }
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }

  //Multer can take an object with a key that holds a directory stores some sort of hex or use the diskstorage method to 
  // const upl`oad = multer({dest: "uploads/"});
  const upload = multer({
    storage: Storage,
    fileFilter
  });

  // Get all examples
  app.get("/api/posts", function (req, res) {
    db.Post.findAll({}).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  // Create a new example
  app.post("/api/posts", upload.single("userPhoto"), function (req, res) {
    console.log(req.file);
    var newPost  = {
      title: req.body.title,
      item: req.body.item,
      price: req.body.price,
      restaurant: req.body.restaurant,
      comments: req.body.comments,
      // restLat: req.body.restLat,
      // restLong: req.body.restLong,
      img: req.file.path
    }
    console.log("This is the new post---------");
    console.log(newPost);
    db.Post.create(newPost).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  // Delete an example by id
  app.delete("/api/posts/:id", function (req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (
      dbPost
    ) {
      res.json(dbPost);
    });

  });

   //show image
   app.post("/api/users", upload.single("userPhoto"),function (req, res) {
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    // Define a JSONobject for the image attributes for saving to database
     
    var b64Image = {
      contentType: req.file.mimetype,
      image:  new Buffer(encode_image, 'base64')
   };

    var post = {
      id: "1",
      name: "Jorge",
      img: req.file.path,
      b64: b64Image
    }
  
    console.log("This is the response from the image");
    console.log(req.file);
    res.send("test");
    // console.log(req.file);
    console.log(req.body);
    console.log(b64Image);

    // res.json(post);
    // res.render("index", post);
  });
};