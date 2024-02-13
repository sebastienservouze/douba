import { Router } from "express";

const HelloWorldController = Router();

HelloWorldController.get('/', async (req, res) => {
    return res.status(200).json('Hello world !')
})

export { HelloWorldController }