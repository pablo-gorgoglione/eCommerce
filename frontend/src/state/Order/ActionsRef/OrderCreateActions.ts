import { Order } from '../../../interfaces';
import { OrderCreateActionType } from '../OrderActionTypes';

interface REQUEST {
  type: OrderCreateActionType.REQUEST;
}
interface SUCCESS {
  type: OrderCreateActionType.SUCCESS;
  payload: Order;
}
interface FAIL {
  type: OrderCreateActionType.FAIL;
  payload: string;
}
export type OrderCreateActions = REQUEST | SUCCESS | FAIL;
