import cors from "cors";
import AppError from "@shared/errors/app.error";
import { ErrorResponse } from "@shared/utils/response.util";
import { Application, json, NextFunction, Request, Response, urlencoded } from "express";

function registerThirdPartyModules(app: Application) {
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cors({ origin: "*" }));
}

function bootstrapApp(app: Application) {
  registerThirdPartyModules(app);

}

export function setErrorHandler(app: Application) {
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 503;
    const message = err instanceof AppError ? err.message : "We are unable to process this request. Please try again.";

    console.log(err);
    
    res.status(statusCode).json(ErrorResponse(message));
  });
}

export default bootstrapApp;
