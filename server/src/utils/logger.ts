import pino from "pino";

export const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "password",
      "*.password",
      "*.passwordHash",
      "*.token",
      "*.accessToken",
      "*.body",
    ],
    censor: "[REDACTED]",
  },
});
