export type Inputs = {
  email: string;
  password: string;
  username: string;
  type: string;
  serviceName: string;
  description: string;
  price: string;
};

export type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export type Customer = {
  id: number;
  name: string;
  org: string;
};
