import About from "@/pages/About";
import AllProduct from "@/pages/AllProduct";
import Checkout from "@/pages/Checkout";
import Contact from "@/pages/Contact";
import AddProduct from "@/pages/dashboard/admin/AddProduct";
import AllProductList from "@/pages/dashboard/admin/AllProductList";
import ProductUpdate from "@/pages/dashboard/admin/ProductUpdate";
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
        path: "/allProduct/:id",
        element: <ProductDetails />,
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
