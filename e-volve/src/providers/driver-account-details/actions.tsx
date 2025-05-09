import { createAction } from "redux-actions";
import { IDriverAccountDetailStateContext } from "./context";
import { IDriverAccountDetail, ITaxiQues } from "../interfaces";

export enum DriverAccountDetailActionEnums {
  getDriverAccountDetailsPending = "GET_DRIVER_ACCOUNT_DETAILS_PENDING",
  getDriverAccountDetailsSuccess = "GET_DRIVER_ACCOUNT_DETAILS_SUCCESS",
  getDriverAccountDetailsError = "GET_DRIVER_ACCOUNT_DETAILS_ERROR",

  getDriverAccountDetailPending = "GET_DRIVER_ACCOUNT_DETAIL_PENDING",
  getDriverAccountDetailSuccess = "GET_DRIVER_ACCOUNT_DETAIL_SUCCESS",
  getDriverAccountDetailError = "GET_DRIVER_ACCOUNT_DETAIL_ERROR",

  getQuesByTaxiIdPending = "GET_QUES_BY_TAXIID_PENDING",
  getQuesByTaxiIdSuccess = "GET_QUES_BY_TAXIID_SUCCESS",
  getQuesByTaxiIdError = "GET_QUES_BY_TAXIID_ERROR",

  createDriverAccountDetailPending = "CREATE_DRIVER_ACCOUNT_DETAIL_PENDING",
  createDriverAccountDetailSuccess = "CREATE_DRIVER_ACCOUNT_DETAIL_SUCCESS",
  createDriverAccountDetailError = "CREATE_DRIVER_ACCOUNT_DETAIL_ERROR",

  addTaxiToQuePending = "ADD_TAXI_TO_QUE_PENDING",
  addTaxiToQueSuccess = "ADD_TAXI_TO_QUE_SUCCESS",
  addTaxiToQueError = "ADD_TAXI_TO_QUE_ERROR",

  updateDriverAccountDetailPending = "UPDATE_DRIVER_ACCOUNT_DETAIL_PENDING",
  updateDriverAccountDetailSuccess = "UPDATE_DRIVER_ACCOUNT_DETAIL_SUCCESS",
  updateDriverAccountDetailError = "UPDATE_DRIVER_ACCOUNT_DETAIL_ERROR",

  deleteDriverAccountDetailPending = "DELETE_DRIVER_ACCOUNT_DETAIL_PENDING",
  deleteDriverAccountDetailSuccess = "DELETE_DRIVER_ACCOUNT_DETAIL_SUCCESS",
  deleteDriverAccountDetailError = "DELETE_DRIVER_ACCOUNT_DETAIL_ERROR",

  dispatchTaxiPending = "DISPATCH_TAXI_PENDING",
  dispatchTaxiSuccess = "DISPATCH_TAXI_SUCCESS",
  dispatchTaxiError = "DISPATCH_TAXI_ERROR",

  markTaxiAsArrivedPending = "MARK_TAXI_PENDING",
  markTaxiAsArrivedSuccess = "MARK_TAXI_SUCCESS",
  markTaxiAsArrivedError = "MARK_TAXI_ERROR",
}

