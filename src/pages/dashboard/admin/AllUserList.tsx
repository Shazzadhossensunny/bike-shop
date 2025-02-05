import { useState } from "react";
import { Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { Pagination } from "@/components/shared/Pagination";
import TableLoadingSppiner from "@/components/shared/TableLoadingSppiner";
import {
  useDeleteUserByIdMutation,
  useGetAllUserQuery,
  useToggleStatusUserMutation,
} from "@/redux/features/admin/userApi";
import toast from "react-hot-toast";

export default function AllUserList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: usersData,
    refetch,
    isLoading,
  } = useGetAllUserQuery([
    { name: "page", value: currentPage.toString() },
    { name: "limit", value: pageSize.toString() },
    { name: "sort", value: "email" },
  ]);

  const [toggleStatusUser] = useToggleStatusUserMutation();
  const [deleteUserById] = useDeleteUserByIdMutation();

  const metaData = usersData?.meta;

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUserById(id);
      toast.success("User deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await toggleStatusUser(id);
      toast.success(
        `User ${currentStatus ? "deactivated" : "activated"} successfully`
      );
      refetch();
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-primary text-center mb-4">
        All Users
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm">
          <thead>
            <tr className="bg-primary text-white text-left">
              <th className="p-3">SL</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-8">
                  <TableLoadingSppiner />
                </td>
              </tr>
            ) : (
              usersData?.data?.map((user, index) => (
                <tr
                  key={user?._id}
                  className="border-b hover:bg-gray-50 text-gray-800"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3 flex items-center space-x-3">
                    {user.role !== "admin" && (
                      <>
                        <button
                          onClick={() =>
                            handleToggleStatus(user._id, user.isActive)
                          }
                          className="text-gray-600 hover:text-gray-800"
                          title={
                            user.isActive ? "Deactivate User" : "Activate User"
                          }
                        >
                          {user.isActive ? (
                            <ToggleLeft size={30} />
                          ) : (
                            <ToggleRight size={30} />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete User"
                        >
                          <Trash2 size={20} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!isLoading && (
        <Pagination
          current={currentPage}
          total={metaData?.total || 0}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
}
