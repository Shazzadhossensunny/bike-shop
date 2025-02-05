import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { USER_ROLE } from "@/constants/user";
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
    element: <Root />,
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
        element: (
          <ProtectedRoute role={[USER_ROLE.admin, USER_ROLE.customer]}>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute role={USER_ROLE.customer}>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute role={USER_ROLE.customer}>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/payment-success/:orderId",
        element: (
          <ProtectedRoute role={USER_ROLE.customer}>
            <PaymentSuccess />
          </ProtectedRoute>
        ),
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
    element: (
      <ProtectedRoute role={[USER_ROLE.admin, USER_ROLE.customer]}>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      // admin
      {
        path: "all-users",
        element: (
          <ProtectedRoute role={USER_ROLE.admin}>
            <AllUserList />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <ProtectedRoute role={USER_ROLE.admin}>
            <AddProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute role={USER_ROLE.admin}>
            <AllProductList />
          </ProtectedRoute>
        ),
      },
      {
        path: "products/:id",
        element: (
          <ProtectedRoute role={USER_ROLE.admin}>
            <ProductUpdate />
          </ProtectedRoute>
        ),
      },
      {
        path: "all-order",
        element: (
          <ProtectedRoute role={USER_ROLE.admin}>
            <AllOrderList />
          </ProtectedRoute>
        ),
      },
      {
        path: "all-order/:id",
        element: (
          <ProtectedRoute role={USER_ROLE.admin}>
            <SingleOrderDetails />
          </ProtectedRoute>
        ),
      },
      //users
      {
        path: "my-orders",
        element: (
          <ProtectedRoute role={USER_ROLE.customer}>
            <MyOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-orders/:id",
        element: (
          <ProtectedRoute role={USER_ROLE.customer}>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute role={USER_ROLE.customer}>
            <MyProfile />
          </ProtectedRoute>
        ),
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
