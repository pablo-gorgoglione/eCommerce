import {
  productCreateReducer,
  productCreateReviewReducer,
  productDeleteReducer,
  productDetailReducer,
  productListReducer,
  productTopRatedReducer,
  productUpdateReducer,
} from './Product/productReducers';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './Cart/cartReducers';
import {
  CartState,
  InitialState,
  Product,
  FullUser,
  Order,
  OrderWithUser,
} from '../interfaces';
import {
  userDeleteReducer,
  userDetailReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './User/userReducers';
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailReducer,
  orderListReducer,
  orderMyListReducer,
  orderPaidReducer,
} from './Order/orderReducer';

const reducer = combineReducers({
  cart: cartReducer,
  productList: productListReducer,
  productDetail: productDetailReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productCreateReview: productCreateReviewReducer,
  productTopRated: productTopRatedReducer,
  orderCreate: orderCreateReducer,
  orderDetail: orderDetailReducer,
  orderPaid: orderPaidReducer,
  orderDeliver: orderDeliverReducer,
  orderMyList: orderMyListReducer,
  orderList: orderListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
});

const middleware = [thunk];

const getLocalStorage_CART_ITEMS = (): CartState => {
  // temp cart_state
  const temp_cartState: CartState = {
    cartItems: [],
    shippingAddress: { address: '', city: '', postalCode: '', country: '' },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
  };

  //Cart_Items from localStorage
  const findCartItemFromStorage = localStorage.getItem('cartItems');

  //Shipping_Address from localStorage
  const findShippingAddressFromStorage =
    localStorage.getItem('shippingAddress');

  //if they have something set it or else, leave it initialized
  if (findCartItemFromStorage) {
    temp_cartState.cartItems = JSON.parse(findCartItemFromStorage);
  }

  if (findShippingAddressFromStorage) {
    temp_cartState.shippingAddress = JSON.parse(findShippingAddressFromStorage);
  }

  //return the values or a initialized cartState object
  return temp_cartState;
};

const getLocalStorage_USER_INFO = (): FullUser => {
  const findUserInfoFromStorage = localStorage.getItem('userInfo');
  if (findUserInfoFromStorage) {
    const userInfo_temp: FullUser = JSON.parse(findUserInfoFromStorage);
    return userInfo_temp;
  }
  return {} as FullUser;
};

const cartItemFromStorage: CartState = getLocalStorage_CART_ITEMS();
const userInfoFromStorage: FullUser = getLocalStorage_USER_INFO();

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

const initialProduct: Product = {
  _id: '',
  name: '',
  image: '',
  description: '',
  brand: '',
  category: '',
  price: 0,
  countInStock: 0,
  rating: 0,
  numReviews: 0,
  reviews: [],
  loading: false,
};

const initialState: InitialState = {
  cart: cartItemFromStorage,
  productList: { loading: false, products: [], pages: 0, page: 0, error: '' },
  productDetail: { loading: false, product: initialProduct, error: '' },
  productDelete: { loading: false, error: '', success: false },
  productCreate: {
    loading: false,
    product: initialProduct,
    error: '',
    success: false,
  },
  productUpdate: {
    loading: false,
    product: initialProduct,
    error: '',
    success: false,
  },
  productCreateReview: { loading: false, error: '', success: false },
  productTopRated: { loading: false, products: [], error: '', success: false },
  orderCreate: {
    loading: true,
    success: false,
    order: initialOrder,
    error: '',
  },
  orderDetail: {
    loading: true,
    order: initialOrderWithUser,
    error: '',
  },
  orderPaid: { loading: false, error: '', success: false },
  orderDeliver: { loading: false, error: '', success: false },
  orderMyList: { loading: false, error: '', orderList: [] },
  orderList: { loading: false, error: '', orders: [] },
  userRegister: { loading: false, userInfo: {} as FullUser, error: '' },
  userDetails: { loading: false, userInfo: {} as FullUser, error: '' },
  userLogin: { loading: false, userInfo: userInfoFromStorage, error: '' },
  userDelete: { loading: false, error: '', success: false },
  userUpdate: { loading: false, error: '', success: false },
  userList: { loading: false, error: '', usersList: [] },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type RootState = ReturnType<typeof reducer>;

export default store;
