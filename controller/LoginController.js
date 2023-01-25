class LoginController {
    login(req, res) {
        res.status(200).json(req.user);
    }

    currentSessionUser(req, res) {
        if(req.isAuthenticated()) {
            res.json(req.user);}
        else
            res.status(401).json({error: 'Not authenticated'});
    }

    deleteCurrentSessionUser(req, res) {
        req.logout(() => {
            res.end();
        });
    }

}

exports.default = LoginController;