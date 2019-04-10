var express = require("express"),
    User = require("../models/users"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    router = express.Router();


//main route
router.get("/", function (req, res) {
    res.render("index")
});

//register route 
router.get("/register", function (req, res) {
    res.render("register");
});

router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username })
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err.message);
            req.flash("error", err.message);
            res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "You have successfully signed in");
            res.redirect("/list");
        });
    });
});

//login route 
router.get("/login", function (req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/list",
    failureRedirect: "/login"
}), function(req, res) {

});


//logout route
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "You have been logged out")
    res.redirect("/");
});

module.exports = router;