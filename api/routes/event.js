const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Event_controller = require('../controllers/events')

router.get('/', checkAuth, Event_controller.get_events);

router.post('/', checkAuth, Event_controller.post_event );

router.get('/:eventId', checkAuth, Event_controller.single_event);

router.patch('/:eventId', checkAuth, Event_controller.post_event);

router.delete('/:eventId', checkAuth, Event_controller.delete_event);


module.exports = router;