import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import UnauthorizedError from "@shared/errors/unautjorize.error";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = getAuthTokenFromRequestHeader(req);
    if (!authToken) {
      throw new UnauthorizedError("You are unauthorized");
    }

    const payload = jwt.decode(authToken) as any;

    (req as any).user = payload.user;

    next();
  } catch (err) {
    throw new UnauthorizedError("You are unauthorized");
  }
};

const getAuthTokenFromRequestHeader = (req: Request): string | null => {
  const authTokenSegments = (req.headers.authorization || "").split(" ");
  
  return authTokenSegments.length === 2 ? authTokenSegments[1] : null;
};

export default authMiddleware;
