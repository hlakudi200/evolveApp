import { createAction } from "redux-actions";
import {IDriverStateContext } from "./context";
import { IDriver } from "../interfaces";

export enum DriverActionEnums {
  getDriversPending = "GET_DRIVERS_PENDING",
  getDriversSuccess = "GET_DRIVERS_SUCCESS",
  getDriversError = "GET_DRIVERS_ERROR",

  getDriverPending = "GET_DRIVER_PENDING",
  getDriverSuccess = "GET_DRIVER_SUCCESS",
  getDriverError = "GET_DRIVER_ERROR",

  createDriverPending = "CREATE_DRIVER_PENDING",
  createDriverSuccess = "CREATE_DRIVER_SUCCESS",
  createDriverError = "CREATE_DRIVER_ERROR",

  updateDriverPending = "UPDATE_DRIVER_PENDING",
  updateDriverSuccess = "UPDATE_DRIVER_SUCCESS",
  updateDriverError = "UPDATE_DRIVER_ERROR",

  deleteDriverPending = "DELETE_DRIVER_PENDING",
  deleteDriverSuccess = "DELETE_DRIVER_SUCCESS",
  deleteDriverError = "DELETE_DRIVER_ERROR",
}

// Get All Drivers Actions
export const getDriversPending = createAction<IDriverStateContext>(
  DriverActionEnums.getDriversPending,

  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getDriversSuccess = createAction<
  IDriverStateContext,
  IDriver[]
>(
  DriverActionEnums.getDriversSuccess,

  (Drivers: IDriver[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Drivers,
  })
);

export const getDriversError = createAction<IDriverStateContext>(
  DriverActionEnums.getDriversError,

  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getDriverPending = createAction<IDriverStateContext>(
  DriverActionEnums.getDriverPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getDriverSuccess = createAction<IDriverStateContext, IDriver>(
  DriverActionEnums.getDriverSuccess,
  (Driver: IDriver) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Driver,
  })
);

export const getDriverError = createAction<IDriverStateContext>(
  DriverActionEnums.getDriverError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const createDriverPending = createAction<IDriverStateContext>(
  DriverActionEnums.createDriverPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createDriverSuccess = createAction<
  IDriverStateContext,
  IDriver
>(DriverActionEnums.createDriverSuccess, (Driver: IDriver) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Driver,
}));

export const createDriverError = createAction<IDriverStateContext>(
  DriverActionEnums.createDriverError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const updateDriverPending = createAction<IDriverStateContext>(
  DriverActionEnums.updateDriverPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateDriverSuccess = createAction<
  IDriverStateContext,
  IDriver
>(DriverActionEnums.updateDriverSuccess, (Driver: IDriver) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Driver,
}));

export const updateDriverError = createAction<IDriverStateContext>(
  DriverActionEnums.updateDriverError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const deleteDriverPending = createAction<IDriverStateContext>(
  DriverActionEnums.deleteDriverPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deleteDriverSuccess = createAction<
  IDriverStateContext,
  IDriver
>(DriverActionEnums.deleteDriverSuccess, (Driver: IDriver) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Driver,
}));

export const deleteDriverError = createAction<IDriverStateContext>(
  DriverActionEnums.deleteDriverError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
