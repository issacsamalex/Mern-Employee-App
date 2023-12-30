const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

router.route('/login')
    .post(authController.handleLogin)



module.exports = router;