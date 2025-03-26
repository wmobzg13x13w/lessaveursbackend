import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    fullName,
    email,
    phone,
    address,
    ville,
    paymentMethod,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  if (!fullName || !email || !phone || !address || !ville) {
    res.status(400);
    throw new Error("All order information is required");
  }

  const order = new Order({
    orderItems: orderItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      image: item.image,
      price: item.price,
      product: item.product,
    })),
    fullName,
    email,
    phone,
    address,
    ville,
    paymentMethod: paymentMethod || "cash",
    totalPrice,
    status: "pending",
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = req.body.status || order.status;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get orders by customer email
// @route   GET /api/orders/myorders
// @access  Public
const getMyOrders = asyncHandler(async (req, res) => {
  const customerEmail = req.query.email;
  if (!customerEmail) {
    res.status(400);
    throw new Error("Customer email is required");
  }
  const orders = await Order.find({ customerEmail });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
});

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    await order.deleteOne();
    res.json({ message: "Order removed" });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  createOrder,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
  getOrders,
  deleteOrder,
};
