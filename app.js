//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = [];

//tells app to use ejs
app.set('view engine', 'ejs');
//urlencoded has to have value
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.get("/", function(req, res){

  //returns day as number 0 - 6
  const today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }

// region: en-US
  const day = today.toLocaleDateString('en-US', options);


  // key = variable in EJS  value = variable from app.js to replace variable in EJS
  res.render('list', {kindOfDay: day, newListItems: items});
});

app.post('/', function(req, res) {
  // grab value of text box based on name (newItem) - using body-parser
  items.push(req.body.newItem);
  res.redirect('/');
});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
