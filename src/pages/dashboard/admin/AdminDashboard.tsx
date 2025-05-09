import { useState, useEffect } from "react";
import {
  Users,
  ShoppingBag,
  CreditCard,
  Truck,
  Package,
  TrendingUp,
  PieChart,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
} from "recharts";
import { useGetAllOrdersQuery } from "@/redux/features/admin/orderApi";
import { useGetAllProductQuery } from "@/redux/features/admin/productApi";
import { useGetAllUserQuery } from "@/redux/features/admin/userApi";

// Types
type TOrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "delivered"
  | "cancelled";

type TSalesData = {
  name: string;
  sales: number;
};

type TCategoryData = {
  name: string;
  value: number;
};

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const AdminDashboard = () => {
  // Fetch data
  const { data: ordersData } = useGetAllOrdersQuery(undefined);
  const { data: productsData } = useGetAllProductQuery([
    { name: "limit", value: "100" },
  ]);
  const { data: usersData } = useGetAllUserQuery(undefined);
  // const { data: categoriesData } = useGetCategoriesQuery(undefined);

  const [salesData, setSalesData] = useState<TSalesData[]>([]);
  const [categoryDistribution, setCategoryDistribution] = useState<
    TCategoryData[]
  >([]);
  const [orderStatusCounts, setOrderStatusCounts] = useState<
    Record<TOrderStatus, number>
  >({
    pending: 0,
    confirmed: 0,
    processing: 0,
    delivered: 0,
    cancelled: 0,
  });

  useEffect(() => {
    if (productsData && ordersData) {
      // Process sales data - group by month/day for chart
      const orders = ordersData.data || [];

      // Group orders by month for sales chart
      const salesByMonth: Record<string, number> = {};
      orders.forEach((order) => {
        const date = new Date(order.createdAt);
        const monthKey = date.toLocaleString("default", { month: "short" });
        if (!salesByMonth[monthKey]) {
          salesByMonth[monthKey] = 0;
        }
        salesByMonth[monthKey] += order.totalAmount;
      });

      // Convert to array format for chart
      const formattedSalesData = Object.keys(salesByMonth).map((month) => ({
        name: month,
        sales: salesByMonth[month],
      }));

      setSalesData(formattedSalesData);

      // Count order statuses
      const statusCounts: Record<TOrderStatus, number> = {
        pending: 0,
        confirmed: 0,
        processing: 0,
        delivered: 0,
        cancelled: 0,
      };

      orders.forEach((order) => {
        const status = order.status as TOrderStatus;
        if (statusCounts[status] !== undefined) {
          statusCounts[status]++;
        }
      });

      setOrderStatusCounts(statusCounts);
    }
  }, [ordersData, productsData]);

  useEffect(() => {
    if (productsData) {
      // Process category distribution
      const products = productsData.data || [];
      const categoryCount: Record<string, number> = {};

      products.forEach((product) => {
        const category = product.category;
        if (!categoryCount[category]) {
          categoryCount[category] = 0;
        }
        categoryCount[category]++;
      });

      // Convert to array format for chart
      const categoryData = Object.keys(categoryCount).map((category) => ({
        name: category,
        value: categoryCount[category],
      }));

      setCategoryDistribution(categoryData);
    }
  }, [productsData]);

  // Calculate summary statistics
  const totalProducts = productsData?.data?.length || 0;
  const totalOrders = ordersData?.data?.length || 0;
  const totalUsers = usersData?.data?.length || 0;
  const totalRevenue =
    ordersData?.data?.reduce((sum, order) => sum + order.totalAmount, 0) || 0;

  // Get low stock products (less than 5 in stock)
  const lowStockProducts =
    productsData?.data?.filter((product) => product.stock < 5) || [];

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard
          title="Total Users"
          value={totalUsers}
          icon={<Users className="h-8 w-8 text-blue-500" />}
          bgColor="bg-blue-100"
        />
        <SummaryCard
          title="Total Products"
          value={totalProducts}
          icon={<Package className="h-8 w-8 text-green-500" />}
          bgColor="bg-green-100"
        />
        <SummaryCard
          title="Total Orders"
          value={totalOrders}
          icon={<ShoppingBag className="h-8 w-8 text-purple-500" />}
          bgColor="bg-purple-100"
        />
        <SummaryCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={<CreditCard className="h-8 w-8 text-red-500" />}
          bgColor="bg-red-100"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
            Sales Overview
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Sales"]} />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" name="Sales ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <PieChart className="mr-2 h-5 w-5 text-green-600" />
            Product Categories
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categoryDistribution.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, _, props) => [value, props.payload.name]}
                />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Order Status and Low Stock Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Status */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Truck className="mr-2 h-5 w-5 text-purple-600" />
            Order Status
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <StatusCard
              status="pending"
              count={orderStatusCounts.pending}
              color="bg-yellow-100 text-yellow-800"
            />
            <StatusCard
              status="confirmed"
              count={orderStatusCounts.confirmed}
              color="bg-blue-100 text-blue-800"
            />
            <StatusCard
              status="processing"
              count={orderStatusCounts.processing}
              color="bg-indigo-100 text-indigo-800"
            />
            <StatusCard
              status="delivered"
              count={orderStatusCounts.delivered}
              color="bg-green-100 text-green-800"
            />
            <StatusCard
              status="cancelled"
              count={orderStatusCounts.cancelled}
              color="bg-red-100 text-red-800"
            />
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-red-600" />
            Low Stock Products
          </h2>
          {lowStockProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Product</th>
                    <th className="py-2 px-4 border-b text-left">Stock</th>
                    <th className="py-2 px-4 border-b text-left">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockProducts.slice(0, 5).map((product) => (
                    <tr key={product._id}>
                      <td className="py-2 px-4 border-b">{product.name}</td>
                      <td className="py-2 px-4 border-b text-red-600 font-medium">
                        {product.stock}
                      </td>
                      <td className="py-2 px-4 border-b">
                        ${product.price.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {lowStockProducts.length > 5 && (
                <p className="mt-3 text-sm text-gray-500">
                  And {lowStockProducts.length - 5} more products with low
                  stock...
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">No products with low stock.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Component for summary cards
type SummaryCardProps = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  bgColor: string;
};

const SummaryCard = ({ title, value, icon, bgColor }: SummaryCardProps) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-md transition-transform hover:scale-105 ${bgColor}`}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-700">{title}</h3>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
        <div className="rounded-full p-3 bg-white/60 backdrop-blur-sm">
          {icon}
        </div>
      </div>
    </div>
  );
};

// Component for order status cards
type StatusCardProps = {
  status: string;
  count: number;
  color: string;
};

const StatusCard = ({ status, count, color }: StatusCardProps) => {
  return (
    <div className={`p-4 rounded-lg ${color} text-center`}>
      <p className="text-lg font-semibold">{count}</p>
      <p className="text-sm capitalize">{status}</p>
    </div>
  );
};

export default AdminDashboard;
