const express = require('express');
const URL = require("../models/url"); // Corrected import statement

const router = express.Router();

module.exports = router ;

router.get("/", async (req, res) => {
    try {
        if (!req.user) return res.redirect("/login");
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
