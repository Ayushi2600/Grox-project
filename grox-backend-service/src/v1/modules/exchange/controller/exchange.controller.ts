import { Request, response, Response } from "express";
import { injectable } from "tsyringe";
import ExchangeService from "../service/exchange.service";

@injectable()
class ExchangeController {

  constructor(private readonly exchangeService: ExchangeService) {}
  async getFiatExchangeRates(req: Request, res: Response) {
    const response = await this.exchangeService.getFiatExchangeRates();
    return res.json(response)
  }
}

export default ExchangeController;
