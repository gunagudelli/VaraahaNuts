// Vercel serverless entrypoint. Every request to /api/* funnels through
// here into the Express app under server/src - Vercel just wraps it as a
// function instead of calling app.listen(). The storefront itself (the
// Vite build) is served separately as static output from the same deploy.
import { app } from "../server/src/app.js";

export default app;
