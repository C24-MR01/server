const fetch = require('node-fetch');
const userRepository = require('../repositories/userRepository')
require('dotenv').config({ path: '.env' });

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

module.exports = { 
    getMovie,
    like,
    unlike
}