import { useServiceList } from "../hooks/useServiceList";
import { ServiceCard } from "./ServiceCard";

export function BrowseService() {
  const { data, loading, error } = useServiceList();
  console.log(data);
  return (
    <div className="flex justify-center items-center h-full">
      <div className="p-16 self-center mt-2 w-full max-w-md rounded-md">
        <h2 className="text-4xl mb-8 font-semibold">
          Services
        </h2>
        {error && <p>{error}</p>}
        {data && data.map((data) => (
          <ul>
            <li
              key={data.id}
            >
              <ServiceCard
                id={data.id}
                name={data.name}
                description={data.description}
                price={data.price}
              />
            </li>
          </ul>
        ))}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}
