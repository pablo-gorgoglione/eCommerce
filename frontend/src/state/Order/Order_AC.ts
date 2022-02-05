import axios from 'axios';
import { Dispatch } from 'redux';
import { Order, OrderWithUser, URL_API } from '../../interfaces';
import { RootState } from '../store';
import {
  OrderCreateActionType,
  OrderDeliverActionType,
  OrderDetailActionType,
  OrderListActionType,
  OrderListMyActionType,
  OrderPaidActionType,
} from './OrderActionTypes';
import { OrderDetailActions } from './ActionsRef/OrderDetailActions';
import { OrderPaidActions } from './ActionsRef/OrderPaidActions';
import { OrderMyListActions } from './ActionsRef/OrderMyActions';
import { OrderListActions } from './ActionsRef/OrderListActions';
import { OrderDeliverActions } from './ActionsRef/OrderDeliverActions';
import { CartActionType } from '../Cart/CartActions';

export const createOrder =
  (order: Order) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: OrderCreateActionType.REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // create a order in the DB
      const { data } = await axios.post(`${URL_API}orders`, order, config);

      dispatch({
        type: OrderCreateActionType.SUCCESS,
        payload: data,
      });

      // Clear the Cart
      dispatch({
        type: CartActionType.RESET,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //custom API error
        dispatch({
          type: OrderCreateActionType.FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      } else {
        //Other error
        // throw new Error('different error than axios');
        dispatch({
          type: OrderCreateActionType.FAIL,
          payload: 'Unknow error :( ',
        });
      }
    }
  };

export const getOrderDetails =
  (id: string) =>
  async (dispatch: Dispatch<OrderDetailActions>, getState: () => RootState) => {
    try {
      dispatch({
        type: OrderDetailActionType.REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`${URL_API}orders/${id}`, config);

      dispatch({
        type: OrderDetailActionType.SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //custom API error
        dispatch({
          type: OrderDetailActionType.FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      } else {
        //Other error
        // throw new Error('different error than axios');
        dispatch({
          type: OrderDetailActionType.FAIL,
          payload: 'Unknow error :( ',
        });
      }
    }
  };

export const payOrder =
  (orderId: string, paymentResult: string) =>
  async (dispatch: Dispatch<OrderPaidActions>, getState: () => RootState) => {
    try {
      dispatch({
        type: OrderPaidActionType.REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${URL_API}orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({
        type: OrderPaidActionType.SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //custom API error
        dispatch({
          type: OrderPaidActionType.FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      } else {
        //Other error
        // throw new Error('different error than axios');
        dispatch({
          type: OrderPaidActionType.FAIL,
          payload: 'Unknow error :( ',
        });
      }
    }
  };

export const listMyOrders =
  () =>
  async (dispatch: Dispatch<OrderMyListActions>, getState: () => RootState) => {
    try {
      dispatch({
        type: OrderListMyActionType.REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`${URL_API}orders/myorders`, config);

      dispatch({
        type: OrderListMyActionType.SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //custom API error
        dispatch({
          type: OrderListMyActionType.FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      } else {
        //Other error
        // throw new Error('different error than axios');
        dispatch({
          type: OrderListMyActionType.FAIL,
          payload: 'Unknow error :( ',
        });
      }
    }
  };

export const listOrders =
  () =>
  async (dispatch: Dispatch<OrderListActions>, getState: () => RootState) => {
    try {
      dispatch({
        type: OrderListActionType.REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`${URL_API}orders`, config);

      dispatch({
        type: OrderListActionType.SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //custom API error
        dispatch({
          type: OrderListActionType.FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      } else {
        //Other error
        // throw new Error('different error than axios');
        dispatch({
          type: OrderListActionType.FAIL,
          payload: 'Unknow error :( ',
        });
      }
    }
  };

export const deliverOrder =
  (order: OrderWithUser) =>
  async (
    dispatch: Dispatch<OrderDeliverActions>,
    getState: () => RootState
  ) => {
    try {
      dispatch({
        type: OrderDeliverActionType.REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${URL_API}orders/${order._id}/deliver`,
        {},
        config
      );

      dispatch({
        type: OrderDeliverActionType.SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //custom API error
        dispatch({
          type: OrderDeliverActionType.FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      } else {
        //Other error
        // throw new Error('different error than axios');
        dispatch({
          type: OrderDeliverActionType.FAIL,
          payload: 'Unknow error :( ',
        });
      }
    }
  };
