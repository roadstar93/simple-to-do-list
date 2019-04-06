var express = require("express"),
    router = express.Router();

//Main list route
router.get("/list" , function(req, res){
    res.render("list/main");
})

module.exports = router;