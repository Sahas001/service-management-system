import { useState } from "react";
import Navbar from "../components/Navbar";
import { Input } from "../components/Input";

enum Variant {
  SIGN_UP,
  LOG_IN,
}

export function Login() {
  const [variant, setVariant] = useState(Variant.LOG_IN);

  function handleChangeVariant() {
    if (variant === Variant.LOG_IN) setVariant(Variant.SIGN_UP);
    else setVariant(Variant.LOG_IN);
  }

  return (
    <div className="h-full w-screen">
      <Navbar />
      <div className="flex justify-center items-center h-full">
        <div className="bg-black bg-opacity-70 p-16 self-center mt-20 w-full max-w-md rounded-md">
          <h2 className="text-white text-4xl mb-8 font-semibold">
            {variant == Variant.SIGN_UP ? "Sign up" : "Log in"}
          </h2>

          <form
            className="flex flex-col gap-4"
            onSubmit={() => console.log("Submitted")}
          >
            {variant === Variant.SIGN_UP && (
              <Input id="username" type="text" placeholder="Username" />
            )}
            <Input
              id="email"
              type="email"
              placeholder="Email"
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
            />

            <select
              id="type"
              className="block rounded-md p-2.5 mb-2 w-full text-md focus:outline-none focus:ring-0 peer invalid:border-b-1 text-gray-900"
            >
              <option selected>Staff</option>
              <option>Customer</option>
            </select>

            <input
              type="submit"
              className="bg-red-400 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700"
            />
          </form>

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
