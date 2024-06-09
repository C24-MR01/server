const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

router.get('/:movieId', movieController.getMovie);
router.post('/:movieId/like', movieController.like);
router.delete('/:movieId/like', movieController.unlike);
router.post('/:movieId/rate', movieController.rate);
router.put('/:movieId/rate', movieController.editRate);

module.exports = router;