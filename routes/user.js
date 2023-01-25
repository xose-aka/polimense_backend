let express = require('express');
let router = express.Router();
const UserController = new (require('../controller/UserController').default)();

router.get('/top', UserController.top3Users);
router.get('/:userId(\\d+)', UserController.getUser);

module.exports = router;
