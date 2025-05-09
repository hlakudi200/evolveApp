import { createAction } from "redux-actions";
import { IPaymentStateContext } from "./context";
import { IPayment, IYocoCheckoutResponse } from "../interfaces";

export enum PaymentActionEnums {
  getPaymentsPending = "GET_PAYMENTS_PENDING",
  getPaymentsSuccess = "GET_PAYMENTS_SUCCESS",
  getPaymentsError = "GET_PAYMENTS_ERROR",

  getPaymentPending = "GET_PAYMENT_PENDING",
  getPaymentSuccess = "GET_PAYMENT_SUCCESS",
  getPaymentError = "GET_PAYMENT_ERROR",

  createPaymentPending = "CREATE_PAYMENT_PENDING",
  createPaymentSuccess = "CREATE_PAYMENT_SUCCESS",
  createPaymentError = "CREATE_PAYMENT_ERROR",

  updatePaymentPending = "UPDATE_PAYMENT_PENDING",
  updatePaymentSuccess = "UPDATE_PAYMENT_SUCCESS",
  updatePaymentError = "UPDATE_PAYMENT_ERROR",

  deletePaymentPending = "DELETE_PAYMENT_PENDING",
  deletePaymentSuccess = "DELETE_PAYMENT_SUCCESS",
  deletePaymentError = "DELETE_PAYMENT_ERROR",
  
  yocoCheckOutPending = "YOCO_CHECKOUT_PENDING",
  yocoCheckOutSuccess = "YOCO_CHECKOUT_SUCCESS",
  yocoCheckOutError = "YOCO_CHECKOUT_ERROR",
  

}

// Get All Payments Actions
export const getPaymentsPending = createAction<IPaymentStateContext>(
  PaymentActionEnums.getPaymentsPending,

  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getPaymentsSuccess = createAction<
  IPaymentStateContext,
  IPayment[]
>(
  PaymentActionEnums.getPaymentsSuccess,

  (Payments: IPayment[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Payments,
  })
);

export const getPaymentsError = createAction<IPaymentStateContext>(
  PaymentActionEnums.getPaymentsError,

  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getPaymentPending = createAction<IPaymentStateContext>(
  PaymentActionEnums.getPaymentPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getPaymentSuccess = createAction<IPaymentStateContext, IPayment>(
  PaymentActionEnums.getPaymentSuccess,
  (Payment: IPayment) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Payment,
  })
);

export const getPaymentError = createAction<IPaymentStateContext>(
  PaymentActionEnums.getPaymentError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const createPaymentPending = createAction<IPaymentStateContext>(
  PaymentActionEnums.createPaymentPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createPaymentSuccess = createAction<
  IPaymentStateContext,
  IPayment
>(PaymentActionEnums.createPaymentSuccess, (Payment: IPayment) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Payment,
}));

export const createPaymentError = createAction<IPaymentStateContext>(
  PaymentActionEnums.createPaymentError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const updatePaymentPending = createAction<IPaymentStateContext>(
  PaymentActionEnums.updatePaymentPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updatePaymentSuccess = createAction<
  IPaymentStateContext,
  IPayment
>(PaymentActionEnums.updatePaymentSuccess, (Payment: IPayment) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Payment,
}));

export const updatePaymentError = createAction<IPaymentStateContext>(
  PaymentActionEnums.updatePaymentError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const deletePaymentPending = createAction<IPaymentStateContext>(
  PaymentActionEnums.deletePaymentPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deletePaymentSuccess = createAction<
  IPaymentStateContext,
  IPayment
>(PaymentActionEnums.deletePaymentSuccess, (Payment: IPayment) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Payment,
}));

export const deletePaymentError = createAction<IPaymentStateContext>(
  PaymentActionEnums.deletePaymentError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//yoco Checkout 
export const yocoCheckOutPending = createAction<IPaymentStateContext>(
    PaymentActionEnums.yocoCheckOutPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );
  
  export const yocoCheckOutSuccess = createAction<
    IPaymentStateContext,IYocoCheckoutResponse
  >(PaymentActionEnums.yocoCheckOutSuccess, ( YocoResponse:IYocoCheckoutResponse) => ({ isPending: false,isSuccess: true,isError: false,YocoResponse
  }));
  
  export const yocoCheckOutError = createAction<IPaymentStateContext>(
    PaymentActionEnums.yocoCheckOutError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );
