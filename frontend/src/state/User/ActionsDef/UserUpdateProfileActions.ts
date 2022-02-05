import { BaseUser } from '../../../interfaces';
import { UserUpdateProfileActionType } from '../UserActionTypes';

interface REQUEST {
  type: UserUpdateProfileActionType.REQUEST;
}
interface SUCCESS {
  type: UserUpdateProfileActionType.SUCCESS;
  payload: BaseUser;
}
interface FAIL {
  type: UserUpdateProfileActionType.FAIL;
  payload: string;
}
interface RESET {
  type: UserUpdateProfileActionType.RESET;
}

export type UserUpdateProfileActions = REQUEST | SUCCESS | FAIL | RESET;
