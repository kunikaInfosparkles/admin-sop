import { Home } from "../pages";
import { Dashboard, ExampleFormWithValidation, FileUploadExample, TableExample } from "../pages";

export const RoutesArray = [
  { path: "", element: <Dashboard /> },
  { path: "home", element: <Home /> },
  { path: "forms", element: <ExampleFormWithValidation /> },
  { path: "uploads", element: <FileUploadExample /> },
  { path: "users", element: <TableExample /> },
];
