import { getAxiosInstace } from "@/utils/axios-instance";
import {
  INITIAL_STATE,
  LaneActionContext,
  LaneStateContext,
} from "./context";
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
    console.log("Lane:",Lane)
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

  return (
    <LaneStateContext.Provider value={state}>
      <LaneActionContext.Provider
        value={{
          getLanes,
          getLane,
          createLane,
          updateLane,
          deleteLane,
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
