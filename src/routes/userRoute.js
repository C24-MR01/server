const express = require('express');
const userController = require('../controllers/userController');
const { route } = require('./movieRoute');

const router = express.Router();

router.put('/:userId/friend', userController.addFriend);
router.put('/:userId/friend', userController.removeFriend);
router.get('/:userId', userController.getUser);
router.get('/', async (req, res) => {
    const user = req.user;
    res.json(user);
});

module.exports = router;