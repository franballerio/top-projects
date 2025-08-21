// this handles the operations related to the movie sql database
import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    port: 3307,
    user:  'root',
    password: '1234',
    database: 'moviesdb'
};

const connection = await mysql.createConnection(dbConfig);

export class MovieModel {
    static async getAll ({ genre }) {

        // If genre is provided, filter by genre
        if (genre) {
            const lowerGenre = genre.toLowerCase();

        }

        let query = 'SELECT BIN_TO_UUID(id) id, title, year, director, rate, duration, poster FROM movies';
        const params = [];

        const [rows] = await connection.execute(query, params);
        return rows;
    }

    static async getById ({ id }) {
        const query = 'SELECT BIN_TO_UUID(id) id, title, year, director, rate, duration, poster FROM movies WHERE id = UUID_TO_BIN(?)';
        const params = [id];
        const [rows] = await connection.execute(query, params);
        
        if (rows.length === 0) {
            return {
                message: `Movie with ${id} not found`
            }
        }

        return rows;
    }

    static async create ({ movieData }) {
        // const [title, year, director, duration, poster, rate] 


    }

    static async update ({ id, movieData }) {

    }

    static async delete ({ id }) {

    }

}