const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

router.get('/:movieId', movieController.getMovie);
router.put('/:movieId/like', movieController.like);
router.put('/:movieId/unlike', movieController.unlike);
router.post('/:movieId/rate', movieController.rate);
router.put('/:movieId/rate', movieController.editRate);

// Example protected route
module.exports = router;