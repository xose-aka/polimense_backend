let express = require('express');
let router = express.Router();
const UserController = new (require('../controller/UserController').default)();

// router.get('/top', UserController.top3Users);

router.get('/:userId(\\d+)', UserController.getUser);

router.post('/save-order', UserController.saveOrder);

router.put('/edit', UserController.edit);

router.put('/pay', UserController.pay);

module.exports = router;
