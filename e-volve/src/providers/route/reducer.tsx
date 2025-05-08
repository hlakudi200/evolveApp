import { handleActions } from "redux-actions";
import { INITIAL_STATE, IRouteStateContext } from "./context";
import { RouteActionEnums } from "./actions";

export const RouteReducer = handleActions<
  IRouteStateContext,
  IRouteStateContext
>(
  {
    [RouteActionEnums.getRoutesPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [RouteActionEnums.getRoutesSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [RouteActionEnums.getRoutesError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [RouteActionEnums.getRoutePending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [RouteActionEnums.getRouteSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [RouteActionEnums.getRouteError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [RouteActionEnums.createRoutePending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [RouteActionEnums.createRouteSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [RouteActionEnums.createRouteError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [RouteActionEnums.updateRoutePending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [RouteActionEnums.updateRouteSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [RouteActionEnums.updateRouteError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [RouteActionEnums.deleteRoutePending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [RouteActionEnums.deleteRouteSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [RouteActionEnums.deleteRouteError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
