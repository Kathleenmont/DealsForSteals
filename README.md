#Steals for Deals

##Overview
In this user-generated application, a user creates a login to the site where they are able to search and post restaurant deals under $10. 

##Technologies
Node.js and Express.js are used for the basis of the back-end. Cloudinary is used to upload and store photos globally. Path.js is used for file handling. Multer.js is used for form data handling. Passport.js is used for the login feature. mySQL, Sequelize.js and JawsDB are used for database querying and management. Bootstrap and Handlebars are used for front-end templating. Languages used are HTML, CSS, and JavaScript.

##How it Works
When a user opens up this application, they are prompted to login or sign up. Once an account is created and they are logged in, they are then brought to a page where they are given the option to search for deals or to upload a deal. 

Search Deals:
If the user clicks on the "Search Deals" button, they are brought to a page that displays all restaurant deals that users have posted. The user is then able to filter these deals by category. For example, if they would only like to see posts about snacks, they select "Snacks" from the "Filter Results" drop down menu.

Upload Deal:
If the user clicks on the "Upload Deal" button, they are brought to a page that prompts them to enter information about the deal into a form. This information includes:
    -Type of Deal (select from "Meal", "Snack", "Treat", "Dessert")
    -Name of Place
    -Name of Deal Item
    -Cost of Deal Item
    -Additional Comments (optional)
    -Image of Deal Item (option to upload an image file or take a picture)
Once the user clicks the submit button, their information is sent to the server and stored in relational mySQL databases. This information is then rendered onto the search page as a deal whenever any user visits that page. Upon submission, user is then brought to a "Thank You" page where they are given the option to search for deals or upload another deal.


##Link to Deployed Site: https://stark-ravine-73218.herokuapp.com/newpost