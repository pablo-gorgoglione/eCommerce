import { Address, ProductInCart } from '../../interfaces';

interface CART_ADD_ITEM {
  type: CartActionType.ADD_ITEM;
  payload: ProductInCart;
}

interface CART_REMOVE_ITEM {
  type: CartActionType.REMOVE_ITEM;
  payload: string;
}

interface CART_SAVE_SHIPPING_ADDRESS {
  type: CartActionType.SAVE_SHIPPING_ADDRESS;
  payload: Address;
}

interface CART_SAVE_PAYMENT_METHOD {
  type: CartActionType.SAVE_PAYMENT_METHOD;
  payload: string;
}
interface RESET {
  type: CartActionType.RESET;
}
/* TYPES */
export enum CartActionType {
  ADD_ITEM = 'CART_ADD_ITEM',
  REMOVE_ITEM = 'CART_DELETE_ITEM',
  SAVE_SHIPPING_ADDRESS = 'CART_SAVE_SHIPPING_ADDRESS',
  SAVE_PAYMENT_METHOD = 'CART_SAVE_PAYMENT_METHOD',
  RESET = 'CART_RESET',
}

export type CartActions =
  | CART_ADD_ITEM
  | CART_REMOVE_ITEM
  | CART_SAVE_SHIPPING_ADDRESS
  | CART_SAVE_PAYMENT_METHOD
  | RESET;
