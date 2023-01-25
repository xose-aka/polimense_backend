let express = require('express');
let router = express.Router();
let isLoggedIn = require('../middleware').default;
const RiddlesController = new (require('../controller/RiddlesController').default)();


router.delete('/:userId(\\d+)', RiddlesController.cancelOrder);

router.get('/:riddleId(\\d+)', RiddlesController.getRiddle);

router.get('/:riddleId(\\d+)/replies', isLoggedIn, RiddlesController.getRiddleReplies);

router.post('/save', isLoggedIn, RiddlesController.save);

router.post('/reply-save', isLoggedIn, RiddlesController.saveRiddleReply);

router.put('/close', RiddlesController.closeRiddle);

module.exports = router;
