import { Pagination } from "@/components/shared/Pagination";
import TableLoadingSppiner from "@/components/shared/TableLoadingSppiner";
import {
  useDeleteUserByIdMutation,
  useGetAllUserQuery,
} from "@/redux/features/admin/userApi";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AllUserList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: usersData, isLoading } = useGetAllUserQuery([
    { name: "page", value: currentPage.toString() },
    { name: "limit", value: pageSize.toString() },
    { name: "sort", value: "email" },
  ]);

  const [deleteUserById] = useDeleteUserByIdMutation();

  const metaData = usersData?.meta;

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleClick = async (id: string) => {
    console.log(id);
    await deleteUserById(id);
    toast.success("User delete successfully");
  };
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-primary text-center mb-4">
        All User
      </h2>

      <div className="overflow-x-auto relative">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-primary text-white">
              <th className="p-2 text-left">SL</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-8">
                  <TableLoadingSppiner />
                </td>
              </tr>
            ) : (
              usersData?.data?.map((user, index) => (
                <tr key={user?._id} className="border-b hover:bg-gray-100">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.role}</td>
                  <td className="p-2 flex space-x-2">
                    <button
                      onClick={() => handleClick(user?._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
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
