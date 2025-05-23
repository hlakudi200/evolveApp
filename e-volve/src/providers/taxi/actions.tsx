import { createAction } from "redux-actions";
import {ITaxiStateContext } from "./context";
import { ITaxi } from "../interfaces";

export enum TaxiActionEnums {
  getTaxisPending = "GET_TAXIS_PENDING",
  getTaxisSuccess = "GET_TAXIS_SUCCESS",
  getTaxisError = "GET_TAXIS_ERROR",

  getTaxiPending = "GET_TAXI_PENDING",
  getTaxiSuccess = "GET_TAXI_SUCCESS",
  getTaxiError = "GET_TAXI_ERROR",

  getTaxiByDriverIdPending = "GET_TAXI_BY_DRIVERID_PENDING",
  getTaxiByDriverIdSuccess = "GET_TAXI_BY_DRIVERID_SUCCESS",
  getTaxiByDriverIdError = "GET_TAXI_BY_DRIVERID_ERROR",

  createTaxiPending = "CREATE_TAXI_PENDING",
  createTaxiSuccess = "CREATE_TAXI_SUCCESS",
  createTaxiError = "CREATE_TAXI_ERROR",

  updateTaxiPending = "UPDATE_TAXI_PENDING",
  updateTaxiSuccess = "UPDATE_TAXI_SUCCESS",
  updateTaxiError = "UPDATE_TAXI_ERROR",

  updateTaxiRealtimePending = "UPDATE_TAXI_REAL_TIME_PENDING",
  updateTaxiRealtimeSuccess = "UPDATE_TAXI_REAL_TIME_SUCCESS",
  updateTaxiRealtimeError = "UPDATE_TAXI_REAL_TIME_ERROR",

  deleteTaxiPending = "DELETE_TAXI_PENDING",
  deleteTaxiSuccess = "DELETE_TAXI_SUCCESS",
  deleteTaxiError = "DELETE_TAXI_ERROR",
}

// Get All Taxis Actions
export const getTaxisPending = createAction<ITaxiStateContext>(
  TaxiActionEnums.getTaxisPending,

  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getTaxisSuccess = createAction<
  ITaxiStateContext,
  ITaxi[]
>(
  TaxiActionEnums.getTaxisSuccess,

  (Taxis: ITaxi[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Taxis,
  })
);

export const getTaxisError = createAction<ITaxiStateContext>(
  TaxiActionEnums.getTaxisError,

  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getTaxiPending = createAction<ITaxiStateContext>(
  TaxiActionEnums.getTaxiPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getTaxiSuccess = createAction<ITaxiStateContext, ITaxi>(
  TaxiActionEnums.getTaxiSuccess,
  (Taxi: ITaxi) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Taxi,
  })
);

export const getTaxiError = createAction<ITaxiStateContext>(
  TaxiActionEnums.getTaxiError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const createTaxiPending = createAction<ITaxiStateContext>(
  TaxiActionEnums.createTaxiPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createTaxiSuccess = createAction<
  ITaxiStateContext,
  ITaxi
>(TaxiActionEnums.createTaxiSuccess, (Taxi: ITaxi) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Taxi,
}));

export const createTaxiError = createAction<ITaxiStateContext>(
  TaxiActionEnums.createTaxiError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const updateTaxiPending = createAction<ITaxiStateContext>(
  TaxiActionEnums.updateTaxiPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateTaxiSuccess = createAction<
  ITaxiStateContext,
  ITaxi
>(TaxiActionEnums.updateTaxiSuccess, (Taxi: ITaxi) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Taxi,
}));

export const updateTaxiError = createAction<ITaxiStateContext>(
  TaxiActionEnums.updateTaxiError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//UPDATE TAXI 
export const updateTaxiRealtimePending = createAction<ITaxiStateContext>(
  TaxiActionEnums.updateTaxiRealtimePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateTaxiRealtimeSuccess = createAction<
  ITaxiStateContext,
  ITaxi
>(TaxiActionEnums.updateTaxiRealtimeSuccess, (Taxi: ITaxi) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Taxi,
}));

export const updateTaxiRealtimeError = createAction<ITaxiStateContext>(
  TaxiActionEnums.updateTaxiRealtimeError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
//

export const deleteTaxiPending = createAction<ITaxiStateContext>(
  TaxiActionEnums.deleteTaxiPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deleteTaxiSuccess = createAction<
  ITaxiStateContext,
  ITaxi
>(TaxiActionEnums.deleteTaxiSuccess, (Taxi: ITaxi) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Taxi,
}));

export const deleteTaxiError = createAction<ITaxiStateContext>(
  TaxiActionEnums.deleteTaxiError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getTaxiByDriverIdPending = createAction<ITaxiStateContext>(
  TaxiActionEnums.getTaxiByDriverIdPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getTaxiByDriverIdSuccess = createAction<ITaxiStateContext, ITaxi>(
  TaxiActionEnums.getTaxiByDriverIdSuccess,
  (Taxi: ITaxi) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Taxi,
  })
);

export const getTaxiByDriverIdError = createAction<ITaxiStateContext>(
  TaxiActionEnums.getTaxiByDriverIdError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);