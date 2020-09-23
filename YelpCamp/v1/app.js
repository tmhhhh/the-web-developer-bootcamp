var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds =[
    {name: "ttt", image: "https://ac-q.static.booking.cn/images/hotel/max1024x768/234/234843649.jpg"},
    {name: "mmm", image: "https://cf.bstatic.com/images/hotel/max1024x768/254/254415687.jpg"},
    {name: "hhh", image: "https://kidscampingessentials.com/wp-content/uploads/2019/03/Friends-hikers-sitting-beside-camp-and-tents-in-the-night-900-x-599.jpg"},
    {name: "yyy", image: "https://kidventure.com/blog/wp-content/uploads/2019/01/camping-in-houston.jpeg"},
    {name: "ddd", image: "https://www.regatta.com/blog/wp-content/uploads/2020/03/teepee-2647263_1280.jpg"},
    {name: "kkk", image: "https://www.kwando.co.bw/img/splash-main-mobile-1.jpg"},
    {name: "nnn", image: "https://thecontemporaryaustin.org/wp-content/uploads/2018/05/Camp_Contemporary_0203.jpg"},
    {name: "fff", image: "https://www.guntherpublications.com/core/wp-content/uploads/2018/01/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg"},
];

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs")
});

app.listen(3000, function() {
    console.log("The YelpCamp Server Has Started");
});