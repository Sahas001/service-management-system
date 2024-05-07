import { useCustomerList } from "../hooks/useCustomerList";
import { Card } from "./Card";

export function BrowseCustomer() {
  const { data, loading, error } = useCustomerList();
  console.log(data);
  return (
    <div className="flex-col justify-center items-center h-full">
      <div className="p-20 flex-1 mt-2 w-full max-w-md rounded-md">
        <h2 className="text-4xl mb-8 font-semibold">
          Customers
        </h2>
        {error && <p>{error}</p>}
        {data && data.map((data) => (
          <ul key={data.id}>
            <li>
              <Card
                id={data.id}
                name={data.name}
                organization={data.org}
              />
            </li>
          </ul>
        ))}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}
