import { Product } from '../../interfaces';

/* ---------- PRODUCT LIST ACTION ---------- */
// PL_  === "Product LIST"

interface PL_RequestAction {
  type: ProductListActionType.REQUEST;
  payload?: Array<Product>;
}
interface PL_SuccessAction {
  type: ProductListActionType.SUCCESS;
  payload: { products: Array<Product>; pages: number; page: number };
}
interface PL_FailAction {
  type: ProductListActionType.FAIL;
  payload: string;
}

export type ProductListActions =
  | PL_RequestAction
  | PL_SuccessAction
  | PL_FailAction;

/* ---------- PRODUCT DETAIL ACTION ---------- */
// PD_  === "Product Detail"

interface PD_RequestAction {
  type: ProductDetailActionType.REQUEST;
  payload?: Product;
}
interface PD_SuccessAction {
  type: ProductDetailActionType.SUCCESS;
  payload: Product;
}
interface PD_FailAction {
  type: ProductDetailActionType.FAIL;
  payload: string;
}

export type ProductDetailActions =
  | PD_RequestAction
  | PD_SuccessAction
  | PD_FailAction;

/* TYPES */
export enum ProductListActionType {
  REQUEST = 'PRODUCT_LIST_REQUEST',
  SUCCESS = 'PRODUCT_LIST_SUCCESS',
  FAIL = 'PRODUCT_LIST_FAIL',
}

export enum ProductDetailActionType {
  REQUEST = 'PRODUCT_DETAIL_REQUEST',
  SUCCESS = 'PRODUCT_DETAIL_SUCCESS',
  FAIL = 'PRODUCT_DETAIL_FAIL',
}
