import { createAction } from "redux-actions";
import {IAssociationStateContext } from "./context";
import { IAssociation } from "../interfaces";

export enum AssociationActionEnums {
  getAssociationsPending = "GET_ASSOCIATIONS_PENDING",
  getAssociationsSuccess = "GET_ASSOCIATIONS_SUCCESS",
  getAssociationsError = "GET_ASSOCIATIONS_ERROR",

  getAssociationPending = "GET_ASSOCIATION_PENDING",
  getAssociationSuccess = "GET_ASSOCIATION_SUCCESS",
  getAssociationError = "GET_ASSOCIATION_ERROR",

  createAssociationPending = "CREATE_ASSOCIATION_PENDING",
  createAssociationSuccess = "CREATE_ASSOCIATION_SUCCESS",
  createAssociationError = "CREATE_ASSOCIATION_ERROR",

  updateAssociationPending = "UPDATE_ASSOCIATION_PENDING",
  updateAssociationSuccess = "UPDATE_ASSOCIATION_SUCCESS",
  updateAssociationError = "UPDATE_ASSOCIATION_ERROR",

  deleteAssociationPending = "DELETE_ASSOCIATION_PENDING",
  deleteAssociationSuccess = "DELETE_ASSOCIATION_SUCCESS",
  deleteAssociationError = "DELETE_ASSOCIATION_ERROR",
}

// Get All Associations Actions
export const getAssociationsPending = createAction<IAssociationStateContext>(
  AssociationActionEnums.getAssociationsPending,

  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getAssociationsSuccess = createAction<
  IAssociationStateContext,
  IAssociation[]
>(
  AssociationActionEnums.getAssociationsSuccess,

  (Associations: IAssociation[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Associations,
  })
);

export const getAssociationsError = createAction<IAssociationStateContext>(
  AssociationActionEnums.getAssociationsError,

  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getAssociationPending = createAction<IAssociationStateContext>(
  AssociationActionEnums.getAssociationPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getAssociationSuccess = createAction<IAssociationStateContext, IAssociation>(
  AssociationActionEnums.getAssociationSuccess,
  (Association: IAssociation) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Association,
  })
);

export const getAssociationError = createAction<IAssociationStateContext>(
  AssociationActionEnums.getAssociationError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const createAssociationPending = createAction<IAssociationStateContext>(
  AssociationActionEnums.createAssociationPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createAssociationSuccess = createAction<
  IAssociationStateContext,
  IAssociation
>(AssociationActionEnums.createAssociationSuccess, (Association: IAssociation) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Association,
}));

export const createAssociationError = createAction<IAssociationStateContext>(
  AssociationActionEnums.createAssociationError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const updateAssociationPending = createAction<IAssociationStateContext>(
  AssociationActionEnums.updateAssociationPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateAssociationSuccess = createAction<
  IAssociationStateContext,
  IAssociation
>(AssociationActionEnums.updateAssociationSuccess, (Association: IAssociation) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Association,
}));

export const updateAssociationError = createAction<IAssociationStateContext>(
  AssociationActionEnums.updateAssociationError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const deleteAssociationPending = createAction<IAssociationStateContext>(
  AssociationActionEnums.deleteAssociationPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deleteAssociationSuccess = createAction<
  IAssociationStateContext,
  IAssociation
>(AssociationActionEnums.deleteAssociationSuccess, (Association: IAssociation) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Association,
}));

export const deleteAssociationError = createAction<IAssociationStateContext>(
  AssociationActionEnums.deleteAssociationError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
