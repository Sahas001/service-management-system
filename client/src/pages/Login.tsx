import { createContext, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { Input } from "../components/Input";
import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { Inputs } from "../types/type";
import { useNavigate } from "react-router-dom";

enum Variant {
  SIGN_UP,
  LOG_IN,
}

export type AuthFormContextType = {
  register: UseFormRegister<Inputs> | null;
  errors: FieldErrors<Inputs>;
};

export const AuthFormContext = createContext<AuthFormContextType>({
  register: null,
  errors: {},
});

export function Login() {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<
    Inputs
  >();
  const [variant, setVariant] = useState(Variant.LOG_IN);
  const selectRef = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();

  function handleChangeVariant() {
    if (variant === Variant.LOG_IN) setVariant(Variant.SIGN_UP);
    else setVariant(Variant.LOG_IN);
  }

  const onSubmit: SubmitHandler<Inputs> = (
    { email, password, username },
  ) => {
    const type = selectRef.current?.value;
    try {
      if (variant === Variant.SIGN_UP) {
        console.log({ email, password, username, type });
      } else {
        console.log({ email, password, type });
      }
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full w-screen">
      <Navbar />
      <div className="flex justify-center items-center h-full">
        <div className="bg-black bg-opacity-70 p-16 self-center mt-20 w-full max-w-md rounded-md">
          <h2 className="text-white text-4xl mb-8 font-semibold">
            {variant == Variant.SIGN_UP ? "Sign up" : "Log in"}
          </h2>

          <AuthFormContext.Provider value={{ register, errors }}>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {variant === Variant.SIGN_UP && (
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                />
              )}
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
              />
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                validate={variant === Variant.SIGN_UP
                  ? () => {
                    const password = getValues("password");
                    if (password.length < 8) {
                      return "Password must be more than 8 characters";
                    }
                    return true;
                  }
                  : undefined}
              />

              <select
                id="type"
                name="type"
                className="block rounded-md p-2.5 mb-2 w-full text-md focus:outline-none focus:ring-0 peer invalid:border-b-1 text-gray-900"
                ref={selectRef}
              >
                <option value="STA">Staff</option>
                <option value="CUS">Customer</option>
              </select>

              <input
                type="submit"
                className="bg-red-400 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700"
              />
            </form>
          </AuthFormContext.Provider>

          {variant === Variant.LOG_IN
            ? (
              <p
                className="text-neutral-500 mt-12"
                onClick={handleChangeVariant}
              >
                <span className="text-white ml-1 hover:underline cursor-pointer">
                  Create an Account?
                </span>
              </p>
            )
            : (
              <p
                className="text-neutral-500 mt-12"
                onClick={handleChangeVariant}
              >
                <span className="text-white ml-1 hover:underline cursor-pointer">
                  Already have an account?
                </span>
              </p>
            )}
        </div>
      </div>
    </div>
  );
}
