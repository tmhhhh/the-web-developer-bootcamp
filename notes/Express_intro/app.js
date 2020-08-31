var express = require("express");
var app = express();

// "/" => "Hi There"
app.get("/", function(req, res){
    res.send("Hi There");
});
// "bye" => "Goodbye"
app.get("/bye", function(req, res){
    res.send("Goodbye");
});
// "/dog" => "MEOW"
app.get("/dog", function(req, res){
    res.send("MEOW");
    console.log("Some one made a request to /DOG");
});

app.get("/r/:subName", function(req, res){
    var sub = req.params.subName;
    res.send("WELCOME TO THE " + sub.toUpperCase());
});

app.get("/r/:subName/comments/:id/:title", function(req, res){
    res.send("welcome to the comment page");
});

// else
app.get("*", function(req, res){
    res.send("YOU ARE A STAR");
});
//Tell Express to listen for requests (start server)
app.listen(3000, function(){
    console.log("Sever has started");
});