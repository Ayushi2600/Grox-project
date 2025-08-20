import { injectable } from "tsyringe";
import WaitlistService from "../service/waitlist.service";
import { Request, Response } from "express";
import { PaginationQuery } from "@shared/types/pagination-query.type";

@injectable()
class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  async addToWaitlist(req: Request, res: Response) {
    const response = await this.waitlistService.addToWaitlist(req.body);
    return res.status(201).json(response);
  }

  async getWaitlist(req: Request, res: Response) {
    
    const response = await this.waitlistService.getWaitlist({
      page: Number(req.query.page),
      perPage: Number(req.query.perPage),
    });
    return res.status(200).json(response);
  }
}

export default WaitlistController;
