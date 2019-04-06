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
            console.log(err)
        }
        passport.authenticate("local")(req, res, function () {
            console.log("User logged:" + user.username)
            res.redirect("/list")
        })


    })
})

//login route 
router.get("/login", function (req, res) {
    res.render("login");
});


//logout route
router.get("/logout", function (req, res) {
    req.logout();
    console.log("Successfully logged out");
    res.redirect("/")
});

module.exports = router;