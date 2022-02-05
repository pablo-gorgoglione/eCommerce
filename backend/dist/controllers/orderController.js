"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderToPaid_Notification = exports.updatedOrderToPaid_Client = exports.createOrderMercadoPago = exports.updateOrderToDelivered = exports.getOrders = exports.getMyOrders = exports.updateOrderToPaid = exports.getOrderById = exports.addOrderItems = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const orderModel_1 = __importDefault(require("../models/orderModel"));
const mercadopago_1 = __importDefault(require("mercadopago"));
const axios_1 = __importDefault(require("axios"));
//@desc Create new order
//@route Post /api/orders
//@acess Private
exports.addOrderItems = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, } = req.body;
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    }
    else {
        const order = new orderModel_1.default({
            user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });
        const createdOrder = yield order.save();
        res.status(201).json(createdOrder);
        return;
    }
    /*  const products = await Order.find({});
    res.json(products);
    return */
}));
//@desc Get order by ID
//@route GET /api/orders/:id
//@acess Private
exports.getOrderById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.default.findById(req.params.id).populate('user', 'name email');
    if (order) {
        res.json(order);
    }
    else {
        res.status(404);
        throw new Error('Order not found');
    }
}));
//deprecated
//@desc Updated order to paid
//@route GET /api/orders/:id/paid
//@acess Private
exports.updateOrderToPaid = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.default.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.mail_address,
        };
        const updatedOrder = yield order.save();
        res.json(updatedOrder);
    }
    else {
        res.status(404);
        throw new Error('Order not found');
    }
}));
//@desc Get logged in user orders
//@route GET /api/orders/myorders
//@acess Private
exports.getMyOrders = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const orders = yield orderModel_1.default.find().where({ user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id });
    res.json(orders);
}));
//@desc Get all orders
//@route GET /api/orders
//@acess Private/Admin
exports.getOrders = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield orderModel_1.default.find().populate('user', 'id name');
    res.json(orders);
}));
//@desc Updated order to delivered
//@route GET /api/orders/:id/deliver
//@acess Private/Admin
exports.updateOrderToDelivered = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.default.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = yield order.save();
        res.json(updatedOrder);
        return;
    }
    else {
        res.status(404);
        throw new Error('Order not found');
    }
}));
//@desc Create a preference in mercadopago API
//@route POST /api/orders/:id/mercadopago/preference
//@acess Private
exports.createOrderMercadoPago = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.items) {
        res.status(400);
        throw new Error('Order has no items');
    }
    const myApiUrl = process.env.MY_API_URL;
    const orderId = req.params.id;
    const preferences = {
        items: [],
        notification_url: `${myApiUrl}/orders/${orderId}/mercadopago/notification-url`,
    };
    const items = req.body.items;
    items.forEach((item) => {
        var _a;
        (_a = preferences.items) === null || _a === void 0 ? void 0 : _a.push({
            id: item.id,
            title: item.name,
            unit_price: item.price,
            quantity: item.quantity,
        });
    });
    const response = yield mercadopago_1.default.preferences.create(preferences);
    res.json(response.body);
    return;
}));
//@desc  PUT Payment by id, response from Client when the payment is finished
//@route PUT /api/orders/:id/mercadopago/backs-urls/success/:paymentId
//@acess Private
exports.updatedOrderToPaid_Client = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payment_id = req.params.paymentId;
    const orderId = req.params.id;
    const order = yield orderModel_1.default.findById(orderId);
    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }
    if (order.isPaid === true) {
        res.json(order);
        return;
    }
    //fetch data from MP API with payment_id
    const config = {
        headers: {
            Authorization: `Bearer ${process.env.MERCADO_PAGO_TOKEN}`,
        },
    };
    const { data } = yield axios_1.default.get(`https://api.mercadopago.com/v1/payments/${payment_id}`, config);
    const date = new Date();
    if (req.body.status === 'approved') {
        order.isPaid = true;
        order.paidAt = date.toISOString();
    }
    else {
        order.isPaid = false;
    }
    order.paymentResult = {
        id: payment_id,
        status: data.status,
        update_time: data.date_approved,
        email_address: data.payer.email,
    };
    const updatedOrder = yield order.save();
    res.json(updatedOrder);
    return;
}));
//@desc  PUT Payment by id, response from Client when the payment is finished
//@route PUT /api/orders/:id/mercadopago/notification-url
//@acess Private
exports.updateOrderToPaid_Notification = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payment_id = req.body.data.id;
    const orderId = req.params.id;
    const config = {
        headers: {
            Authorization: `Bearer ${process.env.MERCADO_PAGO_TOKEN}`,
        },
    };
    const { data } = yield axios_1.default.get(`https://api.mercadopago.com/v1/payments/${payment_id}`, config);
    if (data.status === 'approved') {
        const order = yield orderModel_1.default.findById(orderId);
        if (order) {
            order.isPaid = true;
            const date = new Date();
            order.paidAt = date.toISOString();
            order.paymentResult = {
                id: payment_id,
                status: data.status,
                update_time: data.date_approved,
                email_address: data.payer.email,
            };
            const updatedOrder = yield order.save();
            res.json(updatedOrder);
            return;
        }
        else {
            res.status(404);
            throw new Error('Order not found');
        }
    }
}));
//# sourceMappingURL=orderController.js.map