let genres = [];

const fetchGenres = async () => {
    const url = `https://api.themoviedb.org/3/genre/movie/list?language=en-US`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.MOVIEDB_API_KEY}`
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
            genres = data.genres;
        } else {
            console.error('Failed to fetch genres:', data);
        }
    } catch (e) {
        console.error('Error fetching genres:', e);
    }
};

const getGenreIdByName = async (genreName) => {
    await fetchGenres();
    const genre = genres.find(g => g.name.toLowerCase() === genreName.toLowerCase());
    return genre ? genre.id : null;
};

module.exports = getGenreIdByName;