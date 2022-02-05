import { FullUser } from '../../../interfaces';
import { UserLoginActionType } from '../UserActionTypes';

interface REQUEST {
  type: UserLoginActionType.REQUEST;
}
interface SUCCESS {
  type: UserLoginActionType.SUCCESS;
  payload: FullUser;
}
interface FAIL {
  type: UserLoginActionType.FAIL;
  payload: string;
}
interface LOGOUT {
  type: UserLoginActionType.LOGOUT;
}
export type UserLoginActions = REQUEST | SUCCESS | FAIL | LOGOUT;
