import { injectable } from "tsyringe";
import { Request, Response } from "express";
import UserOnboardingService from "../service/user-onboarding.service";

@injectable()
class UserController {

  constructor(private readonly userService: UserOnboardingService) {}

  async createUser(req: Request, res: Response) {    
    const response = await this.userService.createUser(req.body);
    return res.status(201).json(response);
  }

  async updateUser(req: Request, res: Response) {
    const response = await this.userService.updateUser(Number(req.params?.userId) as number, req.body);
    return res.status(200).json(response);
  }

  async verifyOTP(req: Request, res: Response) {
    const response = await this.userService.verifyOTP(req.body, Number(req.params?.userId) as number);
    return res.status(200).json(response);
  }

  async regenerateOTP(req: Request, res: Response) {
    const response = await this.userService.regenerateOTP(req.body.email, req.body.type);
    return res.status(200).json(response);
  }

  async countRegisteredUsers(req: Request, res: Response) {
    const response = await this.userService.countRegisteredUsers();
    return res.status(200).json(response);
  }
}

export default UserController;
