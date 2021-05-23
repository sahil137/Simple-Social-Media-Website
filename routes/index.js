const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/users', require('./users')); // redirect path to users in same folder
router.use('/post', require('./post')); // redirect path to post
router.use('/comments', require('./comments'));

router.use('/api', require('./api'));

module.exports = router;