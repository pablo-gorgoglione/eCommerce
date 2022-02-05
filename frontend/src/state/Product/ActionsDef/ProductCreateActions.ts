import { Product } from '../../../interfaces';
import { ProductCreateActionType } from '../ProductActionTypes';

interface REQUEST {
  type: ProductCreateActionType.REQUEST;
}
interface SUCCESS {
  type: ProductCreateActionType.SUCCESS;
  payload: Product;
}
interface FAIL {
  type: ProductCreateActionType.FAIL;
  payload: string;
}
interface RESET {
  type: ProductCreateActionType.RESET;
}

export type ProductCreateActions = FAIL | SUCCESS | REQUEST | RESET;
