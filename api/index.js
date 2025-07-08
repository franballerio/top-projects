// import the dependencies 
import express from 'express';
import Knex from 'knex';
import knexConfig from './knexfile.js';


const knex = Knex(knexConfig); 
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());


// this is the GET /users (gets all the users)
app.get('/users', async (req, res) => {
    try {
        const users = await knex('users').select('id', 'name', 'email');
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Could not fetch users.'
        })
    } 
});

// this is the POST /users (creates a new user in the table users)
app.post('/users', async (req, res) => {
    const {name, email} = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: 'Name and email are required.'
        })
    } 

    try {
        const [newUserId] = await knex('users').insert({ name, email });
        res.status(201).json({ id: newUserId, name, email });
    } catch (error) {
        console.error(error);
        // Handle specific errors, e.g., duplicate email
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Email already exists.' });
        }
        res.status(500).json({ error: 'Could not create user.' });
    }
});
        
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`)
})