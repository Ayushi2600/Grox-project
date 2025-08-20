import { NextFunction, Request, Response, Router } from "express";

import ExchangeController from "../controller/exchange.controller";
import { container } from "tsyringe";

const exchangeController = container.resolve(ExchangeController);
const exchangeRoutes = Router();

exchangeRoutes.get("/fiat-exchange-rates", (req: Request, res: Response, next: NextFunction) => exchangeController.getFiatExchangeRates(req, res).catch((e) => next(e)));

export default exchangeRoutes;
