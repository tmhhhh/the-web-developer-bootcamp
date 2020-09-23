var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo", { useNewUrlParser: true, useUnifiedTopology: true});

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);
   
// var newUser = new User({
//     email: "gwfwdwmopfw@edu.cn",
//     name: "xx"
// });

// newUser.posts.push({
//     title: "efwfwf",
//     content: "wfowop"
// });

// newUser.save(function(err, user){
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "Reflections on Apples",
//     content: "sf43t45ehr4ge"
// });

// newPost.save(function(err, post){
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(post);
//     }
// });

User.findOne({name: "xx"}, function(err, user){
    if(err) {
        console.log(err);
    }
    else {
        user.posts.push({
            title: "iwur893ur",
            content: "ababa"
        });
        user.save(function(err, user){
            if(err) {
                console.log(err);
            }
            else {
                console.log(user);
            }
        });
    }
});