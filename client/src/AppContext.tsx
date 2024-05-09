import { createContext, ReactNode, useContext, useReducer } from "react";
import { User } from "./components/Navbar";

type State = {
  user: undefined | User;
  permissions: undefined | string[];
  loading: boolean;
};

const initialState: State = {
  user: undefined,
  permissions: undefined,
  loading: false,
};

type Action =
  | {
    type: "authenticate";
  }
  | {
    type: "authenticated";
    user: User | undefined;
  }
  | {
    type: "authorize";
  }
  | {
    type: "authorized";
    permissions: string[];
  };

type AppContext = State & {
  dispatch: React.Dispatch<Action>;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "authenticate":
      return { ...state, loading: true };
    case "authenticated":
      return { ...state, loading: false, user: action.user };
    case "authorize":
      return { ...state, loading: true };
    case "authorized":
      return { ...state, loading: false, permissions: action.permissions };
    default:
      return state;
  }
}

type Props = {
  children: ReactNode;
};

export function AppProvider({ children }: Props) {
  const [{ user, permissions, loading }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  return (
    <AppContext.Provider value={{ user, permissions, loading, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

const AppContext = createContext<AppContext>({
  ...initialState,
  dispatch: () => {},
});

export const useAppContext = () => useContext(AppContext);
