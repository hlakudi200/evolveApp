import { createContext } from "react";
import { ILane, ITaxiQues } from "../interfaces";

export interface ILaneStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  Lane?: ILane;
  Lanes?: ILane[];
  TaxiQues?:ITaxiQues[];
}

export interface ILaneActionContext {
  getLanes: () => void;
  getLane: (id: string) => void;
  createLane: (Lane: ILane) => void;
  updateLane: (Lane: ILane) => Promise<void>;
  deleteLane: (id: string) => void;
  addTaxiToQue:(taxiId:string,queId:string)=>Promise<void>
  dispatchTaxiFromQue:(queid:string,taxiId:string)=>void;
  markTaxiAsArrived:(taxiId:string)=>void;
  getQuesByTaxiId:(taxiId:string)=>Promise<void>
}

export const INITIAL_STATE: ILaneStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const LaneStateContext =
  createContext<ILaneStateContext>(INITIAL_STATE);

export const LaneActionContext = createContext<
  ILaneActionContext | undefined
>(undefined);
