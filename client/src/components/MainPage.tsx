import { useState } from "react";
import { CreateService } from "../components/CreateService";
import Navbar from "./Navbar";
import { Sidebar } from "./Sidebar";
import { BrowseService } from "./BrowseService";
// import { useNavigate } from "react-router-dom";

enum Components {
  CREATE,
  BROWSE,
  CUSTOMERS,
}

export function MainPage() {
  const [component, setComponent] = useState(Components.BROWSE);
  return (
    <div>
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        <div className="p-4 sm:ml-64 h-screen mt-16">
          <div className="p-4 h-full border-2 border-gray-200 border-dashed rounded-lg flex justify-center item-center">
            <div className="flex justify-center items-center ">
              <div className="flex items-center justify-center rounded h-full bg-gray-100 p-5 w-max">
                {component === Components.CREATE && <CreateService />}
                {component === Components.BROWSE && <BrowseService />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
