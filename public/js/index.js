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
var $placeNameVal
var $itemName = $("#item");
var $price = $("#price");
var $why = [];
var $tellMore = $("#tell-more");


var input = document.querySelector('input[type=file]');
const inputNumber = $('input[type=number]');
let tookPicture = false;
let blob;
let webBlobString = [];
const $photo = $("#uploadMyImg");
let yelpObj

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
  tookPicture = true;
  var capPhoto = input.files[0];

  cameraSensor.width = cameraView.videoWidth;
  cameraSensor.height = cameraView.videoHeight;
  cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);

  $photo.attr("src", cameraSensor.toDataURL("image/png"));
  let dataURI = cameraSensor.toDataURL("image/png");

  // let file = new File (cameraSensor.toDataURL("image/png"), "tempImage", "image/png");

  blob = dataURItoBlob(dataURI);
  webBlobString.pop();
  webBlobString.push(blob);


  // Stop all video streams.
  cameraView.srcObject.getVideoTracks().forEach(track => track.stop());

  console.log(webBlobString);
}

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else
    byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {
    type: mimeString
  });
}

// CODE ADDED/MODIFIED FOR UPLOADING PHOTO FROM UPLOADS.HANDLEBARS
window.addEventListener("load", function () {
  document
    .querySelector('input[type="file"]')
    .addEventListener("change", function (event) {
      if (this.files && this.files[0]) {
        var img = document.querySelector("#uploadMyImg "); // $('img')[0]
        img.src = URL.createObjectURL(this.files[0]); // set src to file url

        console.log(img.src);
        img.onload = imageIsLoaded(event); // optional onload event listener
      }
    });
});

function imageIsLoaded(e) {

}

$(document).on("change", $photo, function (event) {

  console.log(event);
  console.log(event.target.files);
});

// eslint-disable-next-line no-unused-vars
function sendPhoto(photo) {
  $.post("api/users", photo, function (result) {
    console.log(result);
  });
}

// GETTING DATA FROM THE UPLOADS FORM----------------------------------
// ----------------------------------------------
function yelpApiSearch(placeName) {
  var buisnessName = placeName;

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
      console.log(
        "address: " + response.businesses[0].location.display_address
      );
      console.log("latitude: " + response.businesses[0].coordinates.latitude);
      console.log("longitude: " + response.businesses[0].coordinates.longitude);
      console.log("Yelp url: " + response.businesses[0].url);
      console.log(
        "type of place: " + response.businesses[0].categories[0].alias
      );
      console.log(
        "type of place: " + response.businesses[0].categories[0].title
      );

      yelpObj = {
        bName: response.businesses[0].name,
        restAdd: response.businesses[0].location.display_address,
        restLat: response.businesses[0].coordinates.latitude,
        restLong: response.businesses[0].coordinates.longitude,
        yelpUrl: response.businesses[0].url,
        typeOfPlace: response.businesses[0].categories[0].title
      };

      //saveUser photo
      API.saveExample().then(function () {
        refreshExamples();
      });
    }
  });
}
// ______________________________________________
// The API object contains methods for each kind of request we'll make
var API = {
  // eslint-disable-next-line no-unused-vars
  saveExample: function () {
    var formData = new FormData(postForm[0]);

    console.log(postForm[0]);
    if (tookPicture) {
      //iterate through the objectand create a key/value pair to append to formData
      for (const key in yelpObj) {
        // console.log(yelpObj[key]);
        formData.append(key, yelpObj[key]);
      }
        //get image from canvas
        formData.append("userPhoto", blob);

      tookPicture = false;
    } else {

      //iterate through the objectand create a key/value pair to append to formData
      for (const key in yelpObj) {
        // console.log(yelpObj[key]);
        formData.append(key, yelpObj[key]);
      }

      formData.append("photoBlob", $photo.attr("src"));
      // formData.append("yelp", JSON.stringify(yelpObj));
    }

    // console.log("This is  form data:  " + JSON.stringify(postForm[0]));
    console.log(formData);

    return $.ajax({
      // headers: {
      //   "Content-Type": "application/json"
      // },
      type: "POST",
      enctype: "multipart/form-data",
      url: "/api/posts",
      data: formData,
      processData: false, // Important!
      contentType: false,
      cache: false,
      // data: JSON.stringify(example),
      success: function (returnData) {
        console.log(returnData);
      },
      error: function (err) {
        console.log("error", err);
      }
    }).then(
      function() {
        console.log("added new deal");
        // redirect to the final page,
        location.assign("/final");
      }
    );
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
var handleFormSubmitUploads = function (event) {
  event.preventDefault();

  // var newPost = {
  //   text: $exampleText.val().trim(),
  //   description: $exampleDescription.val().trim(),
  //   img: $exampleImage.val()
  // };
  // $typeOf = $typeOf.val();
  // $typeOf = $('input[name="typeOf"]:checked').val();
  $placeNameVal = $placeName.val().trim();
  // $itemName = $itemName.val().trim();
  // $price = $price.val().trim();

  $.each($("input[name='why']:checked"), function () {
    $why.push($(this).val());
  });
  // $tellMore = $tellMore.val().trim();

  // console.log("catagory: " + $typeOf);
  // console.log("place name: " + $placeNameVal);
  // console.log("name of item: " + $itemName);
  // console.log("price: " + $price);
  // console.log("why its a good deal: " + $why);
  // console.log("additiona comments: " + $tellMore);
 
  // console.log("Submitted" + example);
  // if (!(example.text && example.description)) {
  //   alert("You must enter an example text and description!");
  //   return;
  // }

  //make yelp call
  yelpApiSearch($placeNameVal);

  console.log($photo);

  $exampleText.val("");
  $exampleDescription.val("");
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


function currencyEval () {
  let value =  $(this).val();

  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  //still workout how to dynamically stick currency
  console.log($(this).val());
  let evaluated = formatter.format(value);
    value = evaluated;
    console.log(value);
}
// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
$submitBtnUploads.on("click", handleFormSubmitUploads);
window.addEventListener("load", cameraStart, false);
cameraTrigger.on("click", capturePhoto);
inputNumber.on("keyup", currencyEval)
