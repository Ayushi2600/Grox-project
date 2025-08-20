import { Request, Response, NextFunction, Router } from "express";
import UserController from "../controller/user.controller";
import schemaValidator from "@shared/middleware/schema-validator.middleware";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import { container } from "tsyringe";
import { regenerateOTPSchema, verifyOTPSchema, verifyUserIdSchema } from "../schemas/otp.schema";

const userController = container.resolve(UserController);

const userRoutes = Router();

userRoutes.post("/register", schemaValidator(createUserSchema), (req: Request, res: Response, next: NextFunction) => userController.createUser(req, res).catch((e) => next(e)));
userRoutes.put("/user/:userId", schemaValidator(verifyUserIdSchema, "params"), schemaValidator(updateUserSchema), (req: Request, res: Response, next: NextFunction) => userController.updateUser(req, res).catch((e) => next(e)));
userRoutes.post("/verify-otp/:userId", schemaValidator(verifyUserIdSchema, "params"), schemaValidator(verifyOTPSchema), (req: Request, res: Response, next: NextFunction) => userController.verifyOTP(req, res).catch((e) => next(e)));
userRoutes.post("/regenerate-otp", schemaValidator(regenerateOTPSchema), (req: Request, res: Response, next: NextFunction) => userController.regenerateOTP(req, res).catch((e) => next(e)));
userRoutes.get("/users/count", (req: Request, res: Response, next: NextFunction) => userController.countRegisteredUsers(req, res).catch((e) => next(e)));

export default userRoutes;
