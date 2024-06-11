const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

router.get('/', movieController.searchMovie);
router.get('/genre', movieController.getMovieByGenre);
router.post('/id', movieController.getMoviesWithList);
router.get('/id/:movieId', movieController.getMovie);
router.post('/id/:movieId/like', movieController.like);
router.delete('/id/:movieId/like', movieController.unlike);
router.get('/id/:movieId/rate', movieController.getRating);
router.post('/id/:movieId/rate', movieController.rate);
router.put('/id/:movieId/rate', movieController.editRate);

module.exports = router;