import { ProductDeleteActionType } from '../ProductActionTypes';

interface REQUEST {
  type: ProductDeleteActionType.REQUEST;
}
interface SUCCESS {
  type: ProductDeleteActionType.SUCCESS;
}
interface FAIL {
  type: ProductDeleteActionType.FAIL;
  payload: string;
}

export type ProductDeleteActions = FAIL | SUCCESS | REQUEST;
