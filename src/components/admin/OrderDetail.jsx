import myContext from "@/context/myContext";
import React, { useContext, useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";

const OrderDetail = () => {
  const context = useContext(myContext);
  const { loading, getAllOrder } = context;
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedCartItems, setSelectedCartItems] = useState([]);
  const [selectedAddressInfo, setSelectedAddressInfo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter orders based on search term
  const filteredOrders = getAllOrder.filter((order) => order.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) || order.addressInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) || order.orderStatus.toLowerCase().includes(searchTerm.toLowerCase()) || order.date.toLowerCase().includes(searchTerm.toLowerCase()) || order.email.toLowerCase().includes(searchTerm.toLowerCase()));

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
        <div className="flex gap-2 w-full sm:w-auto">
          <input
            type="search"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-[#1c1c1c] focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-[#1c1c1c] p-4 rounded-xl border border-slate-300 dark:border-slate-600">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{getAllOrder.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1c1c1c] p-4 rounded-xl border border-slate-300 dark:border-slate-600">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">845</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1c1c1c] p-4 rounded-xl border border-slate-300 dark:border-slate-600">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">389</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1c1c1c] rounded-xl border border-slate-300 dark:border-slate-600 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#2c2c2c] border-b border-slate-300 dark:border-slate-600">
                {/* <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">S.No.</th> */}
                <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">Payment ID</th>
                {/* <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">Image</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">Title</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">Category</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">Price</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">Quantity</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">Total Price</th> */}
                <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">Status</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">Customer Name</th>
                {/* <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">Address</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">Phone</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">Address label</th> */}
                <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">Email</th>
                <th className="min-w-[135px] px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">Date</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {currentOrders?.map((order) => {
                const { paymentId, cartItems, addressInfo, orderStatus, date, email } = order;

                return (
                  <>
                    <tr key={paymentId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors duration-200">
                      {/* <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">1</td> */}
                      <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{paymentId}</td>
                      {/* <td className="px-6 py-4">
                  <img src="/api/placeholder/50/50" alt="Product" className="w-12 h-12 rounded-lg object-cover" />
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">Sample Product</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">Electronics</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">$299.00</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">1</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">$299.00</td> */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">{orderStatus}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{addressInfo.name}</td>
                      {/* <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{`${addressInfo.house}, ${addressInfo.building}, ${addressInfo.landmark}, ${addressInfo.pincode}`}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{addressInfo.number}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{addressInfo.addressLabel}</td> */}
                      <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{email}</td>
                      <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center">
                          <button onClick={() => {
                            setSelectedCartItems(cartItems);
                            setSelectedAddressInfo(addressInfo);
                            setShowOrderDetails(true);
                          }} className="inline-flex items-center justify-center w-8 h-8 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          {/* <button className="inline-flex items-center justify-center w-8 h-8 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button> */}
                        </div>
                      </td>
                    </tr>
                    {/* {showOrderDetails && <OrderDetailsModal setShowOrderDetails={setShowOrderDetails} cartItems={cartItems} addressInfo={addressInfo}/>} */}
                  </>
                )
              })}
            </tbody>
          </table>
        </div>
        {showOrderDetails && (
          <OrderDetailsModal
            setShowOrderDetails={setShowOrderDetails}
            cartItems={selectedCartItems}
            addressInfo={selectedAddressInfo}
          />
        )}


        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to <span className="font-medium">{Math.min(indexOfLastOrder, filteredOrders.length)}</span> of <span className="font-medium">{filteredOrders.length}</span>{" "}
              results
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
      </div>
    </div>
  );
};

export default OrderDetail;
