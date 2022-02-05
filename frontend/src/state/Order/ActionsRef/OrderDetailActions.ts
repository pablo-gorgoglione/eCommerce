import { OrderWithUser } from '../../../interfaces';
import { OrderDetailActionType } from '../OrderActionTypes';

interface REQUEST {
  type: OrderDetailActionType.REQUEST;
}
interface SUCCESS {
  type: OrderDetailActionType.SUCCESS;
  payload: OrderWithUser;
}
interface FAIL {
  type: OrderDetailActionType.FAIL;
  payload: string;
}
export type OrderDetailActions = REQUEST | SUCCESS | FAIL;
