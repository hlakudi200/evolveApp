import { handleActions } from "redux-actions";
import { INITIAL_STATE, IFacilityStateContext } from "./context";
import { FacilityActionEnums } from "./actions";

export const FacilityReducer = handleActions<
  IFacilityStateContext,
  IFacilityStateContext
>(
  {
    [FacilityActionEnums.getFacilitysPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FacilityActionEnums.getFacilitysSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FacilityActionEnums.getFacilitysError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FacilityActionEnums.getFacilityPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FacilityActionEnums.getFacilitySuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FacilityActionEnums.getFacilityError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FacilityActionEnums.createFacilityPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FacilityActionEnums.createFacilitySuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FacilityActionEnums.createFacilityError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FacilityActionEnums.updateFacilityPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FacilityActionEnums.updateFacilitySuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FacilityActionEnums.updateFacilityError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FacilityActionEnums.deleteFacilityPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FacilityActionEnums.deleteFacilitySuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [FacilityActionEnums.deleteFacilityError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
