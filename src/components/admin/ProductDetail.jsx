import { useContext, useState } from "react";
import myContext from "@/context/myContext";
import { Link, useNavigate } from "react-router-dom";
import { PacmanLoader, PropagateLoader } from "react-spinners";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "@/firebase/FirebaseConfig";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const context = useContext(myContext);
  const { loading, getAllProduct, setLoading } = context;
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Filter products based on search term
  const filteredProducts = getAllProduct.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase()));

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "/api/placeholder/100/100";
  };

  // Delete product 
  const deleteProduct = async (product) => {
    setLoading(true)
    try {
        await deleteDoc(doc(fireDB, product?.category, product?.id));
        toast.success('Product Deleted successfully');
        // getAllProductFunction();
        setLoading(false);
    } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error("Failed to delete the product. Please try again later!");
    }
}

  // Format time from timestamp
  const formatTime = (timestamp) => {
    if (!timestamp?.seconds) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="py-5">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-pink-500">All Products</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage your product inventory</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-96 md:w-64 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-[#1c1c1c] focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <Link to={"/addproduct"}>
            <button className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition duration-200 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-[#1c1c1c] p-4 rounded-xl border border-slate-300 dark:border-slate-600">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{getAllProduct.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-10">
          <PropagateLoader color="#ec4899" />
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="bg-white dark:bg-[#1c1c1c] rounded-xl border border-slate-300 dark:border-slate-600 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#2c2c2c]">
                    {/* Product column: Largest as it has image + title */}
                    <th className="w-[40%] min-w-[300px] px-4 sm:px-5 py-4">
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100">Product</span>
                    </th>

                    {/* Category column: Medium width for badge */}
                    <th className="w-[15%] min-w-[120px] px-4 py-4 text-center">
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100">Category</span>
                    </th>

                    {/* Stock column: Small fixed width */}
                    <th className="w-[10%] min-w-[100px] px-4 py-4 text-center">
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100">Stock</span>
                    </th>

                    {/* Price column: Small fixed width */}
                    <th className="w-[10%] min-w-[80px] px-4 py-4 text-center">
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100">Price</span>
                    </th>

                    {/* Date column: Hidden on mobile, medium width */}
                    <th className="w-[15%] min-w-[120px] px-4 py-4 hidden md:table-cell text-center">
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100 ">Date</span>
                    </th>

                    {/* Actions column: Smallest fixed width */}
                    <th className="w-[10%] min-w-[100px] px-4 py-4 text-center">
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {currentProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors duration-200">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                            {product.images?.length > 0 ? (
                              <img src={product.images[0]} alt={product.title} className="w-full h-full object-contain" onError={handleImageError} loading="lazy" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">{product.title}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">#{product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">{product.category}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            parseInt(product.stock) > 0 ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200" : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                          }`}
                        >
                          {parseInt(product.stock) > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 text-center">₹{parseFloat(product.price).toLocaleString()}</td>
                      <td className="px-4 py-4 hidden md:table-cell text-center">
                        <div className="flex flex-col text-sm text-gray-500 dark:text-gray-400">
                          <span>{product.date}</span>
                          <span className="text-xs">{formatTime(product.time)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={()=> navigate(`/updateproduct/${product.id}`)} className="p-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button onClick={()=> deleteProduct(product)} className="p-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200 rounded-full hover:bg-red-50 dark:hover:bg-red-900/50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing <span className="font-medium">{indexOfFirstProduct + 1}</span> to <span className="font-medium">{Math.min(indexOfLastProduct, filteredProducts.length)}</span> of <span className="font-medium">{filteredProducts.length}</span>{" "}
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
        </>
      )}
    </div>
  );
};

export default ProductDetail;
