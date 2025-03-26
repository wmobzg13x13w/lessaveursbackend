import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, createProduct);
router.route("/category/:category").get(getProductsByCategory);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

export default router;
