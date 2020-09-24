var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// INDEX - show all campgrounds
router.get("/", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
    
});

// CREATE - add new campground to DB
router.post("/", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author: author};

    Campground.create(newCampground, function(err, newlyCreated) {
       if(err) {
           console.log(err);
       } 
       else {
           res.redirect("/campgrounds");
       }
    });
});

// show form to create new campground
router.get("/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// show more info about one campground
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        }
        else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });

});

// EDIT
router.get("/:id/edit", checkCampgroundsOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE
router.put("/:id", checkCampgroundsOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err) {
            res.redirect("/campgrounds");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY
router.delete("/:id", checkCampgroundsOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/campgrounds");
        }
        else {
            res.redirect("/campgrounds");
        }
    });
});

// middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundsOwnership(req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err) {
                res.redirect("back");
            }
            else 
            {
                // if the user owns the campground
                // 一个是结构体一个是字符串，不能直接用===
                if(foundCampground.author.id.equals(req.user._id)) {
                    // 继续执行这个函数之后的代码
                    next();
                }
                else {
                    res.redirect("back");
                }
            }
        });
    }
    // not
    else {
        res.redirect("back");
    }
}

module.exports = router;
