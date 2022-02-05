import { OrderWithUser } from '../../../interfaces';
import { OrderDeliverActionType } from '../OrderActionTypes';

interface REQUEST {
  type: OrderDeliverActionType.REQUEST;
}
interface SUCCESS {
  type: OrderDeliverActionType.SUCCESS;
  payload: OrderWithUser;
}
interface FAIL {
  type: OrderDeliverActionType.FAIL;
  payload: string;
}
interface RESET {
  type: OrderDeliverActionType.RESET;
}
export type OrderDeliverActions = REQUEST | SUCCESS | FAIL | RESET;
