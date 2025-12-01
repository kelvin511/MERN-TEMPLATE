import { Router } from "express";
import { createUserSchema, idParamSchema, type CreateUser } from "../validations/user.schema";
import { validate } from "../middleware/validator";
import {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/user.controller";

const router = Router();

/**
 * CRUD:
 * GET    /api/users        -> list
 * POST   /api/users        -> create
 * GET    /api/users/:id    -> read
 * PUT    /api/users/:id    -> update
 * DELETE /api/users/:id    -> delete
 */

// list
router.get("/", listUsers);

// create
router.post("/", validate<CreateUser>(createUserSchema, "body"), createUser);

// read
router.get("/:id", validate(idParamSchema, "params"), getUser);

// update
router.put("/:id", validate(idParamSchema, "params"), validate<Partial<CreateUser>>(createUserSchema.optional(), "body"), updateUser);

// delete
router.delete("/:id", validate(idParamSchema, "params"), deleteUser);

export default router;
