const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const passport = require('passport');


// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app


module.exports = router;
