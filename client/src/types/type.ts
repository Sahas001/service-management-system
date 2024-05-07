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
  id: string;
  name: string;
  description: string;
  price: number;
};

export type Customer = {
  id: string;
  name: string;
  org: string;
};
