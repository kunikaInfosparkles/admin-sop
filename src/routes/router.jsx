import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/layout/layout";
import AdminLayout from "../components/layout/adminLayout";
import { RoutesArray } from "./routeArray";
import { PrivateRoute, PublicRoute } from "./authRoute";
import { Login } from "../components";
import { Dashboard, ExampleFormWithValidation } from "../pages";

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
        {
          path: "/admin",
          element: <AdminLayout />,
          children: [
            { path: "", element: <Dashboard /> },
            { path: "forms", element: <ExampleFormWithValidation /> },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
