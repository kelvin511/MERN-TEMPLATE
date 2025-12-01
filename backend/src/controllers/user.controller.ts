import type { Request, Response } from "express";
import type { CreateUser } from "../validations/user.schema";
import logger from "../util/logger";

/**
 * Simple in-memory store mocking a DB.
 * Key: id (string), Value: record
 */
const store = new Map<string, any>();

/** auto-increment id generator (for demo) */
let lastId = 0;

export const listUsers = (req: Request, res: Response) => {
  const users = Array.from(store.values());
  return res.json({ data: users, count: users.length });
};

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const user = store.get(id);
  if (!user) return res.status(404).json({ error: "not_found", message: "User not found" });
  return res.json({ data: user });
};

export const createUser = (req: Request, res: Response) => {
  const body = req.body as CreateUser;
  lastId += 1;
  const id = String(lastId);
  const now = new Date().toISOString();
  const record = { id, ...body, createdAt: now, updatedAt: now };
  store.set(id, record);
  logger.info("user_created id=%s email=%s", id, body.email);
  return res.status(201).json({ message: "User created", data: record });
};

export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const existing = store.get(id);
  if (!existing) return res.status(404).json({ error: "not_found", message: "User not found" });

  const body = req.body as Partial<CreateUser>;
  const updated = { ...existing, ...body, updatedAt: new Date().toISOString() };
  store.set(id, updated);
  logger.info("user_updated id=%s", id);
  return res.json({ message: "User updated", data: updated });
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!store.has(id)) return res.status(404).json({ error: "not_found", message: "User not found" });
  store.delete(id);
  logger.warn("user_deleted id=%s", id);
  return res.status(204).send();
};
