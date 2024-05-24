import { useContext, useState } from "react";
import { Input } from "../components/Input";
import { AuthFormContext } from "../pages/Login";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "../types/type";
import useAuth from "../hooks/useAuth";
import { UserContext } from "../UserContext";

export function CreateService() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<
    Inputs
  >();
  const { userRole } = useContext(UserContext);

  const { addService } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async (
    { serviceName, description, price },
  ) => {
    try {
      if (userRole === "Staff") {
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
    reset();
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="p-20 self-center mt-2 w-full max-w-md rounded-md">
        <h2 className="text-4xl mb-8 font-semibold">
          {userRole === "Staff" ? "Create Service" : "Request Service"}
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
            {userRole === "Staff" && (
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
