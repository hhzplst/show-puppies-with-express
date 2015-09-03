var express = require("express"),
    bodyParser = require("body-parser"),
    morgan = require("morgan"),
    Puppy = require("./puppy.js"),
    app = express();

var array=[], id=1;

app.set("view engine", "ejs");
app.use(morgan("tiny"));
app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  array.forEach(function(puppies){

  });
  res.render("index", {arr: array});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.get("/contact", function(req, res){
  res.render("contact");
});

app.get("/puppies/new", function(req, res){
  res.render("new");
});

app.post("/puppies", function(req, res){
  array.push(new Puppy(id, req.body.name, req.body.age, req.body.url));
  id++;
  res.redirect("/");
});

app.get("/puppies/:id", function(req, res){
  var id = Number(req.params.id);
  array.forEach(function(puppies){
    if(id === puppies.id){
      res.render("individual", {name: puppies.name, age: puppies.age, pic: puppies.url});
    }
  });
});

app.listen(3000, function(){
  console.log("server starting on port 3000");
});