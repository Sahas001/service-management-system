import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import { Login } from "./pages/Login.tsx";
import { MainPage } from "./components/MainPage.tsx";
import ServicePage from "./pages/ServicePage.tsx";
import CustomerPage from "./pages/CustomerPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/home",
        element: <MainPage />,
      },
      {
        path: "/home/service/:id",
        element: <ServicePage />,
      },
      {
        path: "/home/customer/:id",
        element: <CustomerPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
