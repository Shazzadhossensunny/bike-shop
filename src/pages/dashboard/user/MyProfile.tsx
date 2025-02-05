import {
  useChangedPasswordMutation,
  useGetSingleUserQuery,
} from "@/redux/features/customer/customerApi";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import toast from "react-hot-toast";
import { TResponse } from "@/type";
import { logout } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDeleteUserByIdMutation } from "@/redux/features/admin/userApi";
import { useState } from "react";

const MyProfile = () => {
  const id = useAppSelector((state) => state.auth.name?.userId);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { data: myData, isLoading: isUserLoading } = useGetSingleUserQuery(id);
  const [changedPassword] = useChangedPasswordMutation();
  const [deleteUserById] = useDeleteUserByIdMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = (await changedPassword(data)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message || "Password change failed");
      } else {
        toast.success("Password changed successfully. Please log in again.", {
          duration: 2000,
        });
        dispatch(logout());
        navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong!", { duration: 2000 });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = (await deleteUserById(id)) as TResponse<any>;

      if (res.error) {
        const errorMessage =
          res.error.data?.message || "Account deletion failed";
        toast.error(errorMessage, {
          duration: 2000,
        });
        return;
      }

      // Success scenario
      toast.success("Your account has been deleted.", {
        duration: 2000,
      });
      dispatch(logout());
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong!", {
        duration: 4000,
      });
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!myData?.data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-neutral">
          <LoadingSpinner />
        </p>
      </div>
    );
  }

  const { name, email, role, createdAt } = myData.data;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Delete Account Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-xl font-bold text-neutral mb-4">
              Confirm Account Deletion
            </h2>
            <p className="text-neutral mb-6">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="
                  px-4 py-2
                  bg-gray-200
                  text-neutral
                  rounded-md
                  hover:bg-gray-300
                "
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="
                  px-4 py-2
                  bg-red-500
                  text-white
                  rounded-md
                  hover:bg-red-600
                "
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
        {/* Profile Info Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-neutral mb-6">
            Profile Information
          </h2>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral">{name}</h3>
                <span className="text-sm text-gray-500 capitalize">{role}</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-neutral">{email}</p>
              <p className="text-neutral">
                Joined{" "}
                {new Date(createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Password Change Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-neutral mb-6">
            Change Password
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-neutral font-medium mb-2"
              >
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                placeholder="Enter current password"
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
                className="
                  px-4
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
              {errors.currentPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.currentPassword.message as string}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-neutral font-medium mb-2"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="
                  px-4
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
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword.message as string}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="
                w-full
                bg-primary
                text-white
                py-2
                px-4
                rounded-md
                hover:bg-blue-700
                transition-colors
                duration-300
                font-medium
              "
            >
              Update Password
            </button>
          </form>
          {/* Delete Account Section */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-bold text-red-500 mb-4">Danger Zone</h3>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="
                w-full
                bg-red-500
                text-white
                py-2
                px-4
                rounded-md
                hover:bg-red-600
                transition-colors
                duration-300
                font-medium
              "
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
