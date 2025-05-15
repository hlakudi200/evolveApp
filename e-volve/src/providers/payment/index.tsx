"use client";
import { getAxiosInstace } from "@/utils/axios-instance";
import {
  INITIAL_STATE,
  PaymentActionContext,
  PaymentStateContext,
} from "./context";
import { ICreateYocoCheckout, IPayment } from "../interfaces";
import { PaymentReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  getPaymentsError,
  getPaymentsPending,
  getPaymentsSuccess,
  getPaymentError,
  getPaymentPending,
  getPaymentSuccess,
  createPaymentPending,
  createPaymentError,
  updatePaymentSuccess,
  createPaymentSuccess,
  updatePaymentPending,
  updatePaymentError,
  deletePaymentPending,
  deletePaymentSuccess,
  deletePaymentError,
  yocoCheckOutPending,
  yocoCheckOutSuccess,
  yocoCheckOutError,
} from "./actions";

export const PaymentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(PaymentReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const getPayments = async () => {
    dispatch(getPaymentsPending());
    const endpoint = `/api/services/app/Payment/GetAllInclude`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getPaymentsSuccess(response.data.result));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getPaymentsError());
      });
  };

  const getPayment = async (id: number | undefined) => {
    dispatch(getPaymentPending());
    const endpoint = `/api/services/app/Payment/GetPaymentByUserId?userId=${id}`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getPaymentSuccess(response.data.result));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getPaymentError());
      });
  };

  const createPayment = async (Payment: IPayment) => {
    dispatch(createPaymentPending());
    const endpoint = `/api/services/app/Payment/Create`;

    await instance
      .post(endpoint, Payment)
      .then((response) => {
        dispatch(createPaymentSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(createPaymentError());
      });
  };

  const updatePayment = async (Payment: IPayment) => {
    dispatch(updatePaymentPending());
    const endpoint = `/api/services/app/Payment/Update`;
    await instance
      .put(endpoint, Payment)
      .then((response) => {
        dispatch(updatePaymentSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(updatePaymentError());
      });
  };

  const deletePayment = async (id: string) => {
    dispatch(deletePaymentPending());
    const endpoint = `/api/services/app/Payment/Delete?Id=${id}`;
    await instance
      .delete(endpoint)
      .then((response) => {
        dispatch(deletePaymentSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(deletePaymentError());
      });
  };

  const createYocoCheckout = async (
    driverId: string,
    request: ICreateYocoCheckout
  ) => {
    dispatch(yocoCheckOutPending());
    const endpoint = `/api/services/app/Payment/CreateYocoCheckout?driverId=${driverId}`;
    instance
      .post(endpoint, request)
      .then((response) => {
        dispatch(yocoCheckOutSuccess(response.data.result));
      })
      .catch((err) => {
        console.error(err);
        dispatch(yocoCheckOutError());
      });
  };
  return (
    <PaymentStateContext.Provider value={state}>
      <PaymentActionContext.Provider
        value={{
          createYocoCheckout,
          getPayments,
          getPayment,
          createPayment,
          updatePayment,
          deletePayment,
        }}
      >
        {children}
      </PaymentActionContext.Provider>
    </PaymentStateContext.Provider>
  );
};

export const usePaymentState = () => {
  const context = useContext(PaymentStateContext);
  if (!context) {
    throw new Error("usePaymentState must be used within a PaymentProvider");
  }
  return context;
};

export const usePaymentActions = () => {
  const context = useContext(PaymentActionContext);
  if (!context) {
    throw new Error("usePaymentActions must be used within a PaymentProvider");
  }
  return context;
};
