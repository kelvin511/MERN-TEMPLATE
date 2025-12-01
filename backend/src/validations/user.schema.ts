import Joi from "joi";

/**
 * Joi schema for creating a user.
 *
 * We also export a TS type that mirrors the schema for compile-time safety.
 * (Joi doesn't infer TS types, so we keep a manual type in sync.)
 */

export const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  age: Joi.number().integer().min(13).optional(),
  role: Joi.string().valid("user", "admin").default("user")
}).options({ stripUnknown: true, // remove unknown keys by default
             abortEarly: false  // return all errors
           });

export type CreateUser = {
  name: string;
  email: string;
  age?: number;
  role?: "user" | "admin";
};



export const idParamSchema = Joi.object({
  id: Joi.string()
    .pattern(/^\d+$/) // our in-memory DB uses numeric-string ids; adjust for UUID if needed
    .required()
}).options({ abortEarly: false, stripUnknown: true });

