const router = require('express').Router();
const passport = require("passport");
router.use("/", require("./swagger"));
router.get("/", (req, res) => {
    //#swagger.tags={"Hello World"}
    res.send("Hello World")
});

router.use("/players", require("./players"));
router.use("/enemies", require("./enemies"));
router.get("/login", passport.authenticate("github"));
router.get("/logout", function(req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});     
module.exports = router;