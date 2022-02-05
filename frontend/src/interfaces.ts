// export const URL_API = 'https://pablo-gorgoglione-ecommerce.herokuapp.com/api/';

export const URL_API = 'http://localhost:4000/api/';

/* BACKEND MODELS */

export interface Order {
  _id: string;
  orderItems: Array<ProductInCart>;
  shippingAddress: Address;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: string;
  isDelivered: boolean;
  deliveredAt: string;
  createdAt: string;
  updatedAt?: string;
}

export interface OrderWithUser extends Order {
  user: BaseUser;
}

export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  reviews: Array<Review>;
  loading: boolean;
}

export interface BaseProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  category: string;
  description: string;
  countInStock: number;
}

export interface Review {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface BaseUser {
  _id: string;
  name: string;
  email: string;
}

export interface Address {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface FullUser extends BaseUser {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

/* CUSTOM MODELS */
export interface ProductInCart {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  quantity: number;
}

/* STATES */
export interface Success {
  success: boolean;
}
export interface BaseState {
  loading: boolean;
  error: string;
}

export interface StatePlus extends BaseState, Success {}

export interface CartState {
  cartItems: Array<ProductInCart>;
  shippingAddress: Address;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
}

export interface ProductListState extends BaseState {
  products: Array<Product>;
  pages: number;
  page: number;
}
export interface ProductTopRatedState extends StatePlus {
  products: Array<Product>;
}

export interface ProductDetailState extends BaseState {
  product: Product;
}

export interface UserState extends BaseState {
  userInfo: FullUser;
}

export interface UserListState extends BaseState {
  usersList: Array<FullUser>;
}

export interface UserProfileState extends BaseState, Success {
  userInfo: BaseUser;
}

export interface OrderCreateState extends BaseState, Success {
  order: Order;
}

export interface OrderDetailState extends BaseState {
  order: OrderWithUser;
}

export interface OrderPaidState extends BaseState, Success {}

export interface BaseAndSucessState extends BaseState, Success {}

export interface ProductCreateState extends BaseAndSucessState {
  product: Product;
}

export interface OrderMyList extends BaseState {
  orderList: Array<Order>;
}
export interface OrderListState extends BaseState {
  orders: Array<OrderWithUser>;
}

export interface InitialState {
  cart: CartState;
  productList: ProductListState;
  productDetail: ProductDetailState;
  productDelete: BaseAndSucessState;
  productCreate: ProductCreateState;
  productUpdate: ProductCreateState;
  productCreateReview: BaseAndSucessState;
  productTopRated: ProductTopRatedState;
  userLogin: UserState;
  userRegister: UserState;
  userDetails: UserState;
  userList: UserListState;
  userDelete: BaseAndSucessState;
  userUpdate: BaseAndSucessState;
  orderCreate: OrderCreateState;
  orderDetail: OrderDetailState;
  orderPaid: OrderPaidState;
  orderDeliver: OrderPaidState;
  orderMyList: OrderMyList;
  orderList: OrderListState;
}
