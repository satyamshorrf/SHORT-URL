const express = require('express');
const path = require('path');
const { connectToMongoDB } = require('./connect');
const urlRoute = require("./routes/url");
const staticRoute = require('./routes/staticRouter');
const URL = require('./models/url');
const shortid = require('shortid');


const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => console.log('Mongodb connect'));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/test', async (req, res) => {
    const allurls = await URL.find({});
    return res.render("home", {
        urls: allurls,
    })
})

app.use('/url', urlRoute);
app.use("/", staticRoute);


app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            }
        );

        if (!entry) {
            return res.status(404).send('URL not found');
        }

        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));