import axios from 'axios';
import { Dispatch } from 'redux';
import { URL_API, BaseUser, FullUser } from '../../interfaces';
import {
  UserDeleteActionType,
  UserDetailActionType,
  UserListActionType,
  UserLoginActionType,
  UserRegisterActionType,
  UserUpdateActionType,
  UserUpdateProfileActionType,
} from './UserActionTypes';
import { RootState } from '../store';
import { UserLoginActions } from './ActionsDef/UserLoginActions';
import { UserDetailActions } from './ActionsDef/UserDetailActions';
import { UserUpdateProfileActions } from './ActionsDef/UserUpdateProfileActions';
import { OrderListMyActionType } from '../Order/OrderActionTypes';
import { UserListActions } from './ActionsDef/UserListActions';
import { UserDeleteActions } from './ActionsDef/UserDeleteActions';
import { CartActionType } from '../Cart/CartActions';

export const login =
  (email: string, password: string) =>
  async (dispatch: Dispatch<UserLoginActions>, getState: () => RootState) => {
    try {
      dispatch({
        type: UserLoginActionType.REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${URL_API}users/login`,
        { email, password },
        config
      );

      dispatch({
        type: UserLoginActionType.SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //custom API error
        dispatch({
          type: UserLoginActionType.FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      } else {
        //Other error
        // throw new Error('different error than axios');
        dispatch({
          type: UserLoginActionType.FAIL,
          payload: 'Unknow error :( ',
        });
      }
    }
  };

export const logout = () => async (dispatch: Dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: UserLoginActionType.LOGOUT });
  dispatch({ type: UserDetailActionType.RESET });
  dispatch({ type: OrderListMyActionType.RESET });
  dispatch({ type: UserListActionType.RESET });
  dispatch({ type: CartActionType.RESET });
};

export const register =
  (email: string, name: string, password: string) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: UserRegisterActionType.REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${URL_API}users`,
        { email, name, password },
        config
      );

      dispatch({
        type: UserRegisterActionType.SUCCESS,
        payload: data,
      });

      dispatch({
        type: UserLoginActionType.SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //custom API error
        dispatch({
          type: UserRegisterActionType.FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      } else {
        //Other error
        // throw new Error('different error than axios');
        dispatch({
          type: UserRegisterActionType.FAIL,
          payload: 'Unknow error :( ',
        });
      }
    }
  };

export const getUserDetail =
  (id: string) =>
  async (dispatch: Dispatch<UserDetailActions>, getState: () => RootState) => {
    try {
      dispatch({
        type: UserDetailActionType.REQUEST,
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

      const { data } = await axios.get(`${URL_API}users/${id}`, config);

      dispatch({
        type: UserDetailActionType.SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //custom API error
        dispatch({
          type: UserDetailActionType.FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      } else {
        //Other error
        // throw new Error('different error than axios');
        dispatch({
          type: UserDetailActionType.FAIL,
          payload: 'Unknow error :( ',
        });
      }
    }
  };

export const updateUserProfile =
  (user: BaseUser, password: string) =>
  async (
    dispatch: Dispatch<UserUpdateProfileActions>,
    getState: () => RootState
  ) => {
    try {
      dispatch({
        type: UserUpdateProfileActionType.REQUEST,
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
        `${URL_API}users/profile`,
        { ...user, password },
        config
      );

      dispatch({
        type: UserUpdateProfileActionType.SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //custom API error
        dispatch({
          type: UserUpdateProfileActionType.FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      } else {
        //Other error
        // throw new Error('different error than axios');
        dispatch({
          type: UserUpdateProfileActionType.FAIL,
          payload: 'Unknow error :( ',
        });
      }
    }
  };

export const listUsers =
  () =>
  async (dispatch: Dispatch<UserListActions>, getState: () => RootState) => {
    try {
      dispatch({
        type: UserListActionType.REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`${URL_API}users`, config);

      dispatch({
        type: UserListActionType.SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //custom API error
        dispatch({
          type: UserListActionType.FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      } else {
        //Other error
        // throw new Error('different error than axios');
        dispatch({
          type: UserListActionType.FAIL,
          payload: 'Unknow error :( ',
        });
      }
    }
  };

export const deleteUser =
  (id: string) =>
  async (dispatch: Dispatch<UserDeleteActions>, getState: () => RootState) => {
    try {
      dispatch({
        type: UserDeleteActionType.REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(`${URL_API}users/${id}`, config);

      dispatch({
        type: UserDeleteActionType.SUCCESS,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //custom API error
        dispatch({
          type: UserDeleteActionType.FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      } else {
        //Other error
        // throw new Error('different error than axios');
        dispatch({
          type: UserDeleteActionType.FAIL,
          payload: 'Unknow error :( ',
        });
      }
    }
  };

export const updateUser =
  (user: FullUser) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      dispatch({
        type: UserUpdateActionType.REQUEST,
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
        `${URL_API}users/${user._id}`,
        user,
        config
      );

      dispatch({
        type: UserUpdateActionType.SUCCESS,
      });

      dispatch({
        type: UserDetailActionType.SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //custom API error
        dispatch({
          type: UserUpdateActionType.FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      } else {
        // different error than axios
        dispatch({
          type: UserUpdateActionType.FAIL,
          payload: 'Unknow error :( ',
        });
      }
    }
  };
