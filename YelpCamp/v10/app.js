var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride =require("method-override"),
    User = require("./models/user"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds"),
    Comment = require("./models/comment") 

// requring routes
var commentRoutes = require("./routes/comments");
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")

mongoose.connect("mongodb://localhost/yelp_camp_v10", { useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

// seedDB();

app.use(require("express-session")({
    secret: "xx is pretty",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(3000, function() {
    console.log("The YelpCamp Server Has Started");
});