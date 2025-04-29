import { getAxiosInstace } from "@/utils/axios-instance";
import {
  INITIAL_STATE,
  DriverActionContext,
  DriverStateContext,
} from "./context";
import { IDriver } from "../interfaces";
import { DriverReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  getDriversError,
  getDriversPending,
  getDriversSuccess,
  getDriverError,
  getDriverPending,
  getDriverSuccess,
  createDriverPending,
  createDriverError,
  updateDriverSuccess,
  createDriverSuccess,
  updateDriverPending,
  updateDriverError,
  deleteDriverPending,
  deleteDriverSuccess,
  deleteDriverError,
} from "./actions";

export const DriverProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(DriverReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const getDrivers = async () => {
    dispatch(getDriversPending());
    const endpoint = `/api/services/app/Driver/GetAllInclude`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getDriversSuccess(response.data.result));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getDriversError());
      });
  };

  const getDriver = async (id: string) => {
    dispatch(getDriverPending());
    const endpoint = `/Drivers/${id}`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getDriverSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getDriverError());
      });
  };

  const createDriver = async (Driver: IDriver) => {
    dispatch(createDriverPending());
    const endpoint = `/api/services/app/Driver/Create`;
    console.log("Driver:",Driver)
    await instance
      .post(endpoint, Driver)
      .then((response) => {
        dispatch(createDriverSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(createDriverError());
      });
  };

  const updateDriver = async (Driver: IDriver) => {
    dispatch(updateDriverPending());
    const endpoint = `/api/services/app/Driver/Update`;
    await instance
      .put(endpoint, Driver)
      .then((response) => {
        dispatch(updateDriverSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(updateDriverError());
      });
  };

  const deleteDriver = async (id: string) => {
    dispatch(deleteDriverPending());
    const endpoint = `/api/services/app/Driver/Delete?Id=${id}`;
    await instance
      .delete(endpoint)
      .then((response) => {
        dispatch(deleteDriverSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(deleteDriverError());
      });
  };

  return (
    <DriverStateContext.Provider value={state}>
      <DriverActionContext.Provider
        value={{
          getDrivers,
          getDriver,
          createDriver,
          updateDriver,
          deleteDriver,
        }}
      >
        {children}
      </DriverActionContext.Provider>
    </DriverStateContext.Provider>
  );
};

export const useDriverState = () => {
  const context = useContext(DriverStateContext);
  if (!context) {
    throw new Error("useDriverState must be used within a DriverProvider");
  }
  return context;
};

export const useDriverActions = () => {
  const context = useContext(DriverActionContext);
  if (!context) {
    throw new Error("useDriverActions must be used within a DriverProvider");
  }
  return context;
};
