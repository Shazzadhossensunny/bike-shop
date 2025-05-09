import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";

import { useAppDispatch } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import { Lock, Mail, User } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
type Role = "admin" | "customer";
// Predefined credentials for different roles
const roleCredentials: Record<Role, { email: string; password: string }> = {
  admin: {
    email: "sunny@gmail.com",
    password: "123456",
  },
  customer: {
    email: "ayaan@gmail.com",
    password: "123456",
  },
};

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      const result = await login(userInfo).unwrap();
      const { userId, email, role } = verifyToken(
        result.data.accessToken
      ) as TUser;
      const user = { userId, role };

      dispatch(setUser({ user, email, token: result.data.accessToken }));
      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Something went wrong!");
    }
    reset();
  };

  // Function to fill form with role credentials
  const fillCredentials = (role: Role) => {
    const credentials = roleCredentials[role];
    setValue("email", credentials.email);
    setValue("password", credentials.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-primary text-center">
          Login to BikeShop
        </h2>

        {/* Quick Login Buttons */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2 text-center">Quick Login:</p>
          <div className="flex space-x-4 justify-center">
            <button
              type="button"
              onClick={() => fillCredentials("admin")}
              className="flex items-center justify-center px-4 py-2 rounded-md border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-sm transition-colors"
            >
              <User className="mr-2 h-4 w-4" />
              Admin
            </button>
            <button
              type="button"
              onClick={() => fillCredentials("customer")}
              className="flex items-center justify-center px-4 py-2 rounded-md border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm transition-colors"
            >
              <User className="mr-2 h-4 w-4" />
              Customer
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-neutral font-medium mb-2"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-gray-400 h-5 w-5" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="
                pl-10
                pr-4
                py-2
                block
                w-full
                rounded-md
                border
                border-gray-300
                shadow-sm
                focus:border-blue-500
                focus:ring
                focus:ring-blue-500
                focus:ring-opacity-50
                transition-all
                duration-300
                text-gray-900
                placeholder-gray-400
              "
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-neutral font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-400 h-5 w-5" />
              </div>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="
                pl-10
                pr-4
                py-2
                block
                w-full
                rounded-md
                border
                border-gray-300
                shadow-sm
                focus:border-primary
                focus:ring
                focus:ring-primary
                focus:ring-opacity-50
                transition-all
                duration-300
                text-gray-900
                placeholder-gray-400
              "
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message as string}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
          >
            {isLoading ? <LoadingSpinner /> : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-neutral">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
