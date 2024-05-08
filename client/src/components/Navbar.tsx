import { useState } from "react";
import logo from "../assets/customer-service.png";

export enum User {
  STAFF,
  CUSTOMER,
  NULL,
}

export default function Navbar() {
  const [user, setUser] = useState(User.NULL);
  return (
    <nav className="w-full z-40 fixed rounded-lg">
      <div className="px-16 py-5 flex bg-gray-50 items center">
        <img className="h-8 cursor-pointer" src={logo} alt="logo" />
        <div className="flex gap-7 ml-8 mr-auto">
          <div className="cursor-pointer">
            <p className="text-xl font-bold">सेवा</p>
          </div>
        </div>
        <div className="cursor-pointer">
          <p className="text-xl font-bold cursor-pointer">
            {user === User.STAFF && (
              "Staff Control Panel"
            )}
            {user === User.CUSTOMER && (
              "Customer Control Panel"
            )}
          </p>
        </div>
        <div className="cursor-pointer ml-auto">
          <p className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center">
            Logout
          </p>
        </div>
      </div>
    </nav>
  );
}
