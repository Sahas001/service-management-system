import { useEffect, useReducer } from "react";
import { Service } from "../types/type";
import axios from "axios";

enum ActionType {
  LOADING,
  SUCCESS,
  FAILED,
}

type State = {
  data: Service | null;
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
  payload: Service;
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

export function useService(id: string) {
  const [{ data, loading, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    fetchService(id);
  }, []);

  const fetchService = async (id: string) => {
    dispatch({ type: ActionType.LOADING });
    try {
      const response = await axios.get(`http://localhost:8080/product/${id}`);
      const productsData = response.data;
      dispatch({ type: ActionType.SUCCESS, payload: productsData });
    } catch (error) {
      dispatch({ type: ActionType.FAILED, payload: "Something went wrong" });
    }
  };
  return { data, loading, error };
}
