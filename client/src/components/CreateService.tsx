import { useState } from "react";
import { Input } from "../components/Input";
import { AuthFormContext } from "../pages/Login";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "../types/type";

enum Variant {
  CREATE,
  REQUEST,
}

export function CreateService() {
  const [variant, setVariant] = useState(Variant.CREATE);
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<
    Inputs
  >();

  const onSubmit: SubmitHandler<Inputs> = (
    { serviceName, description, price },
  ) => {
    if (variant === Variant.CREATE) {
      console.log({ serviceName, description, price });
      return { serviceName, description, price };
    } else {
      console.log({ serviceName, description });
      return { serviceName, description };
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="p-16 self-center mt-2 w-full max-w-md rounded-md">
        <h2 className="text-4xl mb-8 font-semibold">
          {variant === Variant.CREATE ? "Create Service" : "Request Service"}
        </h2>
        <AuthFormContext.Provider value={{ register, errors }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="name"
              name="serviceName"
              type="text"
              placeholder="Name"
            />
            <Input
              id="description"
              name="description"
              type="text"
              placeholder="Description"
            />
            {variant === Variant.CREATE && (
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="Price"
              />
            )}
            <input
              type="submit"
              className="bg-red-400 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700"
            />
          </form>
        </AuthFormContext.Provider>
      </div>
    </div>
  );
}
