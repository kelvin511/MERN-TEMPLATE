import { createLogger, format, transports } from "winston";
import path from "path";
import fs from "fs";

const logDir = path.resolve(process.cwd(), "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const logger = createLogger({
  level: process.env.LOG_LEVEL ?? "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    
    new transports.File({ filename: path.join(logDir, "error.log"), level: "error", maxsize: 5_000_000 }),

    new transports.File({ filename: path.join(logDir, "combined.log"), maxsize: 10_000_000 })
  ],
  exitOnError: false
});


if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ level, message, timestamp, stack }) => {
          if (stack) return `${timestamp} ${level}: ${stack}`;
          return `${timestamp} ${level}: ${message}`;
        })
      )
    })
  );
}

export default logger;
