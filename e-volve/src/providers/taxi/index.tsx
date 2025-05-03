import { getAxiosInstace } from "@/utils/axios-instance";
import { INITIAL_STATE, TaxiActionContext, TaxiStateContext } from "./context";
import { ITaxi } from "../interfaces";
import { TaxiReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  getTaxisError,
  getTaxisPending,
  getTaxisSuccess,
  getTaxiError,
  getTaxiPending,
  getTaxiSuccess,
  createTaxiPending,
  createTaxiError,
  updateTaxiSuccess,
  createTaxiSuccess,
  updateTaxiPending,
  updateTaxiError,
  deleteTaxiPending,
  deleteTaxiSuccess,
  deleteTaxiError,
  getTaxiByDriverIdPending,
  getTaxiByDriverIdSuccess,
  getTaxiByDriverIdError,
} from "./actions";


export const TaxiProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(TaxiReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const getTaxis = async () => {
    dispatch(getTaxisPending());
    const endpoint = `/api/services/app/Taxi/GetAllInclude`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getTaxisSuccess(response.data.result));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getTaxisError());
      });
  };

  const getTaxi = async (id: string) => {
    dispatch(getTaxiPending());
    const endpoint = `/Taxis/${id}`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getTaxiSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getTaxiError());
      });
  };

  const createTaxi = async (Taxi: ITaxi) => {
    dispatch(createTaxiPending());
    const endpoint = `/api/services/app/Taxi/Create`;
    await instance
      .post(endpoint, Taxi)
      .then((response) => {
        dispatch(createTaxiSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(createTaxiError());
      });
  };

  const updateTaxi = async (Taxi: ITaxi) => {
    dispatch(updateTaxiPending());
    const endpoint = `/api/services/app/Taxi/Update`;
    await instance
      .put(endpoint, Taxi)
      .then((response) => {
        dispatch(updateTaxiSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(updateTaxiError());
      });
  };

  const deleteTaxi = async (id: string) => {
    dispatch(deleteTaxiPending());
    const endpoint = `/api/services/app/Taxi/Delete?Id=${id}`;
    await instance
      .delete(endpoint)
      .then((response) => {
        dispatch(deleteTaxiSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(deleteTaxiError());
      });
  };

  const getTaxiByDriverId=async(driverId:string)=>{
    dispatch(getTaxiByDriverIdPending());
    const endpoint = `api/services/app/Taxi/GetTaxiByDriverId?driverId=${driverId}`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getTaxiByDriverIdSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getTaxiByDriverIdError());
      });
  }
  

  return (
    <TaxiStateContext.Provider value={state}>
      <TaxiActionContext.Provider
        value={{
          getTaxis,
          getTaxi,
          createTaxi,
          updateTaxi,
          deleteTaxi,
          getTaxiByDriverId
        }}
      >
        {children}
      </TaxiActionContext.Provider>
    </TaxiStateContext.Provider>
  );
};

export const useTaxiState = () => {
  const context = useContext(TaxiStateContext);
  if (!context) {
    throw new Error("useTaxiState must be used within a TaxiProvider");
  }
  return context;
};

export const useTaxiActions = () => {
  const context = useContext(TaxiActionContext);
  if (!context) {
    throw new Error("useTaxiActions must be used within a TaxiProvider");
  }
  return context;
};
