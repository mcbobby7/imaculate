const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const Contact_us_controller = require('../controllers/contactUs')

router.get('/', Contact_us_controller.get_contacts);

router.post('/', Contact_us_controller.post_contact );

router.patch('/:contactId', Contact_us_controller.single_contact);

router.delete('/:contactId', Contact_us_controller.delete_contact);


module.exports = router;