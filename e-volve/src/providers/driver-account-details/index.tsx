import { getAxiosInstace } from "@/utils/axios-instance";
import { INITIAL_STATE, DriverAccountDetailActionContext, DriverAccountDetailStateContext } from "./context";
import { IDriverAccountDetail } from "../interfaces";
import { DriverAccountDetailReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  getDriverAccountDetailsError,
  getDriverAccountDetailsPending,
  getDriverAccountDetailsSuccess,
  getDriverAccountDetailError,
  getDriverAccountDetailPending,
  getDriverAccountDetailSuccess,
  createDriverAccountDetailPending,
  createDriverAccountDetailError,
  updateDriverAccountDetailSuccess,
  createDriverAccountDetailSuccess,
  updateDriverAccountDetailPending,
  updateDriverAccountDetailError,
  deleteDriverAccountDetailPending,
  deleteDriverAccountDetailSuccess,
  deleteDriverAccountDetailError,
  addTaxiToQuePending,
  addTaxiToQueSuccess,
  addTaxiToQueError,
  getQuesByTaxiIdPending,
  getQuesByTaxiIdSuccess,
  getQuesByTaxiIdError,
  markTaxiAsArrivedPending,
  markTaxiAsArrivedSuccess,
  markTaxiAsArrivedError,
  dispatchTaxiPending,
  dispatchTaxiSuccess,
  dispatchTaxiError,
} from "./actions";

export const DriverAccountDetailProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(DriverAccountDetailReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const getDriverAccountDetails = async () => {
    dispatch(getDriverAccountDetailsPending());
    const endpoint = `/api/services/app/DriverAccountDetail/GetAllInclude`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getDriverAccountDetailsSuccess(response.data.result));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getDriverAccountDetailsError());
      });
  };

  const addTaxiToQue = async (taxiId: string, queId: string) => {
    dispatch(addTaxiToQuePending());
    const endpoint = `api/services/app/Que/AddTaxiToQue?queId=${queId}&taxiId=${taxiId}`;
    await instance
      .post(endpoint)
      .then(() => {
        dispatch(addTaxiToQueSuccess());
      })
      .catch((error) => {
        console.error(error);
        dispatch(addTaxiToQueError());
      });
  };

  const getDriverAccountDetail = async (id: string) => {
    dispatch(getDriverAccountDetailPending());
    const endpoint = `/DriverAccountDetails/${id}`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getDriverAccountDetailSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getDriverAccountDetailError());
      });
  };

  const createDriverAccountDetail = async (DriverAccountDetail: IDriverAccountDetail) => {
    dispatch(createDriverAccountDetailPending());
    const endpoint = `/api/services/app/DriverAccountDetail/Create`;
    console.log("DriverAccountDetail:", DriverAccountDetail);
    await instance
      .post(endpoint, DriverAccountDetail)
      .then((response) => {
        dispatch(createDriverAccountDetailSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(createDriverAccountDetailError());
      });
  };

  const updateDriverAccountDetail = async (DriverAccountDetail: IDriverAccountDetail) => {
    dispatch(updateDriverAccountDetailPending());
    const endpoint = `/api/services/app/DriverAccountDetail/Update`;
    await instance
      .put(endpoint, DriverAccountDetail)
      .then((response) => {
        dispatch(updateDriverAccountDetailSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(updateDriverAccountDetailError());
      });
  };

  const deleteDriverAccountDetail = async (id: string) => {
    dispatch(deleteDriverAccountDetailPending());
    const endpoint = `/api/services/app/DriverAccountDetail/Delete?Id=${id}`;
    await instance
      .delete(endpoint)
      .then((response) => {
        dispatch(deleteDriverAccountDetailSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(deleteDriverAccountDetailError());
      });
  };

  const getQuesByTaxiId = async (taxiId: string) => {
    dispatch(getQuesByTaxiIdPending());
    const endpoint = `/api/services/app/DriverAccountDetail/GetDriverAccountDetailsByTaxiId?taxiId=${taxiId}`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getQuesByTaxiIdSuccess(response.data.result));
        console.log(response.data.result);
      })
      .catch((error) => {
        console.error(error);
        dispatch(getQuesByTaxiIdError());
      });
  };

  const markTaxiAsArrived = async (taxiId: string) => {
    dispatch(markTaxiAsArrivedPending());
    const endpoint = `/api/services/app/Que/MarkTaxiAsArrived?taxiId=${taxiId}`;
    await instance
      .post(endpoint)
      .then(() => {
        dispatch(markTaxiAsArrivedSuccess());
      })
      .catch((error) => {
        console.error(error);
        dispatch(markTaxiAsArrivedError());
      });
  };
  const dispatchTaxiFromQue = async (queid:string|undefined,taxiId:string|undefined) => {
    dispatch(dispatchTaxiPending());
    const endpoint = `/api/services/app/Que/DispatchTaxiFromQue?queId=${queid}&taxiId=${taxiId}`;
    await instance
      .post(endpoint)
      .then(() => {
        dispatch(dispatchTaxiSuccess());
      })
      .catch((error) => {
        console.error(error);
        dispatch(dispatchTaxiError());
      });
  };

  return (
    <DriverAccountDetailStateContext.Provider value={state}>
      <DriverAccountDetailActionContext.Provider
        value={{
          markTaxiAsArrived,
          dispatchTaxiFromQue,
          getQuesByTaxiId,
          getDriverAccountDetails,
          getDriverAccountDetail,
          createDriverAccountDetail,
          updateDriverAccountDetail,
          deleteDriverAccountDetail,
          addTaxiToQue,
        }}
      >
        {children}
      </DriverAccountDetailActionContext.Provider>
    </DriverAccountDetailStateContext.Provider>
  );
};

export const useDriverAccountDetailState = () => {
  const context = useContext(DriverAccountDetailStateContext);
  if (!context) {
    throw new Error("useDriverAccountDetailState must be used within a DriverAccountDetailProvider");
  }
  return context;
};

export const useDriverAccountDetailActions = () => {
  const context = useContext(DriverAccountDetailActionContext);
  if (!context) {
    throw new Error("useDriverAccountDetailActions must be used within a DriverAccountDetailProvider");
  }
  return context;
};
