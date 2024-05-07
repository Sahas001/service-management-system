import { useServiceList } from "../hooks/useServiceList";
import { Card } from "./Card";

export function BrowseService() {
  const { data, loading, error } = useServiceList();

  return (
    <div className="flex-col justify-center items-center h-full">
      <div className="p-16 flex-1 mt-2 w-full max-w-md rounded-md">
        <h2 className="text-4xl mb-8 font-semibold">
          Services
        </h2>
        {error && <p>{error}</p>}
        {data && data.map((data) => (
          <ul key={data.id}>
            <li>
              <Card
                id={data.id}
                name={data.name}
                description={data.description}
              />
            </li>
          </ul>
        ))}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}
