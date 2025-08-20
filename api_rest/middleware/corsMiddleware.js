// Creating a middleware for CORS
// This middleware will handle CORS requests and can be used in the main.js file.

import cors from 'cors';

export const corsMiddleware = () => cors({
        origin: '*', // Allow all origins
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // Allowed methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
        credentials: true // Allow credentials
    });

