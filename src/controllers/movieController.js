const fetch = require('node-fetch');
const userRepository = require('../repositories/userRepository')
require('dotenv').config({ path: '.env' });

const { db } = require('../../db');
const Movie = require('../models/movie');

const getMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.MOVIEDB_API_KEY}`
        }
        };

        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch movie data: ${response.statusText}`);
        }
        const movieData = await response.json();
        res.status(200).json(movieData);
    } catch (e) {
        console.error('Error getting movie:', e);
        res.status(400).json({ message: e.message });
    }
}

const like = async (req, res) => {
    try {
        const user = req.user;
        const { movieId } = req.params;
        await userRepository.addLike(user[0].id, movieId);
        res.status(200).json("Movie liked successfully");
    } catch (e) {
        console.error('Error liking movie:', e);
        res.status(400).json({ message: e.message });
    }
}

const unlike = async (req, res) => {
    try {
        const user = req.user;
        const { movieId } = req.params;
        await userRepository.removeLike(user[0].id, movieId);
        res.status(200).json({ message: 'Movie unliked successfully' });
    } catch (e) {
        console.error('Error unliking movie:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getRating = async (req, res) => {
    try {
        const { movieId } = req.params;
        const movieRef = await db.collection('movies').doc(movieId).get();
        const movie = movieRef.data();

        return res.status(200).json(movie);
    } catch (e) {
        console.error('Error unliking movie:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const rate = async (req, res) => {
    try {
        const user = req.user;
        const { movieId } = req.params;
        const { rating } = req.body;

        if (rating < 0 || rating > 100) {
            return res.status(400).json({ message: "Rating must be a number between 0 and 100" });
        }

        const docRef = db.collection('movies').doc(movieId);
        const docSnap = await docRef.get();

        let movie;

        if (!docSnap.exists) {
            movie = new Movie(movieId)
        } else {
            movie = Movie.fromFirestore(docSnap.data());
        }

        if (movie.getRating(user[0].id) !== undefined) {
            return res.status(400).json({ message: "User already rated this movie" });
        }

        movie.addRating(user[0].id, rating);
        await docRef.set(movie.toPlainObject());

        return res.status(200).json({ message: "Rating updated successfully", movie: movie });
    } catch (e) {
        console.error("Error updating rating: ", e);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const editRate = async (req, res) => {
    try {
        const user = req.user;
        const { movieId } = req.params;
        const { rating } = req.body;

        if (rating < 0 || rating > 100) {
            return res.status(400).json({ message: "Rating must be a number between 0 and 100" });
        }

        const docRef = db.collection('movies').doc(movieId);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            return res.status(404).json({ message: "Movie not found" });
        }

        let movie = Movie.fromFirestore(docSnap.data());

        if (movie.getRating(user[0].id) !== undefined) {
            movie.addRating(user[0].id, rating);
        } else {
            return res.status(400).json({ message: "User has not rated this movie" });
        }

        await docRef.set(movie.toPlainObject());

        return res.status(200).json({ message: "Rating updated successfully", movie: movie });
    } catch (e) {
        console.error("Error updating rating: ", e);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { 
    getMovie,
    like,
    unlike,
    getRating,
    rate,
    editRate
}