// Get All DriverAccountDetails Actions
export const getDriverAccountDetailsPending = createAction<IDriverAccountDetailStateContext>(
  DriverAccountDetailActionEnums.getDriverAccountDetailsPending,

  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getDriverAccountDetailsSuccess = createAction<IDriverAccountDetailStateContext, IDriverAccountDetail[]>(
  DriverAccountDetailActionEnums.getDriverAccountDetailsSuccess,

  (DriverAccountDetails: IDriverAccountDetail[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    DriverAccountDetails,
  })
);

export const getDriverAccountDetailsError = createAction<IDriverAccountDetailStateContext>(
  DriverAccountDetailActionEnums.getDriverAccountDetailsError,

  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getDriverAccountDetailPending = createAction<IDriverAccountDetailStateContext>(
  DriverAccountDetailActionEnums.getDriverAccountDetailPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getDriverAccountDetailSuccess = createAction<IDriverAccountDetailStateContext, IDriverAccountDetail>(
  DriverAccountDetailActionEnums.getDriverAccountDetailSuccess,
  (DriverAccountDetail: IDriverAccountDetail) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    DriverAccountDetail,
  })
);

export const getDriverAccountDetailError = createAction<IDriverAccountDetailStateContext>(
  DriverAccountDetailActionEnums.getDriverAccountDetailError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const createDriverAccountDetailPending = createAction<IDriverAccountDetailStateContext>(
  DriverAccountDetailActionEnums.createDriverAccountDetailPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createDriverAccountDetailSuccess = createAction<IDriverAccountDetailStateContext, IDriverAccountDetail>(
  DriverAccountDetailActionEnums.createDriverAccountDetailSuccess,
  (DriverAccountDetail: IDriverAccountDetail) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    DriverAccountDetail,
  })
);

export const createDriverAccountDetailError = createAction<IDriverAccountDetailStateContext>(
  DriverAccountDetailActionEnums.createDriverAccountDetailError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const updateDriverAccountDetailPending = createAction<IDriverAccountDetailStateContext>(
  DriverAccountDetailActionEnums.updateDriverAccountDetailPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateDriverAccountDetailSuccess = createAction<IDriverAccountDetailStateContext, IDriverAccountDetail>(
  DriverAccountDetailActionEnums.updateDriverAccountDetailSuccess,
  (DriverAccountDetail: IDriverAccountDetail) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    DriverAccountDetail,
  })
);

export const updateDriverAccountDetailError = createAction<IDriverAccountDetailStateContext>(
  DriverAccountDetailActionEnums.updateDriverAccountDetailError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const deleteDriverAccountDetailPending = createAction<IDriverAccountDetailStateContext>(
  DriverAccountDetailActionEnums.deleteDriverAccountDetailPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deleteDriverAccountDetailSuccess = createAction<IDriverAccountDetailStateContext, IDriverAccountDetail>(
  DriverAccountDetailActionEnums.deleteDriverAccountDetailSuccess,
  (DriverAccountDetail: IDriverAccountDetail) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    DriverAccountDetail,
  })
);

export const deleteDriverAccountDetailError = createAction<IDriverAccountDetailStateContext>(
  DriverAccountDetailActionEnums.deleteDriverAccountDetailError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//ADD TAXI TO QUE
export const addTaxiToQuePending = createAction<IDriverAccountDetailStateContext>(
  DriverAccountDetailActionEnums.addTaxiToQuePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const addTaxiToQueSuccess = createAction<IDriverAccountDetailStateContext>(
  DriverAccountDetailActionEnums.addTaxiToQueSuccess,
  () => ({
    isPending: false,
    isSuccess: true,
    isError: false,
  })
);

export const addTaxiToQueError = createAction<IDriverAccountDetailStateContext>(
  DriverAccountDetailActionEnums.addTaxiToQueError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getQuesByTaxiIdPending = createAction<IDriverAccountDetailStateContext>(
  DriverAccountDetailActionEnums.getQuesByTaxiIdPending,

  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getQuesByTaxiIdSuccess = createAction<
  IDriverAccountDetailStateContext,
  ITaxiQues[]
>(
  DriverAccountDetailActionEnums.getQuesByTaxiIdSuccess,

  (taxiQues: ITaxiQues[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    TaxiQues: taxiQues,
  })
);

export const getQuesByTaxiIdError = createAction<IDriverAccountDetailStateContext>(
  DriverAccountDetailActionEnums.getQuesByTaxiIdError,

  () => ({ isPending: false, isSuccess: false, isError: true })
);

//ADD TAXI TO QUE
export const dispatchTaxiPending = createAction<IDriverAccountDetailStateContext>(
  DriverAccountDetailActionEnums.dispatchTaxiPending,

  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const dispatchTaxiSuccess = createAction<IDriverAccountDetailStateContext>(
  DriverAccountDetailActionEnums.dispatchTaxiSuccess,
  () => ({isPending: false,isSuccess: true,isError: false,
  })
);

export const dispatchTaxiError = createAction<IDriverAccountDetailStateContext>(
  DriverAccountDetailActionEnums.dispatchTaxiError,

  () => ({ isPending: false, isSuccess: false, isError: true })
);

//MARK AS ARRIVED 

export const markTaxiAsArrivedPending = createAction<IDriverAccountDetailStateContext>(
  DriverAccountDetailActionEnums.markTaxiAsArrivedPending,

  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const markTaxiAsArrivedSuccess = createAction<IDriverAccountDetailStateContext>(
  DriverAccountDetailActionEnums.markTaxiAsArrivedSuccess,
  () => ({isPending: false,isSuccess: true,isError: false,
  })
);

export const markTaxiAsArrivedError = createAction<IDriverAccountDetailStateContext>(
  DriverAccountDetailActionEnums.markTaxiAsArrivedError,

  () => ({ isPending: false, isSuccess: false, isError: true })
);