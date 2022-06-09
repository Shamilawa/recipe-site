const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express(); //setting app to use express
app.set('view engine', 'ejs'); //Setting up the view engine
app.use(express.static('public')); //Serving the statistic files
app.use(bodyParser.urlencoded({ extended: false })); //setup app to use body parser

// MongoDB Connetion
mongoose.connect('mongodb://localhost:27017/recipeDB');

// mongoose schema & Module
const RecipeSchema = new mongoose.Schema({
    repName : String,
    cookTime: Number,
    ingredients: Number,
    serve: Number,
    description: String,
    url: String
});

const Recipe = mongoose.model("Recipe", RecipeSchema);


// Route Configuration
// Home route
app.get("/", function(req, res){

    // Getting data from database and pass those data into home page using ejs render
    Recipe.find({}, function(err, foundRecipes){
        if(err) {
            console.log(err);
        } else {
            res.render("home", {recipes: foundRecipes});
        }
    });

});

// Home post route
app.post("/", function(req, res){

    // Getting data from the form
    const repName = req.body.recipeName;
    const cookTime = req.body.cookTime;
    const ingredients = req.body.ingredients;
    const serve = req.body.serve;
    const description = req.body.description;
    const url = req.body.url;
    
    // Organizing the data using scheme and module
    const newRep = new Recipe({
        repName : repName,
        cookTime: cookTime,
        ingredients: ingredients,
        serve: serve,
        description: description,
        url: url
    });

    // saveing the data using save() function
    newRep.save(function(err, doc){
        if(!err) {
            console.log("Data Save Successfulyy");
            // Redirecting to the home page after saving data
            res.redirect("/");
        }
    });


});


// single recipe page dynamic routing
app.get("/recipe/:id", function (req, res) {

    const recipeId = req.params.id;

    Recipe.findById(recipeId, function(err, recipeDoc){

        if(err) {
            console.log(err);
        } else {
            res.render("recipepage", {recipe: recipeDoc});
        }

    });

});
























// Port Cofiguration
app.listen(3000, function() {
    console.log("Server Started at Port 3000");
});