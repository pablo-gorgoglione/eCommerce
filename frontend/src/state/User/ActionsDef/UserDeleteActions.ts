import { UserDeleteActionType } from '../UserActionTypes';

interface REQUEST {
  type: UserDeleteActionType.REQUEST;
}
interface SUCCESS {
  type: UserDeleteActionType.SUCCESS;
}
interface FAIL {
  type: UserDeleteActionType.FAIL;
  payload: string;
}

export type UserDeleteActions = REQUEST | SUCCESS | FAIL;
