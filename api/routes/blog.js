const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Blog_controller = require('../controllers/blog')

router.get('/', Blog_controller.get_blogs);

router.post('/', Blog_controller.post_blog );

router.get('/:blogId', Blog_controller.single_blog);

router.patch('/:blogId', checkAuth, Blog_controller.patch_blog);

router.delete('/:blogId', checkAuth, Blog_controller.delete_blog);


module.exports = router;