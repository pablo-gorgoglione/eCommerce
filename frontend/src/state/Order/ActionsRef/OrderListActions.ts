import { OrderWithUser } from '../../../interfaces';
import {
  OrderListActionType,
  OrderListMyActionType,
} from '../OrderActionTypes';

interface REQUEST {
  type: OrderListActionType.REQUEST;
}
interface SUCCESS {
  type: OrderListActionType.SUCCESS;
  payload: Array<OrderWithUser>;
}
interface FAIL {
  type: OrderListActionType.FAIL;
  payload: string;
}

export type OrderListActions = REQUEST | SUCCESS | FAIL;
