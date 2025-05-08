import { handleActions } from "redux-actions";
import { INITIAL_STATE, IDriverStateContext } from "./context";
import { DriverActionEnums } from "./actions";

export const DriverReducer = handleActions<
  IDriverStateContext,
  IDriverStateContext
>(
  {
    [DriverActionEnums.getDriversPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverActionEnums.getDriversSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverActionEnums.getDriversError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverActionEnums.getDriverPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverActionEnums.getDriverSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverActionEnums.getDriverError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverActionEnums.createDriverPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverActionEnums.createDriverSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverActionEnums.createDriverError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverActionEnums.updateDriverPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverActionEnums.updateDriverSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverActionEnums.updateDriverError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverActionEnums.deleteDriverPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverActionEnums.deleteDriverSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverActionEnums.deleteDriverError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
