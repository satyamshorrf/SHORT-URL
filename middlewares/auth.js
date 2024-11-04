const { getUser } = require("../service/auth");

async function restricToLoggedinUserOnly(req, res, next) {
    console.log(req);
    const userUid = req.headers["authorization"];

    console.log( req. headers);
   

    if  (!userUid) return res. redirect("/login");
    const token = userUid.split('Bearer ')[1];  //"Bearer  [23u1233kdjsisdjf]"
    const user = getUser(token);

    if (!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    console.log( req. headers);
    const userUid = req.headers["authorization"];
    const token =  userUid.split('Bearer ')[1];


    const user = getUser(token);

    req.user = user;
    next();
}

module.exports = {
    restricToLoggedinUserOnly,
    checkAuth,
}