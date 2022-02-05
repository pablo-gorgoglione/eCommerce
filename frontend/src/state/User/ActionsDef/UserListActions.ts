import { FullUser } from '../../../interfaces';
import { UserListActionType } from '../UserActionTypes';

interface REQUEST {
  type: UserListActionType.REQUEST;
}
interface SUCCESS {
  type: UserListActionType.SUCCESS;
  payload: Array<FullUser>;
}
interface FAIL {
  type: UserListActionType.FAIL;
  payload: string;
}
interface RESET {
  type: UserListActionType.RESET;
}

export type UserListActions = REQUEST | SUCCESS | FAIL | RESET;
