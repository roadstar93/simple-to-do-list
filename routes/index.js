var express = require("express"),
    router = express.Router();


//main route
router.get("/", function(req, res){
    res.render("index")
});

//register route
router.get("/register", function(req, res){
    res.send("Working on it");
});

//login route
router.get("/login", function(req, res){
    res.send("Working on it");
});


//logout route
router.get("/logout", function(req, res){
    res.send("Working on it");
});

module.exports = router;