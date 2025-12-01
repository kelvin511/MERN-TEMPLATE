import type { Request, Response, NextFunction, RequestHandler } from "express";
import type Joi from "joi";

/**
 * Generic validation middleware using Joi.
 *
 * Usage:
 *  router.post('/', validate<CreateUser>(createUserSchema, 'body'), handler)
 *
 * Note: we cast req[property] with 'any' because Express's Request typing
 * doesn't strongly type body/query/params by default. The middleware still
 * assigns the validated & coerced value at runtime.
 */

export const validate =
  <T = unknown>(schema: Joi.ObjectSchema, property: "body" | "query" | "params" = "body"): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
      convert: true // allow coercion (e.g., "123" -> 123) if schemas allow
    });

    if (error) {
      const details = error.details.map((d) => ({
        path: d.path.join("."),
        message: d.message
      }));

      return res.status(400).json({
        error: "validation_error",
        message: "Invalid request data",
        details
      });
    }

    // assign the sanitized/coerced value back to the request
    // (use a safe cast to any because Request typing is loose here)
    (req as any)[property] = value as T;

    return next();
  };
