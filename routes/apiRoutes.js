module.exports = function (app) {
  const db = require("../models");
  const multer = require("multer");
  const fs = require("fs");
  const cloudinary = require("cloudinary");
  const cloudinaryStorage = require("multer-storage-cloudinary");

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
    });

    const cloudStorage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "deals",
    allowedFormats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
    });

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
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png"  || file.mimetype === "image/jpg") {
      cb(null, true);
    } else {
      cb(null, false);
       }
  }

  //Multer can take an object with a key that holds a directory stores some sort of hex or use the diskstorage method to 
  // const upl`oad = multer({dest: "uploads/"});
  const upload = multer({
    storage: Storage,
    // storage: cloudStorage,
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
    console.log(req.body);

    const cloudImage = {};
    cloudImage.url = req.file.url;
    cloudImage.id = req.file.public_id;

    //string conversion
    let whyString = req.body.why.toString();
    let priceString = parseFloat(req.body.price.replace("$", "")).toFixed(2);

    var newPost = {
      category: req.body.typeOf,
      item: req.body.item,
      price:  priceString,
      why: whyString,
      restaurant: req.body.restaurant,
      restAdd: req.body.restAdd,
      restLat: req.body.restLat,
      restLong: req.body.restLong,
      comments: req.body.comments,
      yelpUrl: req.body.yelpUrl,
      typeOfPlace: req.body.typeOfPlace,
      photo: req.file.path,
      // photo: cloudImage.url,
      // photoID: cloudImage.id,
    }

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
  app.post("/api/users", upload.single("userPhoto"), function (req, res) {
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    // Define a JSONobject for the image attributes for saving to database

    var b64Image = {
      contentType: req.file.mimetype,
      image: new Buffer(encode_image, 'base64')
    };

    var img64 = {
      id: "1",
      name: "Jorge",
      img: req.file.path,
      b64: b64Image
    }

    console.log("This is the response from the image");
  });
};