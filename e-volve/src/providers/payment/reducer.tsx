import { handleActions } from "redux-actions";
import { INITIAL_STATE, IPaymentStateContext } from "./context";
import { PaymentActionEnums } from "./actions";

export const PaymentReducer = handleActions<
  IPaymentStateContext,
  IPaymentStateContext
>(
  {
    [PaymentActionEnums.getPaymentsPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PaymentActionEnums.getPaymentsSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PaymentActionEnums.getPaymentsError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PaymentActionEnums.getPaymentPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PaymentActionEnums.getPaymentSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PaymentActionEnums.getPaymentError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PaymentActionEnums.createPaymentPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PaymentActionEnums.createPaymentSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PaymentActionEnums.createPaymentError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PaymentActionEnums.updatePaymentPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PaymentActionEnums.updatePaymentSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PaymentActionEnums.updatePaymentError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PaymentActionEnums.deletePaymentPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PaymentActionEnums.deletePaymentSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PaymentActionEnums.deletePaymentError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PaymentActionEnums.yocoCheckOutPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PaymentActionEnums.yocoCheckOutSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PaymentActionEnums.yocoCheckOutError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
