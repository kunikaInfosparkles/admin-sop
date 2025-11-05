import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/layout/layout";
import { RoutesArray } from "./routeArray";
import { PrivateRoute, PublicRoute } from "./authRoute";
import { Login } from "../components";

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <PublicRoute />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },

    {
      element: <PrivateRoute />,
      children: [
        {
          path: "/",
          element: <Layout />, 
          children: RoutesArray,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
