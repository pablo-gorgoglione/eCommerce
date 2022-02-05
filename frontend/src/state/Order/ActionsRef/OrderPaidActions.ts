import { OrderPaidActionType } from '../OrderActionTypes';

interface REQUEST {
  type: OrderPaidActionType.REQUEST;
}
interface SUCCESS {
  type: OrderPaidActionType.SUCCESS;
}
interface FAIL {
  type: OrderPaidActionType.FAIL;
  payload: string;
}
interface RESET {
  type: OrderPaidActionType.RESET;
}

export type OrderPaidActions = REQUEST | SUCCESS | FAIL | RESET;
