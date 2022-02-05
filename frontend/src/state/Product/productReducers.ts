import {
  BaseAndSucessState,
  Product,
  ProductCreateState,
  ProductDetailState,
  ProductListState,
  ProductTopRatedState,
} from '../../interfaces';
import {
  ProductCreateActionType,
  ProductCreateReviewActionType,
  ProductDeleteActionType,
  ProductDetailActionType,
  ProductListActionType,
  ProductTopActionType,
  ProductUpdateActionType,
} from './ProductActionTypes';
import { ProductDetailActions, ProductListActions } from './ProductActions';
import { ProductDeleteActions } from './ActionsDef/ProductDeleteActions';
import { ProductCreateActions } from './ActionsDef/ProductCreateActions';
import { ProductUpdateActions } from './ActionsDef/ProductUpdateActions';
import { ProductCreateReviewActions } from './ActionsDef/ProductCreateReviewActions';
import { ProductTopActions } from './ActionsDef/ProductTopActions';

/* ---------- PRODUCT LIST REDUCER ---------- */

const initialProductListState: ProductListState = {
  products: [],
  loading: true,
  error: '',
  pages: 0,
  page: 0,
};

export const productListReducer = (
  state: ProductListState = initialProductListState,
  action: ProductListActions
) => {
  switch (action.type) {
    case ProductListActionType.REQUEST:
      return { ...state, loading: true, products: [] };
    case ProductListActionType.SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case ProductListActionType.FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

/* ---------- PRODUCT DETAIL REDUCER ---------- */

const initialProduct: Product = {
  _id: '',
  name: '',
  image: '',
  description: '',
  brand: '',
  category: '',
  price: 0,
  countInStock: 0,
  rating: 0,
  numReviews: 0,
  reviews: [],
  loading: false,
};

const initialProductDetailState: ProductDetailState = {
  product: initialProduct,
  loading: true,
  error: '',
};

export const productDetailReducer = (
  state = initialProductDetailState,
  action: ProductDetailActions
) => {
  switch (action.type) {
    case ProductDetailActionType.REQUEST:
      return { ...state, loading: true };
    case ProductDetailActionType.SUCCESS:
      return { ...state, loading: false, error: '', product: action.payload };
    case ProductDetailActionType.FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

/* ---------- PRODUCT DELETE REDUCER ---------- */

const initialStateWithSuccess: BaseAndSucessState = {
  loading: false,
  error: '',
  success: false,
};
export const productDeleteReducer = (
  state = initialStateWithSuccess,
  action: ProductDeleteActions
): BaseAndSucessState => {
  switch (action.type) {
    case ProductDeleteActionType.REQUEST:
      return { ...state, loading: true };
    case ProductDeleteActionType.SUCCESS:
      return { success: true, loading: false, error: '' };
    case ProductDeleteActionType.FAIL:
      return { success: false, error: action.payload, loading: false };
    default:
      return state;
  }
};

/* ---------- PRODUCT CREATE REDUCER ---------- */
const initialProductCreateState: ProductCreateState = {
  product: initialProduct,
  loading: false,
  error: '',
  success: false,
};

export const productCreateReducer = (
  state = initialProductCreateState,
  action: ProductCreateActions
): ProductCreateState => {
  switch (action.type) {
    case ProductCreateActionType.REQUEST:
      return { ...state, loading: true };
    case ProductCreateActionType.SUCCESS:
      return {
        success: true,
        loading: false,
        error: '',
        product: action.payload,
      };
    case ProductCreateActionType.FAIL:
      return {
        ...state,
        success: false,
        error: action.payload,
        loading: false,
      };
    case ProductCreateActionType.RESET:
      return initialProductCreateState;
    default:
      return state;
  }
};

/* ---------- PRODUCT UPDATE REDUCER ---------- */

export const productUpdateReducer = (
  state = initialProductCreateState,
  action: ProductUpdateActions
): ProductCreateState => {
  switch (action.type) {
    case ProductUpdateActionType.REQUEST:
      return { ...state, loading: true };
    case ProductUpdateActionType.SUCCESS:
      return {
        success: true,
        loading: false,
        error: '',
        product: action.payload,
      };
    case ProductUpdateActionType.FAIL:
      return {
        ...state,
        success: false,
        error: action.payload,
        loading: false,
      };
    case ProductUpdateActionType.RESET:
      return initialProductCreateState;
    default:
      return state;
  }
};

/* ---------- PRODUCT CREATE REVIEW REDUCER ---------- */

export const productCreateReviewReducer = (
  state = initialStateWithSuccess,
  action: ProductCreateReviewActions
): BaseAndSucessState => {
  switch (action.type) {
    case ProductCreateReviewActionType.REQUEST:
      return { ...state, loading: true };
    case ProductCreateReviewActionType.SUCCESS:
      return {
        success: true,
        loading: false,
        error: '',
      };
    case ProductCreateReviewActionType.FAIL:
      return {
        success: false,
        error: action.payload,
        loading: false,
      };
    case ProductCreateReviewActionType.RESET:
      return initialProductCreateState;
    default:
      return state;
  }
};

/* ---------- PRODUCT TOP RATED REDUCER ---------- */
const initialProductTopRatedState: ProductTopRatedState = {
  products: [],
  loading: false,
  error: '',
  success: false,
};

export const productTopRatedReducer = (
  state = initialProductTopRatedState,
  action: ProductTopActions
): ProductTopRatedState => {
  switch (action.type) {
    case ProductTopActionType.REQUEST:
      return { ...state, loading: true, products: [], success: false };
    case ProductTopActionType.SUCCESS:
      return {
        success: true,
        loading: false,
        error: '',
        products: action.payload,
      };
    case ProductTopActionType.FAIL:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
