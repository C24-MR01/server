class Movie {
    constructor (id)   {
        this.id = id;
        this.ratings = {};
    }

    addRating(id, rating) {
        this.ratings[id] = rating;
    }

    getRating(id) {
        return this.ratings[id];
    }

    toPlainObject() {
        return {
            ratings: this.ratings,
        };
    }

    static fromFirestore(data) {
        const movie = new Movie(data.id);
        movie.ratings = data.ratings || {};
        return movie;
    }
}

module.exports = Movie;