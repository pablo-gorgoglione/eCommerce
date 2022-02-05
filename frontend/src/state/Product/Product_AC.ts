import axios from 'axios';
import { Dispatch } from 'redux';
import { BaseProduct, Review, URL_API } from '../../interfaces';
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
import { RootState } from '../store';
import { ProductDeleteActions } from './ActionsDef/ProductDeleteActions';
import { ProductCreateActions } from './ActionsDef/ProductCreateActions';
import { ProductUpdateActions } from './ActionsDef/ProductUpdateActions';
import { ProductCreateReviewActions } from './ActionsDef/ProductCreateReviewActions';
import { ProductTopActions } from './ActionsDef/ProductTopActions';

/* ---------- PRODUCT LIST AC ---------- */

export const listProducts =
  (keyword: string = '', pageNumber: string = '') =>
  async (dispatch: Dispatch<ProductListActions>) => {
    try {
      dispatch({ type: ProductListActionType.REQUEST });
      const { data } = await axios.get(
        `${URL_API}products?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch({ type: ProductListActionType.SUCCESS, payload: data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //custom API error
        dispatch({
          type: ProductListActionType.FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      } else {
        //Other error
        // throw new Error('different error than axios');
        dispatch({
          type: ProductListActionType.FAIL,
          payload: 'Unknow error :( ',
        });
      }
    }
  };

/* ---------- PRODUCT DETAIL AC ---------- */

export const listProductDetail =
  (id: string) => async (dispatch: Dispatch<ProductDetailActions>) => {
    try {
      dispatch({ type: ProductDetailActionType.REQUEST });
      const { data } = await axios.get(URL_API + `products/${id}`);
      dispatch({ type: ProductDetailActionType.SUCCESS, payload: data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //custom API error
        dispatch({
          type: ProductDetailActionType.FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      } else {
        //Other error
        // throw new Error('different error than axios');
        dispatch({
          type: ProductDetailActionType.FAIL,
          payload: 'Unknow error :( ',
        });
      }
    }
  };
/* ---------- PRODUCT DELETE AC ---------- */

export const deleteProduct =
  (id: string) =>
  async (
    dispatch: Dispatch<ProductDeleteActions>,
    getState: () => RootState
  ) => {
    try {
      dispatch({
        type: ProductDeleteActionType.REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`${URL_API}products/${id}`, config);

      dispatch({
        type: ProductDeleteActionType.SUCCESS,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //custom API error
        dispatch({
          type: ProductDeleteActionType.FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      } else {
        //Other error
        // throw new Error('different error than axios');
        dispatch({
          type: ProductDeleteActionType.FAIL,
          payload: 'Unknow error :( ',
        });
      }
    }
  };

/* ---------- PRODUCT CREATE AC ---------- */

export const createProduct =
  () =>
  async (
    dispatch: Dispatch<ProductCreateActions>,
    getState: () => RootState
  ) => {
    try {
      dispatch({
        type: ProductCreateActionType.REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`${URL_API}products/`, {}, config);

      dispatch({
        type: ProductCreateActionType.SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //custom API error
        dispatch({
          type: ProductCreateActionType.FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      } else {
        //Other error
        // throw new Error('different error than axios');
        dispatch({
          type: ProductCreateActionType.FAIL,
          payload: 'Unknow error :( ',
        });
      }
    }
  };

/* ---------- PRODUCT UPDATE AC ---------- */

export const updateProduct =
  (product: BaseProduct) =>
  async (
    dispatch: Dispatch<ProductUpdateActions>,
    getState: () => RootState
  ) => {
    try {
      dispatch({
        type: ProductUpdateActionType.REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${URL_API}products/${product._id}`,
        product,
        config
      );

      dispatch({
        type: ProductUpdateActionType.SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //custom API error
        dispatch({
          type: ProductUpdateActionType.FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      } else {
        //Other error
        // throw new Error('different error than axios');
        dispatch({
          type: ProductUpdateActionType.FAIL,
          payload: 'Unknow error :( ',
        });
      }
    }
  };

/* ---------- PRODUCT CREATE REVIEW  AC ---------- */

export const createProductReview =
  (productId: string, review: Review) =>
  async (
    dispatch: Dispatch<ProductCreateReviewActions>,
    getState: () => RootState
  ) => {
    try {
      dispatch({
        type: ProductCreateReviewActionType.REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `${URL_API}products/${productId}/reviews`,
        review,
        config
      );

      dispatch({
        type: ProductCreateReviewActionType.SUCCESS,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //custom API error
        dispatch({
          type: ProductCreateReviewActionType.FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      } else {
        //Other error
        // throw new Error('different error than axios');
        dispatch({
          type: ProductCreateReviewActionType.FAIL,
          payload: 'Unknow error :( ',
        });
      }
    }
  };

/* ---------- LIST TOP PRODUCT AC ---------- */

export const listTopProduct =
  () => async (dispatch: Dispatch<ProductTopActions>) => {
    try {
      dispatch({ type: ProductTopActionType.REQUEST, payload: [] });

      const { data } = await axios.get(URL_API + `products/top`);
      dispatch({ type: ProductTopActionType.SUCCESS, payload: data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //custom API error
        dispatch({
          type: ProductTopActionType.FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      } else {
        //Other error
        // throw new Error('different error than axios');
        dispatch({
          type: ProductTopActionType.FAIL,
          payload: 'Unknow error :( ',
        });
      }
    }
  };
