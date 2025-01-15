import myContext from "@/context/myContext";
import React, { useContext, useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import { doc, updateDoc } from "firebase/firestore";
import { fireDB } from "@/firebase/FirebaseConfig";
import toast from "react-hot-toast";
import { Package, CheckCircle, Clock, Box, Truck, Navigation, HomeIcon, RotateCcw, XCircle, ClipboardCheck, ShoppingCart, PackageX } from 'lucide-react';

const EmptyOrderState = () => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <PackageX className="w-24 h-24 text-slate-300 dark:text-slate-600 mb-6" />
    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
      No Orders Found
    </h3>
    <p className="text-slate-600 dark:text-slate-400 text-center max-w-md">
      There are currently no orders in the system. New orders will appear here when customers make purchases.
    </p>
  </div>
);

const OrderDetail = () => {
  const context = useContext(myContext);
  const { loading, getAllOrder, setLoading } = context;
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedCartItems, setSelectedCartItems] = useState([]);
  const [selectedAddressInfo, setSelectedAddressInfo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editOrderStatus, setOrderEditStatus] = useState("");

  const stats = [
    {
      title: "Order Placed",
      value: getAllOrder.filter((order) => order.orderStatus === "placed").length,
      icon: <ShoppingCart className="w-6 h-6 text-pink-600 dark:text-pink-400" />,
      bgColor: "bg-pink-100 dark:bg-pink-900"
    },
    {
      title: "Processing",
      value: getAllOrder.filter((order) => order.orderStatus === "Processing").length,
      icon: <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      bgColor: "bg-purple-100 dark:bg-purple-900"
    },
    {
      title: "Confirmed",
      value: getAllOrder.filter((order) => order.orderStatus === "Confirmed").length,
      icon: <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />,
      bgColor: "bg-green-100 dark:bg-green-900"
    },
    {
      title: "Packed",
      value: getAllOrder.filter((order) => order.orderStatus === "Packed").length,
      icon: <Box className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      bgColor: "bg-blue-100 dark:bg-blue-900"
    },
    {
      title: "Shipped",
      value: getAllOrder.filter((order) => order.orderStatus === "Shipped").length,
      icon: <Package className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      bgColor: "bg-indigo-100 dark:bg-indigo-900"
    },
    {
      title: "In Transit",
      value: getAllOrder.filter((order) => order.orderStatus === "in Transit").length,
      icon: <Truck className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      bgColor: "bg-orange-100 dark:bg-orange-900"
    },
    {
      title: "Out for Delivery",
      value: getAllOrder.filter((order) => order.orderStatus === "Out for Delivery").length,
      icon: <Navigation className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
      bgColor: "bg-cyan-100 dark:bg-cyan-900"
    },
    {
      title: "Delivered",
      value: getAllOrder.filter((order) => order.orderStatus === "Delivered").length,
      icon: <HomeIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      bgColor: "bg-emerald-100 dark:bg-emerald-900"
    },
    {
      title: "Returned",
      value: getAllOrder.filter((order) => order.orderStatus === "Returned").length,
      icon: <RotateCcw className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      bgColor: "bg-rose-100 dark:bg-rose-900"
    },
    {
      title: "Completed",
      value: getAllOrder.filter((order) => order.orderStatus === "Completed").length,
      icon: <ClipboardCheck className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
      bgColor: "bg-teal-100 dark:bg-teal-900"
    },
    {
      title: "Cancelled",
      value: getAllOrder.filter((order) => order.orderStatus === "Cancelled").length,
      icon: <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />,
      bgColor: "bg-red-100 dark:bg-red-900"
    }
  ];

  const statusStyles = {
    "placed": {
      bg: "bg-pink-100 dark:bg-pink-900",
      text: "text-pink-800 dark:text-pink-200"
    },
    "Processing": {
      bg: "bg-purple-100 dark:bg-purple-900",
      text: "text-purple-800 dark:text-purple-200"
    },
    "Confirmed": {
      bg: "bg-green-100 dark:bg-green-900",
      text: "text-green-800 dark:text-green-200"
    },
    "Packed": {
      bg: "bg-blue-100 dark:bg-blue-900",
      text: "text-blue-800 dark:text-blue-200"
    },
    "Shipped": {
      bg: "bg-indigo-100 dark:bg-indigo-900",
      text: "text-indigo-800 dark:text-indigo-200"
    },
    "in Transit": {
      bg: "bg-orange-100 dark:bg-orange-900",
      text: "text-orange-800 dark:text-orange-200"
    },
    "Out for Delivery": {
      bg: "bg-cyan-100 dark:bg-cyan-900",
      text: "text-cyan-800 dark:text-cyan-200"
    },
    "Delivered": {
      bg: "bg-emerald-100 dark:bg-emerald-900",
      text: "text-emerald-800 dark:text-emerald-200"
    },
    "Returned": {
      bg: "bg-rose-100 dark:bg-rose-900",
      text: "text-rose-800 dark:text-rose-200"
    },
    "Completed": {
      bg: "bg-teal-100 dark:bg-teal-900",
      text: "text-teal-800 dark:text-teal-200"
    },
    "Cancelled": {
      bg: "bg-red-100 dark:bg-red-900",
      text: "text-red-800 dark:text-red-200"
    }
  };

  // Filter orders based on search term
  const filteredOrders = getAllOrder.filter(
    (order) =>
      order.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.addressInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateOrderStatusFunction = async (e, id) => {
    try {
      await updateDoc(doc(fireDB, "orders", id), { orderStatus: e.target.value });
      toast.success("Order Status updated successfully!");
      setOrderEditStatus("");
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while updating the order status!");
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="py-5">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-pink-500">All Orders</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage and track all customer orders</p>
        </div>
        {getAllOrder.length > 0 && (
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="search"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-[#1c1c1c] focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600"
            />
          </div>
        )}
      </div>

      {/* Stats Cards */}
      {getAllOrder.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white dark:bg-[#1c1c1c] p-4 rounded-xl border border-slate-300 dark:border-slate-600">
              <div className="flex items-center gap-3">
                <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-[#1c1c1c] rounded-xl border border-slate-300 dark:border-slate-600 overflow-hidden">
        {getAllOrder.length === 0 ? (
          <EmptyOrderState />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#2c2c2c] border-b border-slate-300 dark:border-slate-600">
                    <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100 text-center">Payment ID</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100 text-center">Status</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100 text-center">Customer Name</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100 text-center">Email</th>
                    <th className="min-w-[135px] px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100 text-center">Date</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {currentOrders?.map((order) => {
                    const { paymentId, cartItems, addressInfo, orderStatus, date, email } = order;

                    return (
                      <>
                        <tr key={paymentId} className="hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors duration-200 text-center">
                          <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{paymentId}</td>
                          <td className="px-6 py-4">
                            {editOrderStatus !== paymentId ? (
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[orderStatus]?.bg || 'bg-gray-100 dark:bg-gray-900'} ${statusStyles[orderStatus]?.text || 'text-gray-800 dark:text-gray-200'}`}>
                                {orderStatus}
                              </span>
                            ) : (
                              <select
                                onChange={(e) => {
                                  updateOrderStatusFunction(e, order.id);
                                }}
                                className="px-2 py-1 rounded-lg border text-xs border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-[#1c1c1c] focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-600"
                              >
                                <option value="placed">Order Placed</option>
                                <option value="Processing">Processing</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Packed">Packed</option>
                                <option value="Shipped">Shipped</option>
                                <option value="in Transit">in Transit</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Returned">Returned</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{addressInfo.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{email}</td>
                          <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{date}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() => {
                                  setSelectedCartItems(cartItems);
                                  setSelectedAddressInfo(addressInfo);
                                  setShowOrderDetails(true);
                                }}
                                id="view-order-details"
                                className="inline-flex items-center justify-center w-8 h-8 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => setOrderEditStatus(paymentId)}
                                id="edit-order-details"
                                className="inline-flex items-center justify-center w-8 h-8 text-green-600 hover:text-blue-600 dark:text-green-600 dark:hover:text-blue-300 transition-colors duration-200"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {showOrderDetails && <OrderDetailsModal setShowOrderDetails={setShowOrderDetails} cartItems={selectedCartItems} addressInfo={selectedAddressInfo} />}
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to <span className="font-medium">{Math.min(indexOfLastOrder, filteredOrders.length)}</span> of <span className="font-medium">{filteredOrders.length}</span> results
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        )}


      </div>
    </div>
  );
};

export default OrderDetail;
