import { createContext } from "react";
import { IDriverAccountDetail, ITaxiQues } from "../interfaces";

export interface IDriverAccountDetailStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  DriverAccountDetail?: IDriverAccountDetail;
  DriverAccountDetails?: IDriverAccountDetail[];
  TaxiQues?:ITaxiQues[];
}

export interface IDriverAccountDetailActionContext {
  getDriverAccountDetails: () => void;
  getDriverAccountDetail: (id: string) => void;
  createDriverAccountDetail: (DriverAccountDetail: IDriverAccountDetail) => void;
  updateDriverAccountDetail: (DriverAccountDetail: IDriverAccountDetail) => Promise<void>;
  deleteDriverAccountDetail: (id: string) => void;
  addTaxiToQue:(taxiId:string,queId:string)=>Promise<void>
  dispatchTaxiFromQue:(queid:string|undefined,taxiId:string|undefined)=>void;
  markTaxiAsArrived:(taxiId:string)=>void;
  getQuesByTaxiId:(taxiId:string)=>Promise<void>
}

export const INITIAL_STATE: IDriverAccountDetailStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const DriverAccountDetailStateContext =
  createContext<IDriverAccountDetailStateContext>(INITIAL_STATE);

export const DriverAccountDetailActionContext = createContext<
  IDriverAccountDetailActionContext | undefined
>(undefined);
