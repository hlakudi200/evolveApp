import { getAxiosInstace } from "@/utils/axios-instance";
import {
  INITIAL_STATE,
  AssociationActionContext,
  AssociationStateContext,
} from "./context";
import { IAssociation } from "../interfaces";
import { AssociationReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  getAssociationsError,
  getAssociationsPending,
  getAssociationsSuccess,
  getAssociationError,
  getAssociationPending,
  getAssociationSuccess,
  createAssociationPending,
  createAssociationError,
  updateAssociationSuccess,
  createAssociationSuccess,
  updateAssociationPending,
  updateAssociationError,
  deleteAssociationPending,
  deleteAssociationSuccess,
  deleteAssociationError,
} from "./actions";

export const AssociationProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AssociationReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const getAssociations = async () => {
    dispatch(getAssociationsPending());
    const endpoint = `/api/services/app/TaxiAssociation/GetAllInclude`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getAssociationsSuccess(response.data.result));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getAssociationsError());
      });
  };

  const getAssociation = async (id: string) => {
    dispatch(getAssociationPending());
    const endpoint = `/Associations/${id}`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getAssociationSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getAssociationError());
      });
  };

  const createAssociation = async (Association: IAssociation) => {
    dispatch(createAssociationPending());
    const endpoint = `/api/services/app/Association/Create`;
    await instance
      .post(endpoint, Association)
      .then((response) => {
        dispatch(createAssociationSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(createAssociationError());
      });
  };

  const updateAssociation = async (Association: IAssociation) => {
    dispatch(updateAssociationPending());
    const endpoint = `/api/services/app/Association/Update`;
    await instance
      .put(endpoint, Association)
      .then((response) => {
        dispatch(updateAssociationSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(updateAssociationError());
      });
  };

  const deleteAssociation = async (id: string) => {
    dispatch(deleteAssociationPending());
    const endpoint = `https://fakestoreapi.com/Associations/${id}`;
    await instance
      .delete(endpoint)
      .then((response) => {
        dispatch(deleteAssociationSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(deleteAssociationError());
      });
  };

  return (
    <AssociationStateContext.Provider value={state}>
      <AssociationActionContext.Provider
        value={{
          getAssociations,
          getAssociation,
          createAssociation,
          updateAssociation,
          deleteAssociation,
        }}
      >
        {children}
      </AssociationActionContext.Provider>
    </AssociationStateContext.Provider>
  );
};

export const useAssociationState = () => {
  const context = useContext(AssociationStateContext);
  if (!context) {
    throw new Error("useAssociationState must be used within a AssociationProvider");
  }
  return context;
};

export const useAssociationActions = () => {
  const context = useContext(AssociationActionContext);
  if (!context) {
    throw new Error("useAssociationActions must be used within a AssociationProvider");
  }
  return context;
};
