import { createContext } from "react";
import { ITaxi } from "../interfaces";

export interface ITaxiStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  Taxi?: ITaxi;
  Taxis?: ITaxi[];
}

export interface ITaxiActionContext {
  getTaxis: () => void;
  getTaxi: (id: string) => void;
  createTaxi: (Taxi: ITaxi) => void;
  updateTaxi: (Taxi: ITaxi) => void;
  updateTaxiRealtime:(Taxi:ITaxi)=>Promise<void>;
  getTaxiByDriverId: (driverId: string | undefined) => void;
  deleteTaxi: (id: string) => Promise<void>;
}

export const INITIAL_STATE: ITaxiStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const TaxiStateContext = createContext<ITaxiStateContext>(INITIAL_STATE);

export const TaxiActionContext = createContext<ITaxiActionContext | undefined>(
  undefined
);
