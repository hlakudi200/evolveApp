import { createAction } from "redux-actions";
import { IEmailStateContext } from "./context";

export enum EmailActionEnums {
  sendEmailPending = "SEND_EMAIL_PENDING",
  sendEmailSuccess = "SEND_EMAIL_SUCCESS",
  sendEmailError = "SEND_EMAIL_ERROR",
}

export const sendEmailPending = createAction<IEmailStateContext>(
  EmailActionEnums.sendEmailPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);
export const sendEmailSuccess = createAction<IEmailStateContext>(
  EmailActionEnums.sendEmailSuccess,
  () => ({
    isPending: false,
    isSuccess: true,
    isError: false,
  })
);
export const sendEmailError = createAction<IEmailStateContext>(
  EmailActionEnums.sendEmailError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
