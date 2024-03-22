import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @des      Create new order
// @route    POST /api/orders
// @access   Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @des      Get logged in users orders
// @route    GET /api/orders/myorders
// @access   Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(201).json(orders);
});

// @des      Get order by id
// @route    GET /api/orders/:id
// @access   Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(201).json(order);
  } else {
    res.status(404);
    throw new Error("order not found");
  }
});

// @des      Update order to paid
// @route    PUT /api/orders/:id/pay
// @access   Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      updateTime: req.body.updataTime,
      email_address: req.body.email_address,
    };

    const updateOrder = await order.save();
    res.status(201).json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @des      Update order to delivered
// @route    PUT /api/orders/:id/deliver
// @access   Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});

// @des      Get all orders
// @route    GET /api/orders
// @access   Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("get all orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
  getOrders,
};
