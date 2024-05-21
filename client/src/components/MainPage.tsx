import { useState } from "react";
import { CreateService } from "../components/CreateService";
import Navbar from "./Navbar";
import { Sidebar } from "./Sidebar";
import { BrowseService } from "./BrowseService";
import { BrowseCustomer } from "./BrowseCustomer";
import { useAppContext } from "../AppContext";
// import { useNavigate } from "react-router-dom";

enum Components {
  CREATE,
  BROWSE,
  CUSTOMERS,
}

export function MainPage() {
  const [component, setComponent] = useState(Components.CREATE);
  const { user } = useAppContext();

  console.log(user);

  if (!user) {
    console.log("No User");
    return <p>No User</p>;
  }

  const handleChildData = (data: string) => {
    if (data === "create") {
      setComponent(Components.CREATE);
    } else if (data === "browse") {
      setComponent(Components.BROWSE);
    } else {
      setComponent(Components.CUSTOMERS);
    }
  };

  return (
    <div>
      <Navbar type={user} />
      <div className="flex flex-row ">
        <Sidebar selectedState={handleChildData} />
        <div className="p-4 sm:ml-64 h-screen mt-16">
          <div className="p-4 h-full border-2 border-gray-200 border-dashed rounded-lg flex justify-center item-center">
            <div className="flex justify-center items-center ">
              <div className="flex overflow-auto items-center justify-center rounded h-full bg-gray-100 p-5">
                {component === Components.CREATE && <CreateService />}
                {component === Components.BROWSE && <BrowseService />}
                {component === Components.CUSTOMERS && <BrowseCustomer />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
