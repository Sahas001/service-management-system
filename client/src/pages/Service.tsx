import { useState } from "react";
import { Input } from "../components/Input";

export type Service = {
  name: string;
  description: string;
  price?: number;
};

enum Variant {
  CREATE,
  REQUEST,
}

export function Service() {
  const [variant, setVariant] = useState(Variant.CREATE);
  return (
    <div className="flex justify-center items-center h-full">
      <div className="p-16 self-center mt-2 w-full max-w-md rounded-md">
        <h2 className="text-4xl mb-8 font-semibold">
          {variant === Variant.CREATE ? "Create Service" : "Request Service"}
        </h2>
        <form>
          <Input id="name" type="text" placeholder="Name" />
          <Input id="description" type="text" placeholder="Description" />
          <Input id="price" type="number" placeholder="Number" />
          <input
            type="submit"
            className="bg-red-400 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700"
          />
        </form>
      </div>
    </div>
  );
}
