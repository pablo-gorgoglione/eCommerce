import { Product } from '../../../interfaces';
import { ProductUpdateActionType } from '../ProductActionTypes';

interface REQUEST {
  type: ProductUpdateActionType.REQUEST;
}
interface SUCCESS {
  type: ProductUpdateActionType.SUCCESS;
  payload: Product;
}
interface FAIL {
  type: ProductUpdateActionType.FAIL;
  payload: string;
}
interface RESET {
  type: ProductUpdateActionType.RESET;
}

export type ProductUpdateActions = FAIL | SUCCESS | REQUEST | RESET;
