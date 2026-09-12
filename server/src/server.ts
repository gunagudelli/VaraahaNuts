import { app } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";

// Only used for local dev / a traditional Node host. Vercel's serverless
// deployment uses api/index.ts instead and never runs this file.
app.listen(env.PORT, () => {
  logger.info(`Server listening on http://localhost:${env.PORT}`);
});
