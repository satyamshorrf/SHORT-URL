const { getUser } = require("../service/auth");

// This is Authentication 

function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.token;
    req.user = null;

    if (!tokenCookie) return next();
        

    const token = tokenCookie;
    const user = getUser(token);
    
    req.user = user;
    return next();
}


// This is Authorization

function restricTo(roles) {
    return function (req, res, next) {
        if (!req.user)  return res.redirect("/login");

        if (!roles.includes(req.user.role)) return res.end("UnAuthorized");

        return next();
           
    };
}

module.exports = {
    checkForAuthentication,
    restricTo,
}