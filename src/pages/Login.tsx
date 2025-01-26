import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-primary text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral"
            >
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
            {/* {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )} */}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral"
            >
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
            {/* {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )} */}
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-neutral">
            Don't have an account?
            <Link to="/register" className="text-primary hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
