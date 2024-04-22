// import { Service } from "../pages/Service";

type InputProps = {
  id: string;
  type: string;
  placeholder: string;
};
export function Input({ id, type, placeholder }: InputProps) {
  return (
    <div className="relative">
      <input
        className="block rounded-md px-6 pt-6 pb-1 mb-2 w-full text-md appearance-none focus:outline-none focus:ring-0 peer invalid:border-b-1"
        id={id}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
