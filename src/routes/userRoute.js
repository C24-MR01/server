const express = require('express');
const userController = require('../controllers/userController');
const { route } = require('./movieRoute');

const router = express.Router();

router.put('/:userId/friend', userController.addFriend);
router.delete('/:userId/friend', userController.removeFriend);
router.get('/:userId', userController.getUser);
router.get('/', userController.findUser);

module.exports = router;