import express from "express";
import {
  createOrder,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
  getOrders,
  deleteOrder,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(createOrder).get(protect, admin, getOrders);
router.route("/myorders").get(getMyOrders);
router.route("/:id").get(getOrderById).delete(protect, admin, deleteOrder);
router.route("/:id/status").put(protect, admin, updateOrderStatus);

export default router;
