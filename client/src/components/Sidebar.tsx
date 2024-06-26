import { useContext, useState } from "react";
import { UserContext } from "../UserContext";

type select = {
  selectedState: (text: string) => void;
};

export function Sidebar({ selectedState }: select) {
  const { userRole } = useContext(UserContext);
  const [state, setState] = useState("browse");
  function handleCreateServiceClick() {
    selectedState("create");
    setState("create");
  }

  function handleBrowseServiceClick() {
    selectedState("browse");
    setState("browse");
  }

  function handleBrowseCustomerClick() {
    selectedState("customer");
    setState("customer");
  }

  return (
    <aside
      id="separator-sidebar"
      className="left-0 w-64 h-screen relative mt-20"
    >
      <div className="p-4 h-screen border-2 border-dashed border-gray-200 rounded-lg">
        <div className="h-full p-4 px-3 py-4 overflow-y-auto bg-gray-100 rounded-lg">
          <ul className="space-y-2 font-medium my-10">
            <li>
              <a
                onClick={handleCreateServiceClick}
                className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 ${
                  state === "create" ? "bg-gray-200" : null
                }`}
              >
                <p className="flex-1 ms-3 whitespace-nowrap">
                  {userRole === "Staff" ? "Create Service" : "Request Service"}
                </p>
              </a>
            </li>
            <li>
              <a
                onClick={handleBrowseServiceClick}
                className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 ${
                  state === "browse" ? "bg-gray-200" : null
                }`}
              >
                <p className="flex-1 ms-3 whitespace-nowrap">
                  Browse Services
                </p>
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={handleBrowseCustomerClick}
                className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 ${
                  state === "customer" ? "bg-gray-200" : null
                }`}
              >
                <p className="flex-1 ms-3 whitespace-nowrap">
                  Customers
                </p>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200"
              >
                <p className="flex-1 ms-3 whitespace-nowrap">About</p>
              </a>
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-200"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                </svg>
                <p className="ms-3">Documentation</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
