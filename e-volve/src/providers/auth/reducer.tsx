import { handleActions } from "redux-actions";
import { INITIAL_STATE, IAuthStateContext } from "./context";
import { AuthActionEnums } from "./actions";

export const AuthReducer = handleActions<IAuthStateContext>(
  {
    // Handling login actions
    [AuthActionEnums.loginUserPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AuthActionEnums.loginUserSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AuthActionEnums.loginUserError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // Handling get current user actions
    [AuthActionEnums.getCurrentUserPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AuthActionEnums.getCurrentUserSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AuthActionEnums.getCurrentUserError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // Handling get sign up actions
    [AuthActionEnums.signUpPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AuthActionEnums.signUpSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AuthActionEnums.signUpError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.signOutUser]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.resetStateFlagsAction]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [AuthActionEnums.updateRoleAction]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
