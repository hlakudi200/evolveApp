import { getAxiosInstace } from "@/utils/axios-instance";
import {
  INITIAL_STATE,
  FacilityActionContext,
  FacilityStateContext,
} from "./context";
import { IFacility } from "../interfaces";
import { FacilityReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  getFacilitysError,
  getFacilitysPending,
  getFacilitysSuccess,
  getFacilityError,
  getFacilityPending,
  getFacilitySuccess,
  createFacilityPending,
  createFacilityError,
  updateFacilitySuccess,
  createFacilitySuccess,
  updateFacilityPending,
  updateFacilityError,
  deleteFacilityPending,
  deleteFacilitySuccess,
  deleteFacilityError,
} from "./actions";

export const FacilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(FacilityReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const getFacilitys = async () => {
    dispatch(getFacilitysPending());
    const endpoint = `/api/services/app/Facility/GetAll?MaxResultCount=1000`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getFacilitysSuccess(response.data.result.items));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getFacilitysError());
      });
  };

  const getFacility = async (id: string) => {
    dispatch(getFacilityPending());
    const endpoint = `/Facilitys/${id}`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getFacilitySuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getFacilityError());
      });
  };

  const createFacility = async (Facility: IFacility) => {
    dispatch(createFacilityPending());
    const endpoint = `/api/services/app/Facility/Create`;
    await instance
      .post(endpoint, Facility)
      .then((response) => {
        dispatch(createFacilitySuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(createFacilityError());
      });
  };

  const updateFacility = async (Facility: IFacility) => {
    dispatch(updateFacilityPending());
    const endpoint = `/api/services/app/Facility/Update`;
    await instance
      .put(endpoint, Facility)
      .then((response) => {
        dispatch(updateFacilitySuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(updateFacilityError());
      });
  };

  const deleteFacility = async (id: string) => {
    dispatch(deleteFacilityPending());
    const endpoint = `/api/services/app/Facility/Delete?Id=${id}`;
    await instance
      .delete(endpoint)
      .then((response) => {
        dispatch(deleteFacilitySuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(deleteFacilityError());
      });
  };

  return (
    <FacilityStateContext.Provider value={state}>
      <FacilityActionContext.Provider
        value={{
          getFacilitys,
          getFacility,
          createFacility,
          updateFacility,
          deleteFacility,
        }}
      >
        {children}
      </FacilityActionContext.Provider>
    </FacilityStateContext.Provider>
  );
};

export const useFacilityState = () => {
  const context = useContext(FacilityStateContext);
  if (!context) {
    throw new Error("useFacilityState must be used within a FacilityProvider");
  }
  return context;
};

export const useFacilityActions = () => {
  const context = useContext(FacilityActionContext);
  if (!context) {
    throw new Error(
      "useFacilityActions must be used within a FacilityProvider"
    );
  }
  return context;
};
