var express = require("express"),
    User = require("../../models/users"),
    router = express.Router();

//Main list route
router.get("/list", function (req, res) {
    User.find({}, function (err, allUsers) {
        if (err) {
            console.log("error")
        } else {
            res.render("list/main", {users:allUsers});
        }
    })

})

module.exports = router;