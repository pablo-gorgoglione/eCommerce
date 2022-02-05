import { FullUser } from '../../../interfaces';
import { UserDetailActionType } from '../UserActionTypes';

interface REQUEST {
  type: UserDetailActionType.REQUEST;
}
interface SUCCESS {
  type: UserDetailActionType.SUCCESS;
  payload: FullUser;
}
interface FAIL {
  type: UserDetailActionType.FAIL;
  payload: string;
}
interface RESET {
  type: UserDetailActionType.RESET;
  payload: FullUser;
}

export type UserDetailActions = REQUEST | SUCCESS | FAIL | RESET;
