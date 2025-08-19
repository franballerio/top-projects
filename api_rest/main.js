import express from 'express';
import cors from 'cors';

import { validateMovie, validateUpdate } from './schemas/movies.js';
import movies from './movies.json' with { type: 'json' }; // Importing movies data

const app = express();
app.use(express.json()); // primer middleware para parsear JSON
app.use(cors()); // segundo middleware para habilitar CORS
app.disable('x-powered-by'); // deshabilitar x-powered-by

app.get('/', (req, res) => {
   res.json({ message: 'Hello, World!' });
});

app.get('/movies', (req, res) => {

    const { genre } = req.query;
    if (genre) {
        const filteredMovies = movies.filter(movie => movie.genre.includes(genre));
        if (filteredMovies.length === 0) {
            return res.status(404).json({ message: `No movies found for genre: ${genre}` });
        } else {
            return res.json(filteredMovies);
        }
    }
    
    res.json(movies);
});

app.delete('/movies/:id', (req, res) => {
        
    const { id } = req.params;
    const movieIndex = movies.findIndex(m => m.id === id);
    
    if (movieIndex < 0) {
        return res.status(404).json({ message: `Movie with ID ${id} not found` });
    }
    
    movies.splice(movieIndex, 1);
    res.status(204).send(); // No Content
});

app.get('/movies/:id', (req, res) => {

    const { id } = req.params;
    const movie = movies.find(m => m.id === id);
    
    if (!movie) {
        return res.status(404).json({ message: `Movie with ID ${id} not found` });
    }
    
    res.json(movie);
});

app.post("/movies", (req, res) => {
    let validMovie = validateMovie(req.body);
    
    if (!validMovie.success) {
        return res.status(400).json({ error: validMovie.error.issues });
    }
    
    validMovie = {
        id: crypto.randomUUID(), // Generating a unique ID for the movie
        ...validMovie.data
    };
    
    movies.push(validMovie); 
    res.status(201).json(validMovie);
});

app.patch("/movies/:id", (req, res) => {
    const { id } = req.params;
    const movieIndex = movies.findIndex(m => m.id === id);
    const validUpdate = validateUpdate(req.body);
    
    if (!validUpdate.success) {
        return res.status(400).json({ error: validUpdate.error.issues });
    };

    if (movieIndex < 0) {
        return res.status(404).json({ message: `Movie with ID ${id} not found` });
    };

    const updatedMovie = { 
        ...movies[movieIndex], 
        ...validUpdate.data 
    };

    movies[movieIndex] = updatedMovie;
    res.json(updatedMovie);
});    


app.use((req, res) => {
    res.status(404).send('<h1> Error 404 Not Found </h1>')     
});

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
