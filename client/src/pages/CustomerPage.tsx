import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useCustomer } from "../hooks/useCustomer";

export default function ServicePage() {
  const params = useParams() as { id: string };
  const navigate = useNavigate();
  const { data, loading, error } = useCustomer(params.id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>{error}</div>;
  }

  const { id, name, org } = data;
  const description = "lorem epsum dolor sit amet";

  return (
    <div className="h-screen w-screen">
      <nav className="fixed w-full p-4 z-10 flex justify-center items-center gap-8 bg-gray-50">
        <ArrowLeftIcon
          className="w-8 cursor-pointer transition mr-5"
          onClick={() => navigate("/home")}
        />
        <p className="text-3xl font-bold ml-5 mr-10">
          <span className="font-light">
            <b>{id}</b> Customer Name: {name}
          </span>
        </p>
      </nav>
      <div className="flex justify-center items-center h-full">
        <div>
          <div className="max-w-sm p-10 bg-white rounded-lg mb-7 border shadow ">
            <p className="mb-3 font-semibold text-xl text-gray-700">
              {description}
            </p>
            <p className="text-3xl">{org}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
