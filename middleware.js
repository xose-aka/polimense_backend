const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated)
        return next();

    return res.status(400).json({
        message: "not authenticated"
    });
}

exports.default = isLoggedIn;