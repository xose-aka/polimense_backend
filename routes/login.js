let express = require('express');
let router = express.Router();
const passport = require('passport');
const LoginController = new (require('../controller/LoginController').default)();

router.post('/login', passport.authenticate('local',), LoginController.login);

router.get('/sessions/current', LoginController.currentSessionUser);

// DELETE /session/current
router.delete('/sessions/current', LoginController.deleteCurrentSessionUser);

module.exports = router;
