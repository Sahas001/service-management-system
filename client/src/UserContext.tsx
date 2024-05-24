import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

type UserContextType = {
  userRole: string | null;
  setUserRole: Dispatch<SetStateAction<string | null>>;
};

export const UserContext = createContext<UserContextType>({
  userRole: null,
  setUserRole: () => null,
});

export function UserProvider({ children }: Props) {
  const [userRole, setUserRole] = useState<string | null>("Customer");

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
}
