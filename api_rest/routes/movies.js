// with this we organize all the /movies routes in a single file
// and use the movieController to handle the logic for each route

import router from 'express';
import { movieController } from '../controllers/movies.js';

export const moviesRouter = router();

// using controllers to handle the logic for the routes
moviesRouter.get('/', movieController.getAll);
moviesRouter.post("/", movieController.create); 

moviesRouter.get('/:id', movieController.getById);
moviesRouter.patch("/:id", movieController.update); 
moviesRouter.delete('/:id', movieController.delete); 