var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2", { useNewUrlParser: true, useUnifiedTopology: true});

var Post = require("./models/post");
var User = require("./models/user");

// User.create({
//     email: "xx@163.com",
//     name: "xxz"
// });

Post.create({
    title: "xxxx4",
    content: "ohhhhhhh ahahah"
}, function(err, post){
    User.findOne({email: "xx@163.com"}, function(err, foundUser){
        if(err) {
            console.log(err);
        }
        else {
            foundUser.posts.push(post);
            foundUser.save(function(err, data){
                if(err) {
                    console.log(err);
                }
                else {
                    console.log(data);
                }
            });
        }
    });
});

// User.findOne({email: "xx@163.com"}).populate("posts").exec(function(err, user) {
//     if(err) {
//         console.log(err);
//     }
//     else {
//         console.log(user);
//     }
// });

   
