import { createAction } from "redux-actions";
import {ILaneStateContext } from "./context";
import { ILane } from "../interfaces";

export enum LaneActionEnums {
  getLanesPending = "GET_LANES_PENDING",
  getLanesSuccess = "GET_LANES_SUCCESS",
  getLanesError = "GET_LANES_ERROR",

  getLanePending = "GET_LANE_PENDING",
  getLaneSuccess = "GET_LANE_SUCCESS",
  getLaneError = "GET_LANE_ERROR",

  createLanePending = "CREATE_LANE_PENDING",
  createLaneSuccess = "CREATE_LANE_SUCCESS",
  createLaneError = "CREATE_LANE_ERROR",

  updateLanePending = "UPDATE_LANE_PENDING",
  updateLaneSuccess = "UPDATE_LANE_SUCCESS",
  updateLaneError = "UPDATE_LANE_ERROR",

  deleteLanePending = "DELETE_LANE_PENDING",
  deleteLaneSuccess = "DELETE_LANE_SUCCESS",
  deleteLaneError = "DELETE_LANE_ERROR",
}

// Get All Lanes Actions
export const getLanesPending = createAction<ILaneStateContext>(
  LaneActionEnums.getLanesPending,

  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getLanesSuccess = createAction<
  ILaneStateContext,
  ILane[]
>(
  LaneActionEnums.getLanesSuccess,

  (Lanes: ILane[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Lanes,
  })
);

export const getLanesError = createAction<ILaneStateContext>(
  LaneActionEnums.getLanesError,

  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getLanePending = createAction<ILaneStateContext>(
  LaneActionEnums.getLanePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getLaneSuccess = createAction<ILaneStateContext, ILane>(
  LaneActionEnums.getLaneSuccess,
  (Lane: ILane) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Lane,
  })
);

export const getLaneError = createAction<ILaneStateContext>(
  LaneActionEnums.getLaneError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const createLanePending = createAction<ILaneStateContext>(
  LaneActionEnums.createLanePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createLaneSuccess = createAction<
  ILaneStateContext,
  ILane
>(LaneActionEnums.createLaneSuccess, (Lane: ILane) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Lane,
}));

export const createLaneError = createAction<ILaneStateContext>(
  LaneActionEnums.createLaneError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const updateLanePending = createAction<ILaneStateContext>(
  LaneActionEnums.updateLanePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateLaneSuccess = createAction<
  ILaneStateContext,
  ILane
>(LaneActionEnums.updateLaneSuccess, (Lane: ILane) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Lane,
}));

export const updateLaneError = createAction<ILaneStateContext>(
  LaneActionEnums.updateLaneError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const deleteLanePending = createAction<ILaneStateContext>(
  LaneActionEnums.deleteLanePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deleteLaneSuccess = createAction<
  ILaneStateContext,
  ILane
>(LaneActionEnums.deleteLaneSuccess, (Lane: ILane) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Lane,
}));

export const deleteLaneError = createAction<ILaneStateContext>(
  LaneActionEnums.deleteLaneError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
