import { UserUpdateActionType } from '../UserActionTypes';

interface REQUEST {
  type: UserUpdateActionType.REQUEST;
}
interface SUCCESS {
  type: UserUpdateActionType.SUCCESS;
}
interface FAIL {
  type: UserUpdateActionType.FAIL;
  payload: string;
}
interface RESET {
  type: UserUpdateActionType.RESET;
}

export type UserUpdateActions = REQUEST | SUCCESS | FAIL | RESET;
