var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
const comment = require("../models/comment");
var Comment = require("../models/comment");

// Comments new
router.get("/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err);
        }
        else {
            res.render("comments/new", {campground: campground});
        }
    }); 
});

// Comments create
router.post("/", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                }
                else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// EDIT COMMENT
router.get("/:comment_id/edit", checkCommentOwnerShip,  function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err) {
           res.redirect("back");
       }
       else {
           res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
       }
   });
    
});

// UPDATE COMMENT
router.put("/:comment_id", checkCommentOwnerShip, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err) {
            res.redirect("back");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// COMMENT DESTROY
router.delete("/:comment_id", checkCommentOwnerShip, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err) {
            res.redirect("back");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
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

function checkCommentOwnerShip(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err) {
                res.redirect("back");
            }
            else 
            {
                // if the user owns the comment
                // 一个是结构体一个是字符串，不能直接用===
                if(foundComment.author.id.equals(req.user._id)) {
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