import { NextFunction, Request, Response, Router } from "express";
import { container } from "tsyringe";
import { changePasswordSchema, loginSchema, resetPasswordSchema, validateTokenSchema } from "../schemas/login.schema";
import schemaValidator from "@shared/middleware/schema-validator.middleware";
import AuthController from "../controller/auth.controller";
import LoginController from "../controller/login.controller";
import authMiddleware from "@shared/middleware/auth.middleware";

const authController = container.resolve(AuthController);
const loginController = container.resolve(LoginController);

const authRoutes = Router();

authRoutes.post("/auth/login", schemaValidator(loginSchema), (req: Request, res: Response, next: NextFunction) => loginController.login(req, res).catch((e) => next(e)));
// Reset password
authRoutes.post("/auth/reset-password", schemaValidator(resetPasswordSchema), (req: Request, res: Response, next: NextFunction) => authController.resetPassword(req, res).catch((e) => next(e)));
authRoutes.post("/auth/change-password", authMiddleware, schemaValidator(changePasswordSchema), (req: Request, res: Response, next: NextFunction) => authController.changePassword(req, res).catch((e) => next(e)));
authRoutes.post("/auth/validate-token/:userId", schemaValidator(validateTokenSchema), (req: Request, res: Response, next: NextFunction) => authController.validateToken(req, res).catch((e) => next(e)));
authRoutes.post(
  "/auth/sumsub/accessTokens",
  (req: Request, res: Response, next: NextFunction) =>
    authController.sumsubAccessToken(req, res).catch((e) => next(e))
);

export default authRoutes;
