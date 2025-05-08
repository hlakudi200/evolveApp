"use client";
import { getAxiosInstace } from "../../utils/axios-instance";
import {
  INITIAL_STATE,
  EmailActionContext,
  EmailStateContext,
  IEmail,
} from "./context";
import { EmailReducer } from "./reducer";
import { useContext, useReducer } from "react";
import { sendEmailError, sendEmailPending, sendEmailSuccess } from "./actions";

export const EmailProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(EmailReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const sendEmail = async (email: IEmail) => {
    dispatch(sendEmailPending());
    const endpoint = `/api/services/app/Email/SendEmail`;
    await instance
      .post(endpoint, email)
      .then(() => {
        dispatch(sendEmailSuccess());
      })
      .catch((error) => {
        console.error("emailSendErr",error);
        dispatch(sendEmailError());
      });
  };

  return (
    <EmailStateContext.Provider value={state}>
      <EmailActionContext.Provider
        value={{
          sendEmail,
        }}
      >
        {children}
      </EmailActionContext.Provider>
    </EmailStateContext.Provider>
  );
};

export const useEmailState = () => {
  const context = useContext(EmailStateContext);
  if (!context) {
    throw new Error(
      "useEmailState must be used within a AttandanceProvider"
    );
  }
  return context;
};

export const useEmailActions = () => {
  const context = useContext(EmailActionContext);
  if (!context) {
    throw new Error(
      "useEmailSateActions must be used within a AttandanceProvider"
    );
  }
  return context;
};
