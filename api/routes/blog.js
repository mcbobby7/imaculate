const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Blog_controller = require('../controllers/blog')

router.get('/', checkAuth, Blog_controller.get_events);

router.post('/', checkAuth, Blog_controller.post_event );

router.get('/:eventId', checkAuth, Blog_controller.single_event);

router.patch('/:blogId', checkAuth, Blog_controller.patch_event);

router.delete('/:blogId', checkAuth, Blog_controller.delete_event);


module.exports = router;