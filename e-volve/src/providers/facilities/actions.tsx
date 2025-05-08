import { createAction } from "redux-actions";
import {IFacilityStateContext } from "./context";
import { IFacility } from "../interfaces";

export enum FacilityActionEnums {
  getFacilitysPending = "GET_FACILITYS_PENDING",
  getFacilitysSuccess = "GET_FACILITYS_SUCCESS",
  getFacilitysError = "GET_FACILITYS_ERROR",

  getFacilityPending = "GET_FACILITY_PENDING",
  getFacilitySuccess = "GET_FACILITY_SUCCESS",
  getFacilityError = "GET_FACILITY_ERROR",

  createFacilityPending = "CREATE_FACILITY_PENDING",
  createFacilitySuccess = "CREATE_FACILITY_SUCCESS",
  createFacilityError = "CREATE_FACILITY_ERROR",

  updateFacilityPending = "UPDATE_FACILITY_PENDING",
  updateFacilitySuccess = "UPDATE_FACILITY_SUCCESS",
  updateFacilityError = "UPDATE_Facility_ERROR",

  deleteFacilityPending = "DELETE_FACILITY_PENDING",
  deleteFacilitySuccess = "DELETE_FACILITY_SUCCESS",
  deleteFacilityError = "DELETE_FACILITY_ERROR",
}

// Get All Facilitys Actions
export const getFacilitysPending = createAction<IFacilityStateContext>(
  FacilityActionEnums.getFacilitysPending,

  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getFacilitysSuccess = createAction<
  IFacilityStateContext,
  IFacility[]
>(
  FacilityActionEnums.getFacilitysSuccess,

  (Facilitys: IFacility[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Facilitys,
  })
);

export const getFacilitysError = createAction<IFacilityStateContext>(
  FacilityActionEnums.getFacilitysError,

  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getFacilityPending = createAction<IFacilityStateContext>(
  FacilityActionEnums.getFacilityPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getFacilitySuccess = createAction<IFacilityStateContext, IFacility>(
  FacilityActionEnums.getFacilitySuccess,
  (Facility: IFacility) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Facility,
  })
);

export const getFacilityError = createAction<IFacilityStateContext>(
  FacilityActionEnums.getFacilityError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const createFacilityPending = createAction<IFacilityStateContext>(
  FacilityActionEnums.createFacilityPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createFacilitySuccess = createAction<
  IFacilityStateContext,
  IFacility
>(FacilityActionEnums.createFacilitySuccess, (Facility: IFacility) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Facility,
}));

export const createFacilityError = createAction<IFacilityStateContext>(
  FacilityActionEnums.createFacilityError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const updateFacilityPending = createAction<IFacilityStateContext>(
  FacilityActionEnums.updateFacilityPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateFacilitySuccess = createAction<
  IFacilityStateContext,
  IFacility
>(FacilityActionEnums.updateFacilitySuccess, (Facility: IFacility) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Facility,
}));

export const updateFacilityError = createAction<IFacilityStateContext>(
  FacilityActionEnums.updateFacilityError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const deleteFacilityPending = createAction<IFacilityStateContext>(
  FacilityActionEnums.deleteFacilityPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deleteFacilitySuccess = createAction<
  IFacilityStateContext,
  IFacility
>(FacilityActionEnums.deleteFacilitySuccess, (Facility: IFacility) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Facility,
}));

export const deleteFacilityError = createAction<IFacilityStateContext>(
  FacilityActionEnums.deleteFacilityError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
