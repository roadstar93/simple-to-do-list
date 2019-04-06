var express = require("express"),
    router = express.Router();


//main routes
router.get("/", function(req, res){
    res.render("index")
});

module.exports = router;