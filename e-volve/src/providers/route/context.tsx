import { createContext } from "react";
import { IRoute } from "../interfaces";


export interface IRouteStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  Route?: IRoute;
  Routes?: IRoute[];
}

export interface IRouteActionContext {
  getRoutes: () => void;
  getRoute: (id: string) => void;
  createRoute: (Route: IRoute) => void;
  updateRoute: (Route: IRoute) => void;
  deleteRoute: (id: string) => void;
}

export const INITIAL_STATE: IRouteStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const RouteStateContext =
  createContext<IRouteStateContext>(INITIAL_STATE);

export const RouteActionContext = createContext<
  IRouteActionContext | undefined
>(undefined);
