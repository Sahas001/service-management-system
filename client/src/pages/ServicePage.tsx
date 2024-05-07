import { useParams } from "react-router-dom";
import { useService } from "../hooks/useService";

export default function ServicePage() {
  const params = useParams() as { id: string };
  const { data, loading, error } = useService(params.id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>{error}</div>;
  }

  const { name, description } = data;

  return (
    <div className="max-w-sm p-6 bg-white border rounded-lg shadow mb-7">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700">
        {description}
      </p>
    </div>
  );
}
