import { handleActions } from "redux-actions";
import { INITIAL_STATE, ILaneStateContext } from "./context";
import { LaneActionEnums } from "./actions";

export const LaneReducer = handleActions<
  ILaneStateContext,
  ILaneStateContext
>(
  {
    [LaneActionEnums.getLanesPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.getLanesSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.getLanesError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.getLanePending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.getLaneSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.getLaneError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.createLanePending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.createLaneSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.createLaneError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.updateLanePending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.updateLaneSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.updateLaneError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.deleteLanePending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.deleteLaneSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.deleteLaneError]: (state, action) => ({
      ...state,
      ...action.payload,
    }), 
    [LaneActionEnums.addTaxiToQuePending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.addTaxiToQueSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.addTaxiToQueError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.getQuesByTaxiIdPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.getQuesByTaxiIdSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.getQuesByTaxiIdError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.markTaxiAsArrivedPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.markTaxiAsArrivedSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.markTaxiAsArrivedError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.dispatchTaxiPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.dispatchTaxiSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LaneActionEnums.dispatchTaxiError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

  },
  INITIAL_STATE
);
