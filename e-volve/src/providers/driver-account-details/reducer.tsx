import { handleActions } from "redux-actions";
import { INITIAL_STATE, IDriverAccountDetailStateContext } from "./context";
import { DriverAccountDetailActionEnums } from "./actions";

export const DriverAccountDetailReducer = handleActions<
  IDriverAccountDetailStateContext,
  IDriverAccountDetailStateContext
>(
  {
    [DriverAccountDetailActionEnums.getDriverAccountDetailsPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverAccountDetailActionEnums.getDriverAccountDetailsSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverAccountDetailActionEnums.getDriverAccountDetailsError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverAccountDetailActionEnums.getDriverAccountDetailPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverAccountDetailActionEnums.getDriverAccountDetailSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverAccountDetailActionEnums.getDriverAccountDetailError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverAccountDetailActionEnums.createDriverAccountDetailPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverAccountDetailActionEnums.createDriverAccountDetailSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverAccountDetailActionEnums.createDriverAccountDetailError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverAccountDetailActionEnums.updateDriverAccountDetailPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverAccountDetailActionEnums.updateDriverAccountDetailSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverAccountDetailActionEnums.updateDriverAccountDetailError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverAccountDetailActionEnums.deleteDriverAccountDetailPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverAccountDetailActionEnums.deleteDriverAccountDetailSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverAccountDetailActionEnums.deleteDriverAccountDetailError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [DriverAccountDetailActionEnums.getAccDetailByDriverIdPending]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    [DriverAccountDetailActionEnums.getAccDetailByDriverIdSuccess]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
    [DriverAccountDetailActionEnums.getAccDetailByDriverIdError]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
  },
  INITIAL_STATE
);
