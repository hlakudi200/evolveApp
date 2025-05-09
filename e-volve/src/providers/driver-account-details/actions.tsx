import { createAction } from "redux-actions";
import { IDriverAccountDetailStateContext } from "./context";
import { IDriverAccountDetail} from "../interfaces";

export enum DriverAccountDetailActionEnums {
  getDriverAccountDetailsPending = "GET_DRIVER_ACCOUNT_DETAILS_PENDING",
  getDriverAccountDetailsSuccess = "GET_DRIVER_ACCOUNT_DETAILS_SUCCESS",
  getDriverAccountDetailsError = "GET_DRIVER_ACCOUNT_DETAILS_ERROR",

  getDriverAccountDetailPending = "GET_DRIVER_ACCOUNT_DETAIL_PENDING",
  getDriverAccountDetailSuccess = "GET_DRIVER_ACCOUNT_DETAIL_SUCCESS",
  getDriverAccountDetailError = "GET_DRIVER_ACCOUNT_DETAIL_ERROR",

  createDriverAccountDetailPending = "CREATE_DRIVER_ACCOUNT_DETAIL_PENDING",
  createDriverAccountDetailSuccess = "CREATE_DRIVER_ACCOUNT_DETAIL_SUCCESS",
  createDriverAccountDetailError = "CREATE_DRIVER_ACCOUNT_DETAIL_ERROR",

  updateDriverAccountDetailPending = "UPDATE_DRIVER_ACCOUNT_DETAIL_PENDING",
  updateDriverAccountDetailSuccess = "UPDATE_DRIVER_ACCOUNT_DETAIL_SUCCESS",
  updateDriverAccountDetailError = "UPDATE_DRIVER_ACCOUNT_DETAIL_ERROR",

  deleteDriverAccountDetailPending = "DELETE_DRIVER_ACCOUNT_DETAIL_PENDING",
  deleteDriverAccountDetailSuccess = "DELETE_DRIVER_ACCOUNT_DETAIL_SUCCESS",
  deleteDriverAccountDetailError = "DELETE_DRIVER_ACCOUNT_DETAIL_ERROR",
  
  getAccDetailByDriverIdPending = "GET_DRIVER_ACCOUNT_DETAIL_BY_ID_PENDING",
  getAccDetailByDriverIdSuccess = "GET_DRIVER_ACCOUNT_DETAIL_BY_ID_SUCCESS",
  getAccDetailByDriverIdError = "GET_DRIVER_ACCOUNT_DETAIL_BY_ID_ERROR",

}

// Get All DriverAccountDetails Actions
export const getDriverAccountDetailsPending =
  createAction<IDriverAccountDetailStateContext>(
    DriverAccountDetailActionEnums.getDriverAccountDetailsPending,

    () => ({ isPending: true, isSuccess: false, isError: false })
  );

export const getDriverAccountDetailsSuccess = createAction<
  IDriverAccountDetailStateContext,
  IDriverAccountDetail[]
>(
  DriverAccountDetailActionEnums.getDriverAccountDetailsSuccess,

  (DriverAccountDetails: IDriverAccountDetail[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    DriverAccountDetails,
  })
);

export const getDriverAccountDetailsError =
  createAction<IDriverAccountDetailStateContext>(
    DriverAccountDetailActionEnums.getDriverAccountDetailsError,

    () => ({ isPending: false, isSuccess: false, isError: true })
  );

export const getDriverAccountDetailPending =
  createAction<IDriverAccountDetailStateContext>(
    DriverAccountDetailActionEnums.getDriverAccountDetailPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );

export const getDriverAccountDetailSuccess = createAction<
  IDriverAccountDetailStateContext,
  IDriverAccountDetail
>(
  DriverAccountDetailActionEnums.getDriverAccountDetailSuccess,
  (DriverAccountDetail: IDriverAccountDetail) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    DriverAccountDetail,
  })
);

export const getDriverAccountDetailError =
  createAction<IDriverAccountDetailStateContext>(
    DriverAccountDetailActionEnums.getDriverAccountDetailError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );

export const createDriverAccountDetailPending =
  createAction<IDriverAccountDetailStateContext>(
    DriverAccountDetailActionEnums.createDriverAccountDetailPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );

export const createDriverAccountDetailSuccess = createAction<
  IDriverAccountDetailStateContext,
  IDriverAccountDetail
>(
  DriverAccountDetailActionEnums.createDriverAccountDetailSuccess,
  (DriverAccountDetail: IDriverAccountDetail) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    DriverAccountDetail,
  })
);

export const createDriverAccountDetailError =
  createAction<IDriverAccountDetailStateContext>(
    DriverAccountDetailActionEnums.createDriverAccountDetailError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );

export const updateDriverAccountDetailPending =
  createAction<IDriverAccountDetailStateContext>(
    DriverAccountDetailActionEnums.updateDriverAccountDetailPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );

export const updateDriverAccountDetailSuccess = createAction<
  IDriverAccountDetailStateContext,
  IDriverAccountDetail
>(
  DriverAccountDetailActionEnums.updateDriverAccountDetailSuccess,
  (DriverAccountDetail: IDriverAccountDetail) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    DriverAccountDetail,
  })
);

export const updateDriverAccountDetailError =
  createAction<IDriverAccountDetailStateContext>(
    DriverAccountDetailActionEnums.updateDriverAccountDetailError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );

export const deleteDriverAccountDetailPending =
  createAction<IDriverAccountDetailStateContext>(
    DriverAccountDetailActionEnums.deleteDriverAccountDetailPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );

export const deleteDriverAccountDetailSuccess = createAction<
  IDriverAccountDetailStateContext,
  IDriverAccountDetail
>(
  DriverAccountDetailActionEnums.deleteDriverAccountDetailSuccess,
  (DriverAccountDetail: IDriverAccountDetail) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    DriverAccountDetail,
  })
);

export const deleteDriverAccountDetailError =
  createAction<IDriverAccountDetailStateContext>(
    DriverAccountDetailActionEnums.deleteDriverAccountDetailError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );

  //GET BY DRIVER ID
export const getAccDetailByDriverIdPending =
  createAction<IDriverAccountDetailStateContext>(
    DriverAccountDetailActionEnums.getAccDetailByDriverIdPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );

export const getAccDetailByDriverIdSuccess = createAction<
  IDriverAccountDetailStateContext,
  IDriverAccountDetail
>(
  DriverAccountDetailActionEnums.getAccDetailByDriverIdSuccess,
  (DriverAccountDetail: IDriverAccountDetail) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    DriverAccountDetail,
  })
);

export const getAccDetailByDriverIdError =
  createAction<IDriverAccountDetailStateContext>(
    DriverAccountDetailActionEnums.getAccDetailByDriverIdError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );


