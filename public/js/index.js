// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $exampleImage = $("#example-img");
var $submitBtn = $("#submit");
var $submitBtnUploads = $("#uploads-submit");
var $exampleList = $("#example-list");
var postForm = $("#postForm");
var $typeOf;
var $placeName = $("#place");
var $itemName = $("#item");
var $price = $("#price");
var $why = [];
var $tellMore = $("#tell-more");
var $photo = $("#myImg2");

// test code
// window.addEventListener("load", function() {
//   document
//     .querySelector('input[type="file"]')
//     .addEventListener("change", function() {
//       if (this.files && this.files[0]) {
//         var img = document.querySelector("img"); // $('img')[0]
//         img.src = URL.createObjectURL(this.files[0]); // set src to file url

//         img.onload = imageIsLoaded; // optional onload event listener

//         console.log(img);
//         console.log(img.src);

//         var Photo = {
//           img: img,
//           source: img.src
//         };
//       }
//     });
// });
// function imageIsLoaded(e) {
//   alert(e);
// }
// CODE ADDED/MODIFIED FOR UPLOADING PHOTO FROM UPLOADS.HANDLEBARS
window.addEventListener("load", function() {
  document
    .querySelector("div.form-group.img2 input[type='file']")
    .addEventListener("change", function() {
      if (this.files && this.files[0]) {
        var img = document.querySelector("img.myImg2"); // $('img')[0]
        img.src = URL.createObjectURL(this.files[0]); // set src to file url

        img.onload = imageIsLoaded; // optional onload event listener

        console.log(img);
        console.log(img.src);

        // var Photo = {
        //   img: img,
        //   source: img.src
        // };
      }
    });
});

function imageIsLoaded(e) {
  alert(e);
}
// TODO: Needs to get right api post
// eslint-disable-next-line no-unused-vars
function sendPhoto(photo) {
  $.post("api/users", photo, function(result) {
    console.log(result);
  });
}
sendPhoto(Photo);

// GETTING DATA FROM THE UPLOADS FORM----------------------------------

// TEST API CALL YELP_____________________________

var buisnessName = "cosmi's Deli";

var myurl =
  "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" +
  buisnessName +
  "&location=philadelphia";

$.ajax({
  url: myurl,
  headers: {
    Authorization:
      "Bearer Vg_tGwpB5bMsOR-xCjAGY2NUvCf7CUy_6QVbCD-5pV_6zMJxrrAjOgUZUtkUUvgdBr_8g_7Cva_67x-k8kxWw8vu9gKt-GTphwj6CZenIjAggvyMAqUxFXTSfsjeXHYx"
  },
  method: "GET",
  dataType: "json",
  success: function(response) {
    console.log("success: " + response);
    // console.log(JSON.stringify(response));
    console.log("name: " + response.businesses[0].name);
    console.log("phone: " + response.businesses[0].display_phone);
    console.log("address: " + response.businesses[0].location.display_address);
    console.log("latitude: " + response.businesses[0].coordinates.latitude);
    console.log("longitude: " + response.businesses[0].coordinates.longitude);
    console.log("Yelp url: " + response.businesses[0].url);
    console.log("type of place: " + response.businesses[0].categories[0].alias);
    console.log("type of place: " + response.businesses[0].categories[0].title);
  }
});

// ______________________________________________
// The API object contains methods for each kind of request we'll make
var API = {
  // eslint-disable-next-line no-unused-vars
  saveExample: function() {
    var formData = new FormData(postForm[0]);

    // console.log("This is  form data:  " + JSON.stringify(postForm[0]));
    console.log(formData);

    return $.ajax({
      // headers: {
      //   "Content-Type": "application/json"
      // },
      type: "POST",
      enctype: "multipart/form-data",
      url: "api/posts",
      data: formData,
      processData: false, // Important!
      contentType: false,
      cache: false,
      // data: JSON.stringify(example),
      success: function(returnData) {
        console.log(returnData);
      },
      error: function(err) {
        console.log("error", err);
      }
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/posts",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/posts/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/posts/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $img = $("<img>").attr("src", example.img);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($img);
      $li.append($button);

      return $li;
    });

    console.log($examples);
    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim(),
    img: $exampleImage.val()
  };

  console.log("Submitted" + example);
  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  //saveUser photo
  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// ADDED FOR UPLOADS SUBMIT FORM
var handleFormSubmitUploads = function(event) {
  event.preventDefault();

  // var newPost = {
  //   text: $exampleText.val().trim(),
  //   description: $exampleDescription.val().trim(),
  //   img: $exampleImage.val()
  // };
  // $typeOf = $typeOf.val();
  $typeOf = $('input[name="typeOf"]:checked').val();
  $placeName = $placeName.val().trim();
  $itemName = $itemName.val().trim();
  $price = $price.val().trim();
  $.each($("input[name='why']:checked"), function() {
    $why.push($(this).val());
  });
  $tellMore = $tellMore.val().trim();
  $photo = $photo.val();
  console.log("catagory: " + $typeOf);
  console.log("place name: " + $placeName);
  console.log("name of item: " + $itemName);
  console.log("price: " + $price);
  console.log("why its a good deal: " + whys);
  console.log("additiona comments: " + $tellMore);
  console.log("Photo: " + $photo);

  // console.log("Submitted" + example);
  // if (!(example.text && example.description)) {
  //   alert("You must enter an example text and description!");
  //   return;
  // }

  //saveUser photo
  API.saveExample($photo).then(function() {
    refreshExamples();
  });
  console.log($photo);

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
$submitBtnUploads.on("click", handleFormSubmitUploads);
