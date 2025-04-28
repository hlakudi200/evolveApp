import { createContext } from "react";
import { IDriver } from "../interfaces";

export interface IDriverStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  Driver?: IDriver;
  Drivers?: IDriver[];
}

export interface IDriverActionContext {
  getDrivers: () => void;
  getDriver: (id: string) => void;
  createDriver: (Driver: IDriver) => void;
  updateDriver: (Driver: IDriver) => void;
  deleteDriver: (id: string) => void;
}

export const INITIAL_STATE: IDriverStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const DriverStateContext =
  createContext<IDriverStateContext>(INITIAL_STATE);

export const DriverActionContext = createContext<
  IDriverActionContext | undefined
>(undefined);
