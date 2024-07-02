import { useEffect, useReducer } from "react";
import { Customer } from "../types/type";
import axios from "axios";

enum ActionType {
  LOADING,
  SUCCESS,
  FAILED,
}

type State = {
  data: Customer | null;
  error: string | null;
  loading: boolean;
};

const initialState: State = {
  data: null,
  error: null,
  loading: false,
};

type Action = { type: ActionType.LOADING } | {
  type: ActionType.SUCCESS;
  payload: Customer;
} | { type: ActionType.FAILED; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionType.FAILED:
      return {
        loading: false,
        error: action.payload,
        data: null,
      };
    case ActionType.SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
      };

    default:
      return initialState;
  }
}

export function useCustomer(id: string) {
  const [{ data, loading, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    fetchCustomer(id);
  }, []);

  const fetchCustomer = async (id: string) => {
    dispatch({ type: ActionType.LOADING });
    try {
      const response = await axios.get(`http://localhost:8080/customer/${id}`);
      const customersData = response.data;
      dispatch({ type: ActionType.SUCCESS, payload: customersData });
    } catch (error) {
      dispatch({ type: ActionType.FAILED, payload: "Something went wrong" });
    }
  };
  return { data, loading, error };
}
