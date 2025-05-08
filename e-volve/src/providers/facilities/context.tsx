import { createContext } from "react";
import { IFacility } from "../interfaces";

export interface IFacilityStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  Facility?: IFacility;
  Facilitys?: IFacility[];
}

export interface IFacilityActionContext {
  getFacilitys: () => void;
  getFacility: (id: string) => void;
  createFacility: (Facility: IFacility) => void;
  updateFacility: (Facility: IFacility) => Promise<void>;
  deleteFacility: (id: string) => void;
}

export const INITIAL_STATE: IFacilityStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const FacilityStateContext =
  createContext<IFacilityStateContext>(INITIAL_STATE);

export const FacilityActionContext = createContext<
  IFacilityActionContext | undefined
>(undefined);
