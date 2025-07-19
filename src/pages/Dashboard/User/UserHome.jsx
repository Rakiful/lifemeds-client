import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
  FaCapsules,
} from "react-icons/fa";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

export const UserHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/dashboard/user/${user.email}`);
      return res.data;
    },
  });

  const { data: salesReport = [] } = useQuery({
    queryKey: ["salesReport"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/sales-report");
      const data = res.data.filter((d) => d.buyerEmail === `${user.email}`);
      return data;
    },
  });

  // Group sales by date for line chart
  const salesByDate = salesReport.reduce((acc, item) => {
    const date = item.orderDate.slice(0, 10); // YYYY-MM-DD
    acc[date] = (acc[date] || 0) + item.totalPrice;
    return acc;
  }, {});

  const salesChartData = Object.entries(salesByDate)
    .map(([date, total]) => ({ date, total }))
    .sort((a, b) => new Date(a.date) - new Date(b.date)) // ascending date
    .slice(-30); // last 30 days

  const topMedicine = salesReport.reduce((top, item) => {
    if (!top[item.medicineName]) {
      top[item.medicineName] = { ...item, quantity: item.quantity };
    } else {
      top[item.medicineName].quantity += item.quantity;
    }
    return top;
  }, {});

  const topSelling = Object.values(topMedicine).sort(
    (a, b) => b.quantity - a.quantity
  )[0];

  const totalItemsSold = salesReport.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="p-5">
      <Helmet>
        <title>User Dashboard | LifeMeds</title>
      </Helmet>
      <div>
        <h1 className="text-2xl text-center lg:text-4xl text-black font-bold">
          📊 User Dashboard Overview
        </h1>
        <hr className="mt-3 mb-5 lg:mt-5 lg:mb-10 w-24 lg:w-40 text-black border-2 lg:border-3 rounded-2xl mx-auto" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-3">
          <FaShoppingCart className="text-2xl md:text-5xl text-blue-500" />
          <div>
            <h4 className="text-sm md:text-lg font-semibold">My Orders</h4>
            <p>{stats.totalOrders ?? 0}</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-3">
          <FaCapsules className="text-2xl md:text-5xl text-red-500" />
          <div>
            <h4 className="text-sm md:text-lg font-semibold">
              Top Buying Medicine
            </h4>
            {topSelling ? (
              <>
                <p>
                  {topSelling.medicineName}{" "}
                  <span className="text-sm text-gray-600">
                    ({topSelling.quantity} sold)
                  </span>
                </p>
              </>
            ) : (
              <p className="text-gray-500">No data</p>
            )}
          </div>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-3">
          <FaShoppingCart className="text-2xl md:text-5xl text-indigo-500" />
          <div>
            <h4 className="text-sm md:text-lg font-semibold">Items Buy</h4>
            <p>{totalItemsSold}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-3">
          <FaDollarSign className="text-2xl md:text-5xl text-purple-600" />
          <div>
            <h4 className="text-sm md:text-lg font-semibold">Total Payments</h4>
            <p>${stats.totalEarnings?.toFixed(2) ?? 0}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-xl p-5">
        <h3 className="text-xl font-semibold mb-4">
          💹My Medicines Sales Trend (Last 30 Days)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#10B981"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
