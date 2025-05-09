import { getAxiosInstace } from "@/utils/axios-instance";
import {
  INITIAL_STATE,
  DriverAccountDetailActionContext,
  DriverAccountDetailStateContext,
} from "./context";
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
  getAccDetailByDriverIdPending,
  getAccDetailByDriverIdSuccess,
  getAccDetailByDriverIdError,
} from "./actions";

export const DriverAccountDetailProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    DriverAccountDetailReducer,
    INITIAL_STATE
  );
  const instance = getAxiosInstace();

  const getDriverAccountDetails = async () => {
    dispatch(getDriverAccountDetailsPending());
    const endpoint = `/api/services/app/DriverAccountDetails/GetAllInclude`;
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

  const createDriverAccountDetail = async (
    DriverAccountDetail: IDriverAccountDetail
  ) => {
    dispatch(createDriverAccountDetailPending());
    const endpoint = `/api/services/app/DriverAccountDetails/Create`;
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
  const updateDriverAccountDetail = async (
    DriverAccountDetail: IDriverAccountDetail
  ) => {
    dispatch(updateDriverAccountDetailPending());
    const endpoint = `/api/services/app/DriverAccountDetails/Update`;
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
    const endpoint = `/api/services/app/DriverAccountDetails/Delete?Id=${id}`;
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
  const getAccDetailByDriverId = async (driverId: string) => {
    dispatch(getAccDetailByDriverIdPending());
    const endpoint = `/api/services/app/DriverAaccount/GetDriverAccountByID?driverId=${driverId}`;
    instance
      .get(endpoint)
      .then((response) => {
        dispatch(getAccDetailByDriverIdSuccess(response.data.result));
      })
      .catch((err) => {
        dispatch(getAccDetailByDriverIdError());
        console.error(err);
      });
  };

  return (
    <DriverAccountDetailStateContext.Provider value={state}>
      <DriverAccountDetailActionContext.Provider
        value={{
          getAccDetailByDriverId,
          getDriverAccountDetails,
          getDriverAccountDetail,
          createDriverAccountDetail,
          updateDriverAccountDetail,
          deleteDriverAccountDetail,
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
    throw new Error(
      "useDriverAccountDetailState must be used within a DriverAccountDetailProvider"
    );
  }
  return context;
};

export const useDriverAccountDetailActions = () => {
  const context = useContext(DriverAccountDetailActionContext);
  if (!context) {
    throw new Error(
      "useDriverAccountDetailActions must be used within a DriverAccountDetailProvider"
    );
  }
  return context;
};
