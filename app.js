//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + '/date.js')

const app = express();

const items = [];
const workItems = [];
const testItems = [];
let className = [];

//tells app to use ejs
app.set('view engine', 'ejs');
//urlencoded has to have value
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.get("/", function(req, res){

  //run function from date module
  let day = date.getDate();

  // key = variable in EJS  value = variable from app.js to replace variable in EJS
  res.render('list', {listTitle: day, newListItems: items, className: className, testItems: testItems});
});



app.post('/', function(req, res) {

  // grab value of text box based on name (newItem) - using body-parser
  let item = req.body.newItem;
  //change route based on injected title of list submit button
  if (req.body.list === 'Work') {
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push(req.body.newItem);
    if (req.body.className === 'urgent') {
      className.push('urgent');
      console.log('urgent');
    } else if (req.body.className === 'unimportant') {
      className.push('unimportant');
      console.log('unimportant');
    } else {
      className.push('');
      console.log('normal');
    }
    console.log(className);
    res.redirect('/');
  }

});

app.get('/work', (req, res) => {
  res.render('list', {listTitle: 'Work List', newListItems: workItems});
})

app.get('/about', (req, res) => {
  res.render('about');
})

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
