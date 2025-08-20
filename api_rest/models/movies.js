// this handles the operations related to the movie data source

import movies from '../movies.json' with { type: 'json' };

export class MovieModel {
    static async getAll ({ genre }) {
        if (genre) {
            const filteredMovies = movies.filter(movie => movie.genre.includes(genre));
            if (filteredMovies.length === 0) {
                throw new Error(`No movies found for genre: ${genre}`);
            }
            return filteredMovies;
        }
        return movies;
    }

    static async getById ({ id }) {
        const movie = movies.find(m => m.id === id);
        if (!movie) {
            throw new Error(`Movie with ID ${id} not found`);
        }
        return movie;
    }

    static async create ({ movieData }) {
        const newMovie = {
            id: crypto.randomUUID(),
            ...movieData
        };
        movies.push(newMovie);
        return newMovie;
    }

    static async update ({ id, movieData }) {
        const movieIndex = movies.findIndex(m => m.id === id);
        if (movieIndex < 0) {
            throw new Error(`Movie with ID ${id} not found`);
        }
        const updatedMovie = { ...movies[movieIndex], ...movieData };
        movies[movieIndex] = updatedMovie;
        return updatedMovie;
    }

    static async delete ({ id }) {
        const movieIndex = movies.findIndex(m => m.id === id);
        if (movieIndex < 0) {
            throw new Error(`Movie with ID ${id} not found`);
        }
        movies.splice(movieIndex, 1);
        return { message: `Movie with ID ${id} deleted successfully` };
    }   
}