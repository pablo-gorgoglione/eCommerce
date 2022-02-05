import { CartState } from '../../interfaces';
import { CartActions, CartActionType } from './CartActions';

const initialCartState: CartState = {
  cartItems: [],
  shippingAddress: {
    address: '',
    city: '',
    postalCode: '',
    country: '',
  },
  paymentMethod: '',
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
};
export const cartReducer = (state = initialCartState, action: CartActions) => {
  switch (action.type) {
    case CartActionType.ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CartActionType.REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => {
          return x.product !== action.payload;
        }),
      };
    case CartActionType.SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CartActionType.SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CartActionType.RESET:
      return initialCartState;
    default:
      return state;
  }
};
