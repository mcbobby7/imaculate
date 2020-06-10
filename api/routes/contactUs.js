const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Contact_us_controller = require('../controllers/events')

router.get('/', Contact_us_controller.get_events);

router.post('/', Contact_us_controller.post_event );

router.get('/:eventId', Contact_us_controller.single_event);

router.patch('/:eventId', Contact_us_controller.patch_event);

router.delete('/:eventId', Contact_us_controller.delete_event);


module.exports = router;