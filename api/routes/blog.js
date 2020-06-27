const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Blog_controller = require('../controllers/blog')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

router.get('/', Blog_controller.get_blogs);

router.post('/', upload.single('image'), Blog_controller.post_blog );

router.get('/:blogId', Blog_controller.single_blog);

router.patch('/:blogId', checkAuth, Blog_controller.patch_blog);

router.delete('/:blogId', checkAuth, Blog_controller.delete_blog);


module.exports = router;