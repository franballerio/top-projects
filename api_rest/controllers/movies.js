// abstract class for movie controller
// it handles the logic for the movie routes
// it uses the MovieModel to interact with the data
import { MovieModel } from "../models/sqlMovies.js";
import { validateMovie, validateUpdate } from '../schemas/movies.js';

export class movieController {
    static async getAll (req, res) {
        const { genre } = req.query;
        const movies = await MovieModel.getAll({ genre }); // abstracting the logic to the model
        
        res.json(movies);
    }

    static async getById (req, res) {
        const { id } = req.params;
        const movie = await MovieModel.getById({id}); 
        
        res.json(movie);
    }

    static async create (req, res) {
        let validMovie = validateMovie(req.body);
        
        if (!validMovie.success) {
            return res.status(400).json({ error: validMovie.error.issues });
        }
        
        let movie = await MovieModel.create({ movieData: validMovie.data });
        res.status(201).json(movie);        
    }

    static async update (req, res) {
        const { id } = req.params;
        const validUpdate = validateUpdate(req.body);
        
        if (!validUpdate.success) {
            return res.status(400).json({ error: validUpdate.error.issues });
        };
        
        const updatedMovie = await MovieModel.update({ id, movieData: validUpdate.data });
        res.json(updatedMovie);
    }

    static async delete (req, res) {
        const { id } = req.params;
        const result = await MovieModel.delete({ id });

        res.status(200).json(result); // No Content
    }
}