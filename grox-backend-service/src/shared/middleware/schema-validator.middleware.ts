import { Schema } from "joi";
import { Request, Response, NextFunction } from "express";

type ValidSchemaFields = 'body' | 'query' | 'params';

const schemaValidator =
  (schema: Schema, forSchema: ValidSchemaFields = "body") =>
    
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[forSchema], {
      abortEarly: true,
      allowUnknown: false,
    });

    if (error) {
      return res.status(422).json({
        error: error.message,
      });
    }

    // req[forSchema] = value;
    return next();
  };

export default schemaValidator;
