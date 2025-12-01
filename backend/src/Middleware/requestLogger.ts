import type { Request, Response, NextFunction } from "express";
import logger from "../util/logger";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  // Log basic request info
  logger.info("incoming_request %s %s %s", req.method, req.originalUrl, JSON.stringify(req.params || {}));

  res.on("finish", () => {
    const ms = Date.now() - start;
    logger.info("request_finished %s %s %d %dms", req.method, req.originalUrl, res.statusCode, ms);
  });

  next();
};
