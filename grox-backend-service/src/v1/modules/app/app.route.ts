import express, { Request, Response } from "express";
import { container } from "tsyringe";
import AppController from "./app.controller";

const appController = container.resolve(AppController);

const appRoute = express.Router();

appRoute.get("/", (req: Request, res: Response) => {
  appController.getHello(req, res);
});

export default appRoute;
