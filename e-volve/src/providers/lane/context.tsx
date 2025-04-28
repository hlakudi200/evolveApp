import { createContext } from "react";
import { ILane } from "../interfaces";

export interface ILaneStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  Lane?: ILane;
  Lanes?: ILane[];
}

export interface ILaneActionContext {
  getLanes: () => void;
  getLane: (id: string) => void;
  createLane: (Lane: ILane) => void;
  updateLane: (Lane: ILane) => void;
  deleteLane: (id: string) => void;
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
