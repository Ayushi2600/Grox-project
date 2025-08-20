import AppError from "./app.error";
import { ErrorCode } from "@shared/enums/error-code.enum";

export default class InvalidRequestError extends AppError {
  constructor(message: string, statusCode?: any) {
    super(statusCode ?? 400, message);

    this.errorCode = ErrorCode.BAD_REQUEST;
  }
}
