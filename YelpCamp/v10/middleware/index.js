var Campground = require("../models/campground");
var Comment = require("../models/comment");
// all the middleware
var middlewareObj = {};

middlewareObj.checkCampgroundsOwnership = function(req, res, next) {
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

middlewareObj.checkCommentOwnerShip = function(req, res, next) {
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

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObj;