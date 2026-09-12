import { Router } from "express";
import multer from "multer";
import { requireProductAdmin } from "../middleware/auth.js";
import { HttpError } from "../middleware/errorHandler.js";
import { uploadImage, UploadFolder } from "../services/storageService.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new HttpError(400, "Only image files are allowed"));
      return;
    }
    cb(null, true);
  },
});

const ALLOWED_FOLDERS: UploadFolder[] = ["banners", "products", "categories"];

router.post("/", requireProductAdmin, upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      throw new HttpError(400, "No file uploaded");
    }
    const folderParam = typeof req.query.folder === "string" ? req.query.folder : "";
    const folder = ALLOWED_FOLDERS.includes(folderParam as UploadFolder)
      ? (folderParam as UploadFolder)
      : "products";

    const url = await uploadImage(folder, req.file.buffer, req.file.originalname, req.file.mimetype);
    res.status(201).json({ url });
  } catch (err) {
    next(err);
  }
});

export default router;
