import AppError from "./app.error";
import { ErrorCode } from "@shared/enums/error-code.enum";

export default class UnauthorizedError extends AppError {
  constructor(message: string, statusCode?: any) {
    super(statusCode ?? 401, message);

    this.errorCode = ErrorCode.BAD_REQUEST;
  }
}
