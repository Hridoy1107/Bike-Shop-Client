import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/About";
import Root from "./Root";
import ErrorPage from "./ErrorPage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import AdminDashboard from "../private/AdminDashboard";
import UserDashboard from "../private/UserDashboard";
import DashboardRedirect from "./DashboardRedirect";
import Dashboard from "../private/Dashboard";
import Profile from "../private/dashboard/Profile";
import ManageUsers from "../private/admin/ManageUsers";
import ManageProducts from "../private/admin/ManageProducts";
import PublicAllBikes from "../pages/PublicAllBikes";
import BikeDetails from "../pages/BikeDetails";
import CheckOut from "../private/CheckOut";
import Payment from "../private/Payment";
import MyOrders from "../private/MyOrders";
import ManageOrders from "../private/admin/ManageOrders";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <App></App>,
      },
      { path: "/about", element: <About></About> },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/all-products",
        element: <PublicAllBikes></PublicAllBikes>,
      },
      {
        path: "/details/:bikeId",
        element: <BikeDetails></BikeDetails>,
      },
      {
        path: "/checkout/:bikeId",
        element: <CheckOut></CheckOut>,
      },
      {
        path: "/payment-verification",
        element: <Payment></Payment>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <DashboardRedirect>
        <Dashboard></Dashboard>
      </DashboardRedirect>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "admin",
        element: (
          <PrivateRoute role={"admin"}>
            <AdminDashboard></AdminDashboard>
          </PrivateRoute>
        ),
        children: [
          {
            path: "profile",
            element: <Profile></Profile>,
          },
          {
            path: "manage-users",
            element: <ManageUsers></ManageUsers>,
          },
          {
            path: "manage-products",
            element: <ManageProducts></ManageProducts>,
          },
          {
            path: "manage-orders",
            element: <ManageOrders></ManageOrders>,
          },
        ],
      },
      {
        path: "user",
        element: (
          <PrivateRoute role={"customer"}>
            <UserDashboard></UserDashboard>
          </PrivateRoute>
        ),
        children: [
          {
            path: "profile",
            element: <Profile></Profile>,
          },
          {
            path: "my-orders",
            element: <MyOrders></MyOrders>,
          },
        ],
      },
    ],
  },
]);

export default routes;
