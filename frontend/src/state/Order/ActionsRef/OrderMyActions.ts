import { Order } from '../../../interfaces';
import { OrderListMyActionType } from '../OrderActionTypes';

interface REQUEST {
  type: OrderListMyActionType.REQUEST;
}
interface SUCCESS {
  type: OrderListMyActionType.SUCCESS;
  payload: Array<Order>;
}
interface FAIL {
  type: OrderListMyActionType.FAIL;
  payload: string;
}

interface RESET {
  type: OrderListMyActionType.RESET;
  payload: Array<Order>;
}
export type OrderMyListActions = REQUEST | SUCCESS | FAIL | RESET;
