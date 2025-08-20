import { injectable } from "tsyringe";
import AuthService from "../services/auth.service";
import { Request, Response } from "express";

@injectable()
class AuthController {
  constructor(private readonly authService: AuthService) {}

  async resetPassword(req: Request, res: Response) {
    const response = await this.authService.resetPassword(req.body);

    return res.json(response);
  }

  async changePassword(req: Request, res: Response) {
    const response = await this.authService.changePassword(req.body);

    return res.json(response);
  }

  async validateToken(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const response = await this.authService.validateOTP(req.body, userId);

    return res.json(response);
  }

    async sumsubAccessToken(req: Request, res: Response) {
    try {
      const userId = req.body.userId;
      if (!userId) {
        return res.status(400).json({ error: "Missing userId" });
      }

      const token = await this.authService.getSumsubAccessToken(userId);
      if (!token) {
        return res.status(500).json({ error: "Failed to retrieve token" });
      }

      return res.json({ token, userId });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default AuthController;
