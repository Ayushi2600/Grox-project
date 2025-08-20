import { Router } from "express";
import WaitlistController from "../controller/waitlist.controller";
import { container } from "tsyringe";
import { addToWaitlistSchema } from "../schemas/waitlist.schema";
import schemaValidator from "@shared/middleware/schema-validator.middleware";
import { paginationSchema } from "@shared/schemas/pagination.schema";

const waitlistController = container.resolve(WaitlistController);

const waitlistRoutes = Router();

waitlistRoutes.post("/waitlist", schemaValidator(addToWaitlistSchema), (req, res, next) => waitlistController.addToWaitlist(req, res).catch((e) => next(e)));
waitlistRoutes.get("/waitlist", schemaValidator(paginationSchema, "query"), (req, res, next) => waitlistController.getWaitlist(req, res).catch((e) => next(e)));

export default waitlistRoutes;
