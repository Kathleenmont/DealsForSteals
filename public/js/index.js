// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// test code
window.addEventListener("load", function() {
  document
    .querySelector('input[type="file"]')
    .addEventListener("change", function() {
      if (this.files && this.files[0]) {
        var img = document.querySelector("img"); // $('img')[0]
        img.src = URL.createObjectURL(this.files[0]); // set src to file url

        img.onload = imageIsLoaded; // optional onload event listener

        console.log(img);
        console.log(img.src);
        var Photo = {
          img: img
        };

        $.ajax({
          headers: {
            "Content-Type": "application/json"
          },
          type: "POST",
          url: "api/examples",
          data: JSON.stringify(Photo)
        });
      }
    });
});

function imageIsLoaded(e) {
  alert(e);
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
    Authorization:
      "Bearer Vg_tGwpB5bMsOR-xCjAGY2NUvCf7CUy_6QVbCD-5pV_6zMJxrrAjOgUZUtkUUvgdBr_8g_7Cva_67x-k8kxWw8vu9gKt-GTphwj6CZenIjAggvyMAqUxFXTSfsjeXHYx"
  },
  method: "GET",
  dataType: "json",
  success: function(response) {
    console.log("success: " + response);
    console.log(JSON.stringify(response));
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
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
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
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

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
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

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
