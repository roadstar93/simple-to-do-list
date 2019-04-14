var express = require("express"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    seedDB = require("./seedDB"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/users"),
    flash = require("connect-flash"),
    app = express();

//Route declaration
var indexRoutes = require("./routes/index"),
    listRoutes = require("./routes/lists/lists");

//mongodb connection 
var dbCloud;
var dbConnection = process.env.dbCloud || "mongodb://localhost/to_do_list";
mongoose.connect(dbConnection, { useNewUrlParser: true });


//App connection local or online
var port = process.env.PORT || 5000;
var ip = process.env.IP || "0.0.0.0";

// seedDB(); //just for cleaning the database

//app config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(flash());

//passport configuration
app.use(require("express-session")({
    secret: "My biggest secret is: ...",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware to pass user data
app.use(function (req, res, next) {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.currentUser = req.user;
    next();
})


app.use(indexRoutes);
app.use(listRoutes);

app.listen(port, ip, function () {
    console.log("Server started")
});