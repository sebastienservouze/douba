import { Router } from "express";
import { MovieService } from "../services/movie.service";

const MovieController = Router();
const service = new MovieService();

MovieController.get('/:title', async (req, res) => {
    return service.findMoviesByTitle(req.params.title);
})

export { MovieController }