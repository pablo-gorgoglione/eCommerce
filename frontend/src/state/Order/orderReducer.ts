import { Reducer } from 'redux';
import {
  OrderMyList,
  Order,
  OrderCreateState,
  OrderDetailState,
  OrderPaidState,
  OrderWithUser,
  OrderListState,
} from '../../interfaces';
import {
  OrderCreateActionType,
  OrderDeliverActionType,
  OrderDetailActionType,
  OrderListActionType,
  OrderListMyActionType,
  OrderPaidActionType,
} from './OrderActionTypes';
import { OrderCreateActions } from './ActionsRef/OrderCreateActions';
import { OrderDetailActions } from './ActionsRef/OrderDetailActions';
import { OrderPaidActions } from './ActionsRef/OrderPaidActions';
import { OrderMyListActions } from './ActionsRef/OrderMyActions';
import { OrderListActions } from './ActionsRef/OrderListActions';
import { OrderDeliverActions } from './ActionsRef/OrderDeliverActions';

const initialOrder: Order = {
  _id: '',
  orderItems: [],
  shippingAddress: {
    address: '',
    city: '',
    country: '',
    postalCode: '',
  },
  paymentMethod: '',
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  isPaid: false,
  isDelivered: false,
  paidAt: '',
  deliveredAt: '',
  createdAt: '',
};

const initialOrderWithUser: OrderWithUser = {
  _id: '',
  orderItems: [],
  shippingAddress: {
    address: '',
    city: '',
    country: '',
    postalCode: '',
  },
  paymentMethod: '',
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  user: { _id: '', email: '', name: '' },
  isPaid: false,
  isDelivered: false,
  paidAt: '',
  deliveredAt: '',
  createdAt: '',
};

const initialOrderCreateState: OrderCreateState = {
  order: initialOrder,
  loading: false,
  success: false,
  error: '',
};

const initialOrderDetailState: OrderDetailState = {
  order: initialOrderWithUser,
  loading: true,
  error: '',
};

export const orderCreateReducer: Reducer<OrderCreateState> = (
  state = initialOrderCreateState,
  action: OrderCreateActions
): OrderCreateState => {
  switch (action.type) {
    case OrderCreateActionType.REQUEST:
      return { ...state, loading: true };
    case OrderCreateActionType.SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        error: '',
        order: action.payload,
      };
    case OrderCreateActionType.FAIL:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDetailReducer: Reducer<OrderDetailState> = (
  state = initialOrderDetailState,
  action: OrderDetailActions
): OrderDetailState => {
  switch (action.type) {
    case OrderDetailActionType.REQUEST:
      return { ...state, loading: true };
    case OrderDetailActionType.SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        order: action.payload,
      };
    case OrderDetailActionType.FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const initialOrderWithUserState: OrderPaidState = {
  loading: false,
  error: '',
  success: false,
};

export const orderPaidReducer: Reducer<OrderPaidState> = (
  state = initialOrderWithUserState,
  action: OrderPaidActions
): OrderPaidState => {
  switch (action.type) {
    case OrderPaidActionType.REQUEST:
      return { ...state, loading: true };
    case OrderPaidActionType.SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case OrderPaidActionType.FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case OrderPaidActionType.RESET:
      return initialOrderWithUserState;
    default:
      return state;
  }
};

export const orderMyListReducer: Reducer<OrderMyList> = (
  state = {} as OrderMyList,
  action: OrderMyListActions
): OrderMyList => {
  switch (action.type) {
    case OrderListMyActionType.REQUEST:
      return { ...state, loading: true };
    case OrderListMyActionType.SUCCESS:
      return {
        ...state,
        loading: false,
        orderList: action.payload,
        error: '',
      };
    case OrderListMyActionType.FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case OrderListMyActionType.RESET:
      return { ...state, orderList: [] };

    default:
      return state;
  }
};

const initialOrderListState: OrderListState = {
  orders: [],
  loading: false,
  error: '',
};

export const orderListReducer: Reducer<OrderListState> = (
  state = initialOrderListState,
  action: OrderListActions
): OrderListState => {
  switch (action.type) {
    case OrderListActionType.REQUEST:
      return { ...state, loading: true };
    case OrderListActionType.SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
        error: '',
      };
    case OrderListActionType.FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDeliverReducer: Reducer<OrderPaidState> = (
  state = initialOrderWithUserState,
  action: OrderDeliverActions
): OrderPaidState => {
  switch (action.type) {
    case OrderDeliverActionType.REQUEST:
      return { ...state, loading: true };
    case OrderDeliverActionType.SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: '',
      };
    case OrderDeliverActionType.FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case OrderDeliverActionType.RESET:
      return initialOrderWithUserState;
    default:
      return state;
  }
};
