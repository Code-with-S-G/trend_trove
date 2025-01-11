import Layout from "@/components/Layout/Layout";
import myContext from "@/context/myContext";
import { fireDB } from "@/firebase/FirebaseConfig";
import { addToCart, deleteFromCart } from "@/redux/cartSlice";
import { doc, setDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

const CategoryPage = () => {
  const { categoryname } = useParams();
  const context = useContext(myContext);
  const { getAllProduct, loading, setShowLogIn } = context;
  const [isInitial, setIsInitial] = useState(true);
  // get user from localStorage
  const user = JSON.parse(localStorage.getItem("users"));

  const navigate = useNavigate();

  // filter product
  const filterProduct = getAllProduct.filter((obj) => obj.category.includes(categoryname));

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    if(user) {
      dispatch(addToCart({ ...item, orderId: crypto.randomUUID() }));
    toast.success("Item added to your cart successfully!");
    }
    else {
      setShowLogIn(true);
    }
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Item deleted from your cart successfully!");
  };

  useEffect(() => {
    async function cartHandler() {
      // get user from localStorage
      const user = JSON.parse(localStorage.getItem("users"));
      await setDoc(doc(fireDB, "cart", user.email), { cart: cartItems });
    }
    if (!isInitial) cartHandler();
    setIsInitial(false);
  }, [cartItems]);

  return (
    <Layout>
      <div className="bg-stone-50 dark:bg-slate-900 pt-5 min-h-screen">
        {/* Heading */}
        <h1 className="text-center text-2xl font-bold text-gray-800 dark:text-gray-200 first-letter:uppercase">{categoryname}</h1>
        {/* Main Section */}
        <section className="text-gray-600 body-font">
          <div className="px-5 py-5 mx-auto">
            {loading ? (
              <div className="text-center">
                <PropagateLoader color="#ec4899" />
              </div>
            ) : (
              <>
                {filterProduct.length > 0 ? (
                  <div className="flex flex-wrap -mx-4">
                    {filterProduct.map((item) => {
                      const { images, title, price, id } = item;
                      return (
                        <div key={id} className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                          <div className="border border-gray-300 rounded-lg shadow-md h-full bg-white dark:bg-gray-800 dark:border-gray-700">
                            {images?.length > 0 ? (
                              <img onClick={() => navigate(`/productinfo/${id}`)} src={images[0]} className="h-60 md:h-48 lg:h-56 xl:h-64 w-full object-cover rounded-t-lg cursor-pointer" alt={title} />
                            ) : (
                              <div className="h-60 md:h-48 lg:h-56 xl:h-64 w-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-t-lg">
                                <svg className="w-24 h-24 text-gray-400 cursor-pointer" onClick={() => navigate(`/productinfo/${id}`)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            )}

                            <div className="p-4">
                              <h2 className="tracking-widest text-xs text-gray-500 font-medium mb-2 dark:text-gray-300">TrendTrove</h2>
                              <h1 className="text-md font-semibold text-gray-900 dark:text-gray-200 truncate">
                                <span onClick={() => navigate(`/productinfo/${id}`)} className="cursor-pointer">
                                  {title}
                                </span>
                              </h1>
                              <div className="mt-4 flex justify-between items-center">
                                <h1 className="text-lg font-bold text-gray-900 dark:text-gray-200">₹{parseFloat(price).toLocaleString()}</h1>
                                {cartItems.some((p) => p.id === item.id) ? (
                                  <button onClick={() => deleteCart(item)} className="bg-yellow-500 hover:bg-amber-500 text-white text-xs font-bold py-3 px-3 rounded-lg">
                                    Delete From Cart
                                  </button>
                                ) : (
                                  <button onClick={() => addCart(item)} className="bg-yellow-500 hover:bg-amber-500 text-white text-sm font-medium py-2 px-3 rounded-lg">
                                    Add To Cart
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col justify-center items-center">
                      <img className=" mb-2" src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="" />
                      <h1 className=" text-black text-xl">No {categoryname} product found</h1>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CategoryPage;
