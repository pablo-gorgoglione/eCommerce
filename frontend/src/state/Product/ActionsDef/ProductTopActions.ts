import { Product } from '../../../interfaces';
import { ProductTopActionType } from '../ProductActionTypes';

interface REQUEST {
  type: ProductTopActionType.REQUEST;
  payload: Array<Product>;
}
interface SUCCESS {
  type: ProductTopActionType.SUCCESS;
  payload: Array<Product>;
}
interface FAIL {
  type: ProductTopActionType.FAIL;
  payload: string;
}

export type ProductTopActions = FAIL | SUCCESS | REQUEST;
