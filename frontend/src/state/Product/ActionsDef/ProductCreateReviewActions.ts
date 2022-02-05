import { ProductCreateReviewActionType } from '../ProductActionTypes';

interface REQUEST {
  type: ProductCreateReviewActionType.REQUEST;
}
interface SUCCESS {
  type: ProductCreateReviewActionType.SUCCESS;
}
interface FAIL {
  type: ProductCreateReviewActionType.FAIL;
  payload: string;
}
interface RESET {
  type: ProductCreateReviewActionType.RESET;
  payload: string;
}

export type ProductCreateReviewActions = FAIL | SUCCESS | REQUEST | RESET;
