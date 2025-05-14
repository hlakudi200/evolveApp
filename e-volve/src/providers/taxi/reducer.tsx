import { handleActions } from "redux-actions";
import { INITIAL_STATE, ITaxiStateContext } from "./context";
import { TaxiActionEnums } from "./actions";

export const TaxiReducer = handleActions<
  ITaxiStateContext,
  ITaxiStateContext
>(
  {
    [TaxiActionEnums.getTaxisPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TaxiActionEnums.getTaxisSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TaxiActionEnums.getTaxisError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TaxiActionEnums.getTaxiPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TaxiActionEnums.getTaxiSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TaxiActionEnums.getTaxiError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TaxiActionEnums.createTaxiPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TaxiActionEnums.createTaxiSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TaxiActionEnums.createTaxiError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TaxiActionEnums.updateTaxiPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TaxiActionEnums.updateTaxiSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TaxiActionEnums.updateTaxiError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TaxiActionEnums.deleteTaxiPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TaxiActionEnums.deleteTaxiSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TaxiActionEnums.deleteTaxiError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TaxiActionEnums.getTaxiByDriverIdPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TaxiActionEnums.getTaxiByDriverIdSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TaxiActionEnums.getTaxiByDriverIdError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TaxiActionEnums.updateTaxiRealtimePending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TaxiActionEnums.updateTaxiRealtimeSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [TaxiActionEnums.updateTaxiRealtimeError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
