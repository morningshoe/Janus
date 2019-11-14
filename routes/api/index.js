const router = require("express").Router();
const newPost = require("./new-post")
const registration = require("./registration")
const login = require("./login")
const home = require("./home")


router.use("/new-post", newPost)
router.use("/registration", registration)
router.use("/login", login)
router.use('/',home)

module.exports = router;
