const fetch = require('node-fetch');
const userRepository = require('../repositories/userRepository')
require('dotenv').config({ path: '.env' });

const { db } = require('../../db');
const Movie = require('../models/movie');
const getGenreIdByName = require('../utils/genres');

const getMoviesWithList = async (req, res) => {
    try {
        const { movieIds } = req.body;
        
        if (!Array.isArray(movieIds)) {
            return res.status(400).json({ error: 'movieIds should be an array' });
        }

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.MOVIEDB_API_KEY}`
            }
        };
        const moviePromises = movieIds.map(movieId => 
            fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error fetching movie with ID ${id}: ${response.statusText}`);
                    }
                    return response.json();
                })
        );

        const responses = await Promise.all(moviePromises);
        return res.status(200).json({ movies: responses });
    } catch (e) {
        console.error('Error fetching movies:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&append_to_response=credits`;
        const trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
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

        const trailerResponse = await fetch(trailerUrl, options);
        if (!trailerResponse.ok) {
            throw new Error(`Failed to fetch movie videos: ${trailerResponse.statusText}`);
        }

        const trailerData = await trailerResponse.json();
        const movieData = await response.json();

        const trailer = trailerData.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');
        const youtubeUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;

        movieData.trailerUrl = youtubeUrl;

        res.status(200).json(movieData);
    } catch (e) {
        console.error('Error getting movie:', e);
        res.status(400).json({ message: e.message });
    }
}

const getMovieByGenre = async (req, res) => {
    try {
        let { genre, page } = req.query;

        genre = await getGenreIdByName(genre);
        page = page ? parseInt(page) : 1;

        const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&page=${page}`;
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

const searchMovie = async (req, res) => {
    try {
        let { name, include_adult, language, page } = req.query;

        if (!name) {
            return res.status(400).json({ error: 'Name parameter is required and cannot be empty' });
        }

        name = name.split(' ').join("%20")
        include_adult = include_adult === undefined ? "false" : include_adult === "true";
        language = language || 'en-US';
        page = page ? parseInt(page) : 1;

        const url = `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=${include_adult}&language=${language}&page=${page}`;
        
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
        res.status(200).json({ message: "Movie liked successfully", movie: movieId});
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
        res.status(200).json({ message: 'Movie unliked successfully', movie: movieId });
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

        if (!movieRef.exists) {
            return res.status(200).json({
                "ratings": {}
            });
        }

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
            movie = Movie.fromFirestore({id: docSnap.id, ...docSnap.data()});
        }

        if (movie.getRating(user[0].id) !== undefined) {
            return res.status(400).json({ message: "User already rated this movie" });
        }

        movie.addRating(user[0].id, rating);
        await docRef.set(movie.toPlainObject());

        return res.status(200).json({ message: "Rating updated successfully", movie: movie.id });
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
            return res.status(404).json({ message: "User has not rated this movie" });
        }
        
        let movie = Movie.fromFirestore({id: docSnap.id, ...docSnap.data()});

        if (movie.getRating(user[0].id) !== undefined) {
            movie.addRating(user[0].id, rating);
        } else {
            return res.status(400).json({ message: "User has not rated this movie" });
        }

        await docRef.set(movie.toPlainObject());
        console.log(movie)
        return res.status(200).json({ message: "Rating updated successfully!", movie: movie.id });
    } catch (e) {
        console.error("Error updating rating: ", e);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getMoviesWithList, 
    getMovie,
    like,
    unlike,
    getRating,
    rate,
    editRate,
    searchMovie,
    getMovieByGenre
}