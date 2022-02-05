import { FullUser } from '../../../interfaces';
import { UserRegisterActionType } from '../UserActionTypes';

interface REQUEST {
  type: UserRegisterActionType.REQUEST;
}
interface SUCCESS {
  type: UserRegisterActionType.SUCCESS;
  payload: FullUser;
}
interface FAIL {
  type: UserRegisterActionType.FAIL;
  payload: string;
}

export type UserRegisterActions = REQUEST | SUCCESS | FAIL;
