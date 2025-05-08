import { getAxiosInstace } from "@/utils/axios-instance";
import { INITIAL_STATE, RouteActionContext, RouteStateContext } from "./context";
import { IRoute } from "../interfaces";
import { RouteReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  getRoutesError,
  getRoutesPending,
  getRoutesSuccess,
  getRouteError,
  getRoutePending,
  getRouteSuccess,
  createRoutePending,
  createRouteError,
  updateRouteSuccess,
  createRouteSuccess,
  updateRoutePending,
  updateRouteError,
  deleteRoutePending,
  deleteRouteSuccess,
  deleteRouteError,
} from "./actions";


export const RouteProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(RouteReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const getRoutes = async () => {
    dispatch(getRoutesPending());
    const endpoint = `/api/services/app/Route/GetAll?MaxResultCount=1000`;

    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getRoutesSuccess(response.data.result.items));
        console.log("routes",response.data.result.items)
      })
      .catch((error) => {
        console.error(error);
        dispatch(getRoutesError());
      });
  };

  const getRoute = async (id: string) => {
    dispatch(getRoutePending());
    const endpoint = `/Routes/${id}`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getRouteSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getRouteError());
      });
  };

  const createRoute = async (Route: IRoute) => {
    dispatch(createRoutePending());
    const endpoint = `/api/services/app/Route/Create`;
    await instance
      .post(endpoint, Route)
      .then((response) => {
        dispatch(createRouteSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(createRouteError());
      });
  };

  const updateRoute = async (Route: IRoute) => {
    dispatch(updateRoutePending());
    const endpoint = `/api/services/app/Route/Update`;
    await instance
      .put(endpoint, Route)
      .then((response) => {
        dispatch(updateRouteSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(updateRouteError());
      });
  };

  const deleteRoute = async (id: string) => {
    dispatch(deleteRoutePending());
    const endpoint = `https://fakestoreapi.com/Routes/${id}`;
    await instance
      .delete(endpoint)
      .then((response) => {
        dispatch(deleteRouteSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(deleteRouteError());
      });
  };

  return (
    <RouteStateContext.Provider value={state}>
      <RouteActionContext.Provider
        value={{
          getRoutes,
          getRoute,
          createRoute,
          updateRoute,
          deleteRoute,
        }}
      >
        {children}
      </RouteActionContext.Provider>
    </RouteStateContext.Provider>
  );
};

export const useRouteState = () => {
  const context = useContext(RouteStateContext);
  if (!context) {
    throw new Error("useRouteState must be used within a RouteProvider");
  }
  return context;
};

export const useRouteActions = () => {
  const context = useContext(RouteActionContext);
  if (!context) {
    throw new Error("useRouteActions must be used within a TaxiProvider");
  }
  return context;
};
