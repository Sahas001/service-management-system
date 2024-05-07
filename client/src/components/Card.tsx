import { useNavigate } from "react-router-dom";

type CardProps = {
  id: string;
  name: string;
  description?: string;
  organization?: string;
  onCLick?: () => void;
};

export function Card({ id, name, description, organization }: CardProps) {
  const navigate = useNavigate();

  return (
    <div className="max-w-sm p-6 bg-white border rounded-lg shadow mb-7">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700">
        {description ? description : organization}
      </p>
      <a
        href="#"
        onClick={() => navigate(`/home/service/${id}`)}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 "
      >
        Read more
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </a>
    </div>
  );
}
