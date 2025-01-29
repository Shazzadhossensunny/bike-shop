import { Pagination } from "@/components/shared/Pagination";
import TableLoadingSppiner from "@/components/shared/TableLoadingSppiner";
import { useGetAllProductQuery } from "@/redux/features/admin/productApi";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AllProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: products, isLoading } = useGetAllProductQuery([
    { name: "page", value: currentPage.toString() },
    { name: "limit", value: pageSize.toString() },
    { name: "sort", value: "price" },
  ]);

  const metaData = products?.meta;

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-primary text-center mb-4">
        All Products
      </h2>

      <div className="overflow-x-auto relative">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-primary text-white">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Stock</th>
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
              products?.data?.map((product) => (
                <tr key={product?._id} className="border-b hover:bg-gray-100">
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.category}</td>
                  <td className="p-2">${product.price}</td>
                  <td className="p-2">{product.stock}</td>
                  <td className="p-2 flex space-x-2">
                    <Link
                      to={`/dashboard/products/${product?._id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit size={20} />
                    </Link>
                    <button className="text-red-500 hover:text-red-700">
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
