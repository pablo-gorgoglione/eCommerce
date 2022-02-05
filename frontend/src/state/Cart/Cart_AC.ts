import axios from 'axios';
import { Dispatch } from 'redux';
import { Address, URL_API } from '../../interfaces';
import { RootState } from '../store';
import { CartActions, CartActionType } from './CartActions';

export const addToCart =
  (id: string, qty: number) =>
  async (dispatch: Dispatch<CartActions>, getState: () => RootState) => {
    const {
      data: { _id, name, image, price, countInStock },
    } = await axios.get(URL_API + `products/${id}`);

    dispatch({
      type: CartActionType.ADD_ITEM,
      payload: {
        product: _id,
        name: name,
        image: image,
        price: price,
        countInStock: countInStock,
        quantity: qty,
      },
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeFromCart =
  (id: string) =>
  async (dispatch: Dispatch<CartActions>, getState: () => RootState) => {
    dispatch({
      type: CartActionType.REMOVE_ITEM,
      payload: id,
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const saveShippingAddress =
  (address: Address) =>
  async (dispatch: Dispatch<CartActions>, getState: () => RootState) => {
    dispatch({
      type: CartActionType.SAVE_SHIPPING_ADDRESS,
      payload: address,
    });

    localStorage.setItem('shippingAddress', JSON.stringify(address));
  };

export const savePaymentMethod =
  (paymentMethod: string) =>
  async (dispatch: Dispatch<CartActions>, getState: () => RootState) => {
    dispatch({
      type: CartActionType.SAVE_PAYMENT_METHOD,
      payload: paymentMethod,
    });

    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
  };
