import { useState } from "react";
import { Input } from "../components/Input";
import { AuthFormContext } from "../pages/Login";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "../types/type";
import useAuth from "../hooks/useAuth";

enum Variant {
  CREATE,
  REQUEST,
}

export function CreateService() {
  const [variant, setVariant] = useState(Variant.CREATE);
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<
    Inputs
  >();

  const { addService } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async (
    { serviceName, description, price },
  ) => {
    try {
      if (variant === Variant.CREATE) {
        await addService({
          name: serviceName,
          description,
          price: parseInt(price),
        });
        console.log("submitted");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="p-20 self-center mt-2 w-full max-w-md rounded-md">
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
