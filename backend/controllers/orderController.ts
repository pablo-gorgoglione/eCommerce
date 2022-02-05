import asyncHandler from 'express-async-handler';
import { Response, Request } from 'express';
import Order from '../models/orderModel';
import mercadopago, { payment } from 'mercadopago';
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model';
import { ItemPreferencesMercadoPago } from '../models/interfaces';
import axios from 'axios';
//@desc Create new order
//@route Post /api/orders
//@acess Private
export const addOrderItems = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    } else {
      const order = new Order({
        user: req.user?._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
      return;
    }

    /*  const products = await Order.find({});
    res.json(products);
    return */
  }
);

//@desc Get order by ID
//@route GET /api/orders/:id
//@acess Private
export const getOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  }
);

//deprecated
//@desc Updated order to paid
//@route GET /api/orders/:id/paid
//@acess Private
export const updateOrderToPaid = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.mail_address,
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  }
);

//@desc Get logged in user orders
//@route GET /api/orders/myorders
//@acess Private
export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find().where({ user: req.user?._id as string });
  res.json(orders);
});

//@desc Get all orders
//@route GET /api/orders
//@acess Private/Admin
export const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find().populate('user', 'id name');
  res.json(orders);
});

//@desc Updated order to delivered
//@route GET /api/orders/:id/deliver
//@acess Private/Admin
export const updateOrderToDelivered = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updatedOrder = await order.save();
      res.json(updatedOrder);
      return;
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  }
);

//@desc Create a preference in mercadopago API
//@route POST /api/orders/:id/mercadopago/preference
//@acess Private
export const createOrderMercadoPago = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.body.items) {
      res.status(400);
      throw new Error('Order has no items');
    }

    const myApiUrl = process.env.MY_API_URL;
    const orderId = req.params.id;

    const preferences: CreatePreferencePayload = {
      items: [],
      notification_url: `${myApiUrl}/orders/${orderId}/mercadopago/notification-url`,
    };
    const items: Array<ItemPreferencesMercadoPago> = req.body.items;
    items.forEach((item) => {
      preferences.items?.push({
        id: item.id,
        title: item.name,
        unit_price: item.price,
        quantity: item.quantity,
      });
    });

    const response = await mercadopago.preferences.create(preferences);
    res.json(response.body);
    return;
  }
);

//@desc  PUT Payment by id, response from Client when the payment is finished
//@route PUT /api/orders/:id/mercadopago/backs-urls/success/:paymentId
//@acess Private
export const updatedOrderToPaid_Client = asyncHandler(
  async (req: Request, res: Response) => {
    const payment_id = req.params.paymentId;
    const orderId = req.params.id;

    const order = await Order.findById(orderId);

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

    const { data } = await axios.get(
      `https://api.mercadopago.com/v1/payments/${payment_id}`,
      config
    );

    const date = new Date();
    if (req.body.status === 'approved') {
      order.isPaid = true;
      order.paidAt = date.toISOString();
    } else {
      order.isPaid = false;
    }
    order.paymentResult = {
      id: payment_id,
      status: data.status,
      update_time: data.date_approved,
      email_address: data.payer.email,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder);
    return;
  }
);

//@desc  PUT Payment by id, response from Client when the payment is finished
//@route PUT /api/orders/:id/mercadopago/notification-url
//@acess Private
export const updateOrderToPaid_Notification = asyncHandler(
  async (req: Request, res: Response) => {
    const payment_id = req.body.data.id;
    const orderId = req.params.id;

    const config = {
      headers: {
        Authorization: `Bearer ${process.env.MERCADO_PAGO_TOKEN}`,
      },
    };

    const { data } = await axios.get(
      `https://api.mercadopago.com/v1/payments/${payment_id}`,
      config
    );

    if (data.status === 'approved') {
      const order = await Order.findById(orderId);
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
        const updatedOrder = await order.save();
        res.json(updatedOrder);

        return;
      } else {
        res.status(404);
        throw new Error('Order not found');
      }
    }
  }
);
