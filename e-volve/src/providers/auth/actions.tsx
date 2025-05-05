import { createAction } from "redux-actions";
import { IUser, IAuthStateContext } from "./context";

export enum AuthActionEnums {
  loginUserPending = "LOGIN_USER_PENDING",
  loginUserSuccess = "LOGIN_USER_SUCCESS",
  loginUserError = "LOGIN_USER_ERROR",

  getCurrentUserPending = "GET_CURRENT_USER_PENDING",
  getCurrentUserSuccess = "GET_CURRENT_USER_SUCCESS",
  getCurrentUserError = "GET_CURRENT_USER_ERROR",

  signUpPending = "SIGN_UP_PENDING",
  signUpSuccess = "SIGN_UP_SUCCESS",
  signUpError = "SIGN_UP_ERROR",

  signOutUser = "SIGN_OUT_USER",
  resetStateFlagsAction = "RESET_STATE_FLAGS",
  updateRoleAction = "UPDATE_ROLE",
}

export const loginUserPending = createAction<IAuthStateContext>(
  AuthActionEnums.loginUserPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);
export const loginUserSuccess = createAction<IAuthStateContext, string>(
  AuthActionEnums.loginUserSuccess,
  (jwtToken: string) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    jwtToken,
  })
);
export const loginUserError = createAction<IAuthStateContext>(
  AuthActionEnums.loginUserError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getCurrentUserPending = createAction<IAuthStateContext>(
  AuthActionEnums.getCurrentUserPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);
export const getCurrentUserSuccess = createAction<IAuthStateContext, IUser>(
  AuthActionEnums.getCurrentUserSuccess,
  (currentUser: IUser) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    currentUser,
  })
);
export const getCurrentUserError = createAction<IAuthStateContext>(
  AuthActionEnums.getCurrentUserError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const signUpPending = createAction<IAuthStateContext>(
  AuthActionEnums.signUpPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);
export const signUpSuccess = createAction<IAuthStateContext>(
  AuthActionEnums.signUpSuccess,
  () => ({ isPending: false, isSuccess: true, isError: false })
);
export const signUpError = createAction<IAuthStateContext>(
  AuthActionEnums.signUpSuccess,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
export const signOutUser = createAction<IAuthStateContext>(
  AuthActionEnums.signOutUser,
  () => ({
    isPending: false,
    isSuccess: false,
    isError: false,
    currentUser: {
      id: -1,
      userName: "",
      name: "",
      surname: "",
      emailAddress: "",
      password: "",
    },
    jwtToken: undefined,
    currentRole: undefined,
  })
);
export const resetStateFlagsAction = createAction<IAuthStateContext>(
  AuthActionEnums.resetStateFlagsAction,
  () => ({ isPending: false, isSuccess: false, isError: false })
);
export const updateRoleAction = createAction<IAuthStateContext, string>(
  AuthActionEnums.updateRoleAction,
  (currentRole: string) => ({
    isPending: true,
    isSuccess: false,
    isError: false,
    currentRole,
  })
);
