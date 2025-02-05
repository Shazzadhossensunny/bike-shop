import About from "@/pages/About";
import AllProduct from "@/pages/AllProduct";
import CartPage from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Contact from "@/pages/Contact";
import AddProduct from "@/pages/dashboard/admin/AddProduct";
import AllOrderList from "@/pages/dashboard/admin/AllOrderList";
import AllProductList from "@/pages/dashboard/admin/AllProductList";
import AllUserList from "@/pages/dashboard/admin/AllUserList";
import ProductUpdate from "@/pages/dashboard/admin/ProductUpdate";
import SingleOrderDetails from "@/pages/dashboard/admin/SingleOrderDetails";
import MyOrders from "@/pages/dashboard/user/MyOrders";
import MyProfile from "@/pages/dashboard/user/MyProfile";
import OrderDetails from "@/pages/dashboard/user/OrderDetails";
import Error from "@/pages/Error";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import PaymentSuccess from "@/pages/PaymentSuccess";
import ProductDetails from "@/pages/ProductDetails";
import Register from "@/pages/Register";
import Dashboard from "@/root/Dashboard";
import Root from "@/root/Root";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allProduct",
        element: <AllProduct />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/payment-success/:orderId",
        element: <PaymentSuccess />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      // admin
      {
        path: "all-users",
        element: <AllUserList />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "products",
        element: <AllProductList />,
      },
      {
        path: "products/:id",
        element: <ProductUpdate />,
      },
      {
        path: "all-order",
        element: <AllOrderList />,
      },
      {
        path: "all-order/:id",
        element: <SingleOrderDetails />,
      },
      //users
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "my-orders/:id",
        element: <OrderDetails />,
      },
      {
        path: "profile",
        element: <MyProfile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);

export default router;
