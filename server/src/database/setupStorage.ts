import { ensureBucketExists } from "../services/storageService.js";

ensureBucketExists()
  .then(() => {
    console.log("Storage bucket ready.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Failed to set up storage bucket:", err);
    process.exit(1);
  });
