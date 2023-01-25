const passport = require('passport');
const LocalStrategy = require('passport-local');
const LoginModel = new (require("../model/Login").default)();

// local strategy
passport.use('local', new LocalStrategy({}, async function verify(username , password, cb) {

    const user = await LoginModel.getUser(username, password);

    if (!user)
        return cb(null, false);
    else{
        return cb(null, user);
    }
}));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (user, cb) {
    return cb(null, user);
});

exports.default = passport;