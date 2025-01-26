import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Register() {
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
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-neutral"
            >
              Full Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
            {/* {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )} */}
          </div>
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
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )} */}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-neutral"
            >
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
            {/* {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
        )} */}
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-neutral">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
