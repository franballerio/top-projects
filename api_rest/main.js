import express from 'express';

import { corsMiddleware } from './middleware/corsMiddleware.js';
import { moviesRouter } from './routes/movies.js'; // Importing the movies router

const app = express();
app.use(express.json()); // primer middleware para parsear JSON
app.use(corsMiddleware()); // segundo middleware para habilitar CORS
app.disable('x-powered-by'); // deshabilitar x-powered-by

app.get('/', (req, res) => {
   res.json({ message: 'Hello, World!' });
});

app.use('/movies', moviesRouter); // Using the movies router for /movies routes

app.use((req, res) => {
    res.status(404).send('<h1> Error 404 Not Found </h1>')     
});

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
