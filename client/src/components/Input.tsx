// import { Service } from "../pages/Service";

import { useContext } from "react";
import { AuthFormContext } from "../pages/Login";
import { Inputs } from "../types/type";

type InputProps = {
  id: string;
  type?: string;
  placeholder: string;
  name: keyof Inputs;
  validate?: (text: string) => string | true;
};

export function Input({ id, type, placeholder, name, validate }: InputProps) {
  const { register, errors } = useContext(AuthFormContext);
  if (!register) return null;
  return (
    <div className="relative">
      <input
        className="block rounded-md px-6 pt-6 pb-1 mb-2 w-full text-md appearance-none focus:outline-none focus:ring-0 peer invalid:border-b-1"
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(name, { required: true, validate })}
      />
      {errors[name]?.type === "required" && (
        <p className="text-red-600">This field is required</p>
      )}
      {errors[name]?.type === "validate" && (
        <p className="text-red-600">{errors[name]?.message}</p>
      )}
    </div>
  );
}
