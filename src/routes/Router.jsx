import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/home";


const router = createBrowserRouter([
    {
        path: "",
        element: <Home/>,
      },

]);

export default function Router() {
  return <RouterProvider router={router} />;
}