import { Request, Response } from "express";
import { injectable } from "tsyringe";
import LoginService from "../services/login.service";

@injectable()
class LoginController {
  constructor(private readonly loginService: LoginService) {}

  async login(req: Request, res: Response) {

    const response = await this.loginService.login(req.body);

    return res.json(response);
  }
}

export default LoginController;
