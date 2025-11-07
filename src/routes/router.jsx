
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AdminLayout from "../components/layout/adminLayout";
import { RoutesArray } from "./routeArray";
import { PrivateRoute, PublicRoute } from "./authRoute";
import { Login } from "../components";
import { AuthProvider, useAuth } from "../context/authContext";

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
          path: "/admin",
          element: <AdminLayout />,
          children: RoutesArray,
        },
      ],
    },
    // Fallback route - redirect to login or dashboard based on auth status
    {
      path: "/",
      element: <NavigateToAppropriateRoute />,
    },
    // 404 route
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

// Helper component for root path
const NavigateToAppropriateRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <Navigate to="/admin" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

// 404 Component
const NotFound = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      {isAuthenticated ? (
        <Navigate to="/admin" replace />
      ) : (
        <Navigate to="/login" replace />
      )}
    </div>
  );
};

export default Router;