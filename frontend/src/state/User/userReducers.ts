import { Reducer } from 'redux';
import {
  FullUser,
  UserProfileState,
  UserState,
  UserListState,
  BaseAndSucessState,
} from '../../interfaces';
import { UserDeleteActions } from './ActionsDef/UserDeleteActions';
import { UserDetailActions } from './ActionsDef/UserDetailActions';
import { UserListActions } from './ActionsDef/UserListActions';
import { UserLoginActions } from './ActionsDef/UserLoginActions';
import { UserRegisterActions } from './ActionsDef/UserRegisterActions';
import { UserUpdateActions } from './ActionsDef/UserUpdateActions';
import { UserUpdateProfileActions } from './ActionsDef/UserUpdateProfileActions';
import {
  UserDeleteActionType,
  UserDetailActionType,
  UserListActionType,
  UserLoginActionType,
  UserRegisterActionType,
  UserUpdateActionType,
  UserUpdateProfileActionType,
} from './UserActionTypes';

const initialUser: FullUser = {
  _id: '',
  name: '',
  email: '',
  isAdmin: false,
  token: '',
};

const initialUserLoginState: UserState = {
  userInfo: initialUser,
  loading: false,
  error: '',
};
const initialUserRegisterState: UserState = {
  userInfo: initialUser,
  loading: false,
  error: '',
};
const initialUserDetailState: UserState = {
  userInfo: initialUser,
  loading: false,
  error: '',
};
const initialUpdateProfileState: UserProfileState = {
  userInfo: initialUser,
  loading: false,
  error: '',
  success: false,
};

const initialUserListState: UserListState = {
  usersList: [],
  loading: false,
  error: '',
};

export const userLoginReducer: Reducer<UserState> = (
  state = initialUserLoginState,
  action: UserLoginActions
): UserState => {
  switch (action.type) {
    case UserLoginActionType.REQUEST:
      return { ...state, loading: true };
    case UserLoginActionType.SUCCESS:
      return { ...state, loading: false, error: '', userInfo: action.payload };
    case UserLoginActionType.FAIL:
      return { ...state, loading: false, error: action.payload };
    case UserLoginActionType.LOGOUT:
      return { ...initialUserLoginState };
    default:
      return state;
  }
};

export const userRegisterReducer: Reducer<UserState> = (
  state = initialUserRegisterState,
  action: UserRegisterActions
): UserState => {
  switch (action.type) {
    case UserRegisterActionType.REQUEST:
      return { ...state, loading: true };
    case UserRegisterActionType.SUCCESS:
      return { ...state, loading: false, error: '', userInfo: action.payload };
    case UserRegisterActionType.FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailReducer: Reducer<UserState> = (
  state = initialUserDetailState,
  action: UserDetailActions
): UserState => {
  switch (action.type) {
    case UserDetailActionType.REQUEST:
      return { ...state, loading: true };
    case UserDetailActionType.SUCCESS:
      return { ...state, loading: false, error: '', userInfo: action.payload };
    case UserDetailActionType.FAIL:
      return { ...state, loading: false, error: action.payload };
    case UserDetailActionType.RESET:
      return initialUserDetailState;
    default:
      return state;
  }
};

export const userUpdateProfileReducer: Reducer<UserProfileState> = (
  state = initialUpdateProfileState,
  action: UserUpdateProfileActions
): UserProfileState => {
  switch (action.type) {
    case UserUpdateProfileActionType.REQUEST:
      return { ...state, loading: true };
    case UserUpdateProfileActionType.SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: '',
        userInfo: action.payload,
      };
    case UserUpdateProfileActionType.FAIL:
      return { ...state, loading: false, error: action.payload };
    case UserUpdateProfileActionType.RESET:
      return initialUpdateProfileState;
    default:
      return state;
  }
};

export const userListReducer: Reducer<UserListState> = (
  state = initialUserListState,
  action: UserListActions
): UserListState => {
  switch (action.type) {
    case UserListActionType.REQUEST:
      return { ...state, loading: true };
    case UserListActionType.SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        usersList: action.payload,
      };
    case UserListActionType.FAIL:
      return { ...state, loading: false, error: action.payload };
    case UserListActionType.RESET:
      return initialUserListState;

    default:
      return state;
  }
};

const initialStateWithSuccess: BaseAndSucessState = {
  loading: false,
  error: '',
  success: false,
};

export const userDeleteReducer: Reducer<BaseAndSucessState> = (
  state = initialStateWithSuccess,
  action: UserDeleteActions
): BaseAndSucessState => {
  switch (action.type) {
    case UserDeleteActionType.REQUEST:
      return { ...state, loading: true };
    case UserDeleteActionType.SUCCESS:
      return {
        loading: false,
        error: '',
        success: true,
      };
    case UserDeleteActionType.FAIL:
      return {
        success: false,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userUpdateReducer: Reducer<BaseAndSucessState> = (
  state = initialStateWithSuccess,
  action: UserUpdateActions
): BaseAndSucessState => {
  switch (action.type) {
    case UserUpdateActionType.REQUEST:
      return { ...state, loading: true };

    case UserUpdateActionType.SUCCESS:
      return {
        loading: false,
        error: '',
        success: true,
      };

    case UserUpdateActionType.FAIL:
      return {
        success: false,
        loading: false,
        error: action.payload,
      };

    case UserUpdateActionType.RESET:
      return initialStateWithSuccess;

    default:
      return state;
  }
};
