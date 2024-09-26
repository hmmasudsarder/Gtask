import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../components/share/Profile";
import Login from "../pages/Login/Login";
import DashboardUser from "../pages/Home/DashboardUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: (
      <div className="h-screen flex items-center justify-center text-7xl font-bold">
        404 Page IS Not Found!
      </div>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/product",
        element: <Profile />,
      },
      {
        path: "/user",
        element: <DashboardUser />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
