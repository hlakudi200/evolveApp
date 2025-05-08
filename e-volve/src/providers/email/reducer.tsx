import { handleActions } from "redux-actions";
import { INITIAL_STATE, IEmailStateContext } from "./context";
import { EmailActionEnums } from "./actions";

export const EmailReducer = handleActions<IEmailStateContext>(
  {
    [EmailActionEnums.sendEmailPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [EmailActionEnums.sendEmailSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [EmailActionEnums.sendEmailError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
