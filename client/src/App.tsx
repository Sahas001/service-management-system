import { Outlet } from "react-router-dom";
import { AppProvider } from "./AppContext";

function App() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
}

export default App;
