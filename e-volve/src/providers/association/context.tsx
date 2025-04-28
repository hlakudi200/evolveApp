import { createContext } from "react";
import { IAssociation } from "../interfaces";

export interface IAssociationStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  Association?: IAssociation;
  Associations?: IAssociation[];
}

export interface IAssociationActionContext {
  getAssociations: () => void;
  getAssociation: (id: string) => void;
  createAssociation: (Association: IAssociation) => void;
  updateAssociation: (Association: IAssociation) => void;
  deleteAssociation: (id: string) => void;
}

export const INITIAL_STATE: IAssociationStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const AssociationStateContext =
  createContext<IAssociationStateContext>(INITIAL_STATE);

export const AssociationActionContext = createContext<
  IAssociationActionContext | undefined
>(undefined);
