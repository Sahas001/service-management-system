import axios from "axios";

export default function useAuth() {
  const addService = async (
    { name, description, price }: {
      name: string;
      description: string;
      price: number;
    },
  ) => {
    const response = await axios.post("http://localhost:8080/products", {
      name,
      description,
      price,
    });
    return response.data;
  };

  return { addService };
}
