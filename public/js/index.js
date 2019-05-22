// Get references to page elements
let inputTitle = $("#title");
let inputComments = $("#comments");
// const $exampleDescription = $("#example-description");
const inputImg = document.querySelector("#input-img")
const $submitBtn = $("#submitForm");
const $exampleList = $("#example-list");
const submittedImage = $("#myImg");
const postForm = $("#postForm");
var input = document.querySelector('input[type=file]');

const cameraView = document.querySelector("#camera--view"),
  cameraSensor = document.querySelector("#camera--sensor"),
  cameraTrigger = $("#camera--trigger")

//video constraints
var constraints = {
  video: {
    facingMode: "environment"
  },
  audio: false
};

//start camera function
function cameraStart() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      track = stream.getTracks()[0];
      cameraView.srcObject = stream;
    })
    .catch(function (error) {
      console.error("Oops. Something is broken.", error);
    });
}

function capturePhoto(event) {
  event.preventDefault();
  console.log("Click");
  var capPhoto = input.files[0];
  console.log("This is in the Capture Photo method" + capPhoto);
  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);

  submittedImage.attr("src", cameraSensor.toDataURL("image/png"));

  input.files[0] = cameraSensor.toDataURL("image/png");

  // imgEl.classList.add("taken");
}

// Load image selected image on to webpage
window.addEventListener("load", function () {
  document
    .querySelector('input[type="file"]')
    .addEventListener("change", function (event) {
      if (this.files && this.files[0]) {
        var img = document.querySelector("img"); // $('img')[0]
        img.src = URL.createObjectURL(this.files[0]); // set src to file url

        img.onload = imageIsLoaded(event); // optional onload event listener

        console.log(this.files[0]);
        console.log("This is the event listener image loader");
        console.log(img);
        console.log(img.src);

        var Photo = {
          img: img,
          source: img.src
        };
      }
    });
});

$(document).on("change", submittedImage, function (event){
  console.log(submittedImage.attr("src"));
  console.log(event);
  console.log(event.target.files);
})

function imageIsLoaded(e) {
  console.log("Event of ImageIsLOADED: " + JSON.stringify(e));
  console.log(inputImg.files);
  // inputImg.files = e.dataTransfer.files;
}

// TODO: Needs to get right api post
function sendPhoto(photo) {
  $.post("api/users", photo, function (result) {
    console.log(result);
  });
}

// TEST API CALL YELP_____________________________

var buisnessName = "cosmi's Deli";

var myurl =
  "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" +
  buisnessName +
  "&location=philadelphia";

$.ajax({
  url: myurl,
  headers: {
    Authorization: "Bearer Vg_tGwpB5bMsOR-xCjAGY2NUvCf7CUy_6QVbCD-5pV_6zMJxrrAjOgUZUtkUUvgdBr_8g_7Cva_67x-k8kxWw8vu9gKt-GTphwj6CZenIjAggvyMAqUxFXTSfsjeXHYx"
  },
  method: "GET",
  dataType: "json",
  success: function (response) {
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
  saveExample: function (example) {
    var formData = new FormData(postForm[0]);

    console.log(postForm[0]);
    formData.append("capturedImage", submittedImage.val());

    // console.log("This is  form data:  " + JSON.stringify(postForm[0]));
    console.log(formData);
    console.log(formData.entries());
    for (var value of formData.values()) {
      console.log(value); 
   }
   
    return $.ajax({
      type: "POST",
      enctype: "multipart/form-data",
      url: "api/posts",
      data: formData,
      processData: false, // Important!
      contentType: false,
      cache: false,
      // data: JSON.stringify(example),
      success: function (returnData) {
        console.log(returnData);
        console.log(data);
      },
      error: function (err) {
        console.log("error", err);
      }
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/posts",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/posts/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
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
var handleFormSubmit = function (event) {
  event.preventDefault();

  var userPost = {
    text: inputTitle.val().trim(),
    description: inputComments.val().trim(),
    img: submittedImage.val()
  };

  if (!(userPost.text && userPost.description)) {
    alert("You must enter an userPost text and description!");
    return;
  }

  //saveUser photo
  API.saveExample(userPost).then(function () {
    refreshExamples();
  });

  // clear the inputs

  // $exampleText.val("");
  // $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

// Start the video stream when the window loads

window.addEventListener("load", cameraStart, false);

cameraTrigger.on("click", capturePhoto)