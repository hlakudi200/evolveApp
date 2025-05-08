import { createAction } from "redux-actions";
import {IRouteStateContext } from "./context";
import { IRoute } from "../interfaces";

export enum RouteActionEnums {
  getRoutesPending = "GET_ROUTES_PENDING",
  getRoutesSuccess = "GET_ROUTES_SUCCESS",
  getRoutesError = "GET_ROUTES_ERROR",

  getRoutePending = "GET_ROUTE_PENDING",
  getRouteSuccess = "GET_ROUTE_SUCCESS",
  getRouteError = "GET_ROUTE_ERROR",

  createRoutePending = "CREATE_ROUTE_PENDING",
  createRouteSuccess = "CREATE_ROUTE_SUCCESS",
  createRouteError = "CREATE_ROUTE_ERROR",

  updateRoutePending = "UPDATE_ROUTE_PENDING",
  updateRouteSuccess = "UPDATE_ROUTE_SUCCESS",
  updateRouteError = "UPDATE_ROUTE_ERROR",

  deleteRoutePending = "DELETE_ROUTE_PENDING",
  deleteRouteSuccess = "DELETE_ROUTE_SUCCESS",
  deleteRouteError = "DELETE_ROUTE_ERROR",
}

// Get All Routes Actions
export const getRoutesPending = createAction<IRouteStateContext>(
  RouteActionEnums.getRoutesPending,

  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getRoutesSuccess = createAction<
  IRouteStateContext,
  IRoute[]
>(
  RouteActionEnums.getRoutesSuccess,

  (Routes: IRoute[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Routes,
  })
);

export const getRoutesError = createAction<IRouteStateContext>(
  RouteActionEnums.getRoutesError,

  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getRoutePending = createAction<IRouteStateContext>(
  RouteActionEnums.getRoutePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getRouteSuccess = createAction<IRouteStateContext, IRoute>(
  RouteActionEnums.getRouteSuccess,
  (Route: IRoute) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Route,
  })
);

export const getRouteError = createAction<IRouteStateContext>(
  RouteActionEnums.getRouteError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const createRoutePending = createAction<IRouteStateContext>(
  RouteActionEnums.createRoutePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createRouteSuccess = createAction<
  IRouteStateContext,
  IRoute
>(RouteActionEnums.createRouteSuccess, (Route: IRoute) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Route,
}));

export const createRouteError = createAction<IRouteStateContext>(
  RouteActionEnums.createRouteError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const updateRoutePending = createAction<IRouteStateContext>(
  RouteActionEnums.updateRoutePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateRouteSuccess = createAction<
  IRouteStateContext,
  IRoute
>(RouteActionEnums.updateRouteSuccess, (Route: IRoute) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Route,
}));

export const updateRouteError = createAction<IRouteStateContext>(
  RouteActionEnums.updateRouteError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const deleteRoutePending = createAction<IRouteStateContext>(
  RouteActionEnums.deleteRoutePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deleteRouteSuccess = createAction<
  IRouteStateContext,
  IRoute
>(RouteActionEnums.deleteRouteSuccess, (Route: IRoute) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Route,
}));

export const deleteRouteError = createAction<IRouteStateContext>(
  RouteActionEnums.deleteRouteError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
