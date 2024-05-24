import { useNavigate, useParams } from "react-router-dom";
import { useService } from "../hooks/useService";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { User } from "../components/Navbar";
import { useState } from "react";

export default function ServicePage() {
  const params = useParams() as { id: string };
  const { data, loading, error } = useService(params.id);
  const navigate = useNavigate();
  const [user, setUser] = useState("Customer");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>{error}</div>;
  }

  const { name, description, price } = data;

  return (
    <div className="h-screen w-screen">
      <nav className="fixed w-full p-4 z-10 flex justify-center items-center gap-8 bg-gray-50">
        <ArrowLeftIcon
          className="w-8 cursor-pointer transition mr-5"
          onClick={() => navigate("/home")}
        />
        <p className="text-3xl font-bold ml-5 mr-10">
          <span className="font-light">Service Name: {name}</span>
        </p>
      </nav>
      <div className="flex justify-center items-center h-full">
        <div>
          <div className="max-w-sm p-10 bg-white rounded-lg mb-7 border shadow ">
            <p className="mb-3 font-semibold text-xl text-gray-700">
              {description}
            </p>
            <p className="text-3xl">Price: {price}</p>
          </div>

          {user === "Customer" &&
            (
              <button
                type="submit"
                className="bg-red-400 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700"
              >
                Subscribe
              </button>
            )}
        </div>
      </div>
    </div>
  );
}
