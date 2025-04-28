import { handleActions } from "redux-actions";
import { INITIAL_STATE, IAssociationStateContext } from "./context";
import { AssociationActionEnums } from "./actions";

export const AssociationReducer = handleActions<
  IAssociationStateContext,
  IAssociationStateContext
>(
  {
    [AssociationActionEnums.getAssociationsPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AssociationActionEnums.getAssociationsSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AssociationActionEnums.getAssociationsError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AssociationActionEnums.getAssociationPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AssociationActionEnums.getAssociationSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AssociationActionEnums.getAssociationError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AssociationActionEnums.createAssociationPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AssociationActionEnums.createAssociationSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AssociationActionEnums.createAssociationError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AssociationActionEnums.updateAssociationPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AssociationActionEnums.updateAssociationSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AssociationActionEnums.updateAssociationError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AssociationActionEnums.deleteAssociationPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AssociationActionEnums.deleteAssociationSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AssociationActionEnums.deleteAssociationError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
