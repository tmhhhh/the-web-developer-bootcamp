var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud' Rest",
        image: "https://n.sinaimg.cn/sports/transform/w535h359/20180303/oGWL-fwnpcnt5755287.jpg",
        description: "blah blah"
    },
    {
        name: "Family",
        image: "https://pic3.zhimg.com/80/v2-0ca467408fa04cc2a0a68f63c37c7d69_1440w.jpg",
        description: "blah blah"
    },
    {
        name: "Night",
        image: "https://img.mp.itc.cn/upload/20170320/a440ef98f9a142d380b9fe0294133a6c_th.png",
        description: "blah blah"
    }
]


function seedDB() {
    // remove all campgrounds
    Campground.remove({}, function(err){
        if(err) {
            console.log(err);
        }
        console.log("removed campgrounds");
        // add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err) {
                    console.log(err);
                }
                else {
                    console.log("add a campground");
                    // create a comment
                    Comment.create(
                        {
                            text: "This place is great",
                            author: "Homer"
                        }, function(err, comment) {
                            if(err) {
                                console.log(err);
                            }
                            else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("create a new comment");
                            }
                    });
                }
            });
        });
    });

}

module.exports = seedDB;