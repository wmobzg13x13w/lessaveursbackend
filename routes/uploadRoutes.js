import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Get current file directory (ESM equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|svg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

// Initialize upload
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Single upload route
router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path.replace(/\\/g, "/")}`);
});

// Multiple upload route
router.post("/multiple", upload.array("images", 5), (req, res) => {
  const paths = req.files.map((file) => `/${file.path.replace(/\\/g, "/")}`);
  res.json(paths);
});

export default router;
