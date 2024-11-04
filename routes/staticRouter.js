const express = require('express');
const URL = require("../models/url"); // Corrected import statement
const { restricTo } = require('../middlewares/auth');

const router = express.Router();

router.get("/admin/urls", restricTo(["ADMIN"]), async (req, res) => {
        const allurls = await URL.find({}); 
        return res.render("home", {
            urls: allurls, 
        });
    });

router.get("/", restricTo(["NORMAL", "ADMIN"]), async (req, res) => {
    try {
        const allurls = await URL.find({ createdBy: req.user._id }); // Fetch all URLs from the database
        return res.render("home", {
            urls: allurls, // Send the fetched URLs to the 'home' view
        });
    } catch (error) {
        console.error("Error fetching URLs:", error); // Log the error if any
        return res.status(500).send("Internal Server Error"); // Respond with an error message
    }
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

module.exports = router;
