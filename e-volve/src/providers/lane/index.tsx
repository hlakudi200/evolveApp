import { getAxiosInstace } from "@/utils/axios-instance";
import { INITIAL_STATE, LaneActionContext, LaneStateContext } from "./context";
import { ILane } from "../interfaces";
import { LaneReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  getLanesError,
  getLanesPending,
  getLanesSuccess,
  getLaneError,
  getLanePending,
  getLaneSuccess,
  createLanePending,
  createLaneError,
  updateLaneSuccess,
  createLaneSuccess,
  updateLanePending,
  updateLaneError,
  deleteLanePending,
  deleteLaneSuccess,
  deleteLaneError,
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

export const LaneProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(LaneReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const getLanes = async () => {
    dispatch(getLanesPending());
    const endpoint = `/api/services/app/Lane/GetAllInclude`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getLanesSuccess(response.data.result));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getLanesError());
      });
  };

  const addTaxiToQue = async (taxiId: string, queId: string) => {
    dispatch(addTaxiToQuePending());
    const endpoint = `api/services/app/Que/AddTaxiToQue?queId=${queId}&taxiId=${taxiId}`;
    await instance
      .post(endpoint)
      .then((response) => {
        if(response.data==200){
          console.log("Sucess:",response.data.result)
        }
        dispatch(addTaxiToQueSuccess());
       
      })
      .catch((error) => {
        console.error(error);
        dispatch(addTaxiToQueError());
      });
  };

  const getLane = async (id: string) => {
    dispatch(getLanePending());
    const endpoint = `/Lanes/${id}`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getLaneSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getLaneError());
      });
  };

  const createLane = async (Lane: ILane) => {
    dispatch(createLanePending());
    const endpoint = `/api/services/app/Lane/Create`;
    console.log("Lane:", Lane);
    await instance
      .post(endpoint, Lane)
      .then((response) => {
        dispatch(createLaneSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(createLaneError());
      });
  };

  const updateLane = async (Lane: ILane) => {
    dispatch(updateLanePending());
    const endpoint = `/api/services/app/Lane/Update`;
    await instance
      .put(endpoint, Lane)
      .then((response) => {
        dispatch(updateLaneSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(updateLaneError());
      });
  };

  const deleteLane = async (id: string) => {
    dispatch(deleteLanePending());
    const endpoint = `/api/services/app/Lane/Delete?Id=${id}`;
    await instance
      .delete(endpoint)
      .then((response) => {
        dispatch(deleteLaneSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(deleteLaneError());
      });
  };

  const getQuesByTaxiId = async (taxiId: string) => {
    dispatch(getQuesByTaxiIdPending());
    const endpoint = `/api/services/app/Lane/GetLanesByTaxiId?taxiId=${taxiId}`;
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
    <LaneStateContext.Provider value={state}>
      <LaneActionContext.Provider
        value={{
          markTaxiAsArrived,
          dispatchTaxiFromQue,
          getQuesByTaxiId,
          getLanes,
          getLane,
          createLane,
          updateLane,
          deleteLane,
          addTaxiToQue,
        }}
      >
        {children}
      </LaneActionContext.Provider>
    </LaneStateContext.Provider>
  );
};

export const useLaneState = () => {
  const context = useContext(LaneStateContext);
  if (!context) {
    throw new Error("useLaneState must be used within a LaneProvider");
  }
  return context;
};

export const useLaneActions = () => {
  const context = useContext(LaneActionContext);
  if (!context) {
    throw new Error("useLaneActions must be used within a LaneProvider");
  }
  return context;
};
