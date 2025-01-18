import React, { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import Layout from "@/components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, deleteFromCart, incrementQuantity, setCart } from "@/redux/cartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { fireDB } from "@/firebase/FirebaseConfig";
import nocart from "@/assets/nocart.png";
import AddAddressModal from "@/components/address/AddAddressModal";
import SelectAddressModal from "@/components/address/SelectAddressModal";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isInitial, setIsInitial] = useState(true);
  const navigate = useNavigate();
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showSelectAddress, setShowSelectAddress] = useState(false);
  // get user from localStorage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("users")));

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Item deleted from your cart successfully!");
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const cartItemTotal = cartItems.map((item) => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

  const cartTotal = cartItems.map((item) => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

  const buyNow = async () => {

    const addressInfo = {
      ...user.address,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
    console.log(addressInfo);

    var options = {
      key: "rzp_test_7qtduPycmxtO6Z",
      key_secret: "k63dCAUHR9bu2WDEOC7Gq9x9",
      amount: parseInt(cartTotal * 0.8 * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + user?.address?.name || "order_rcptid_" + user?.name,
      name: "TrendTrove",
      description: "for testing purpose",
      handler: function (response) {
        // console.log(response)
        toast.success("Payment Successful");
        const paymentId = response.razorpay_payment_id;
        // store in firebase
        const orderInfo = {
          cartItems,
          addressInfo,
          orderStatus: "placed",
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          time: Timestamp.now(),
          email: user?.email,
          userid: user?.uid,
          paymentId,
        };

        try {
          const result = addDoc(collection(fireDB, "orders"), orderInfo);
          dispatch(setCart([]));
          navigate('/');
        } catch (error) {
          console.log(error);
        }
      },

      theme: {
        color: "#ff930f",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay);
  };

  useEffect(() => {
    async function cartHandler() {
      await setDoc(doc(fireDB, "cart", user.email), { cart: cartItems });
    }
    if (!isInitial) cartHandler();
    setIsInitial(false);
  }, [cartItems, cartItemTotal]);

  useEffect(() => {
    async function addressHandler() {
      // Fetch the updated user document
      const userDoc = await getDoc(doc(fireDB, "users", user.email));

      if (userDoc.exists()) {
        const updatedUserData = userDoc.data();

        // Store the updated user data in localStorage
        localStorage.setItem("users", JSON.stringify(updatedUserData));
        setUser(updatedUserData);
      }
    }
    addressHandler();
  }, [showSelectAddress, showAddAddress]);

  return (
    <Layout>
      <div className="container px-4 max-w-full lg:px-0 bg-stone-50 dark:bg-[#2c2c2c]">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Shopping Cart</h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className=" max-h-[42rem] custom-scrollbar overflow-y-auto rounded-lg bg-white shadow-md dark:bg-[#1c1c1c] lg:col-span-8">
              <h2 id="cart-heading" className="border-b border-gray-400 dark:border-gray-300 px-4 py-3 text-lg font-medium text-gray-900 dark:text-gray-300  sm:p-4">
                Items in your shopping cart
              </h2>
              <ul role="list" className="divide-y divide-gray-300 dark:divide-gray-400 divide-dashed ">
                {cartItems.length > 0 ? (
                  <>
                    {" "}
                    {cartItems.map((product) => (
                      <div key={product.id} className="">
                        <li className="py-6 flex sm:py-8 px-4">
                          <div className="flex-shrink-0">
                            {product.images.length > 0 ? (
                              <img onClick={() => navigate(`/productinfo/${product.id}`)} src={product.images[0]} alt={product.name} className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center" />
                            ) : (
                              <div onClick={() => navigate(`/productinfo/${product.id}`)} className="sm:h-38 sm:w-38 h-24 w-24 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-t-lg">
                                <svg className="w-12 h-12 text-gray-400 cursor-pointer" onClick={() => navigate(`/productinfo/${id}`)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                          <div className="flex ml-4 flex-1 flex-col justify-between sm:ml-6">
                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                              <div>
                                <div className="flex justify-between">
                                  <h3 className="text-sm">
                                    <p onClick={() => navigate(`/productinfo/${product.id}`)} className="font-semibold line-clamp-1 text-black dark:text-gray-100 hover:text-gray-800 dark:hover:text-gray-200 transition cursor-pointer">
                                      {product.title}
                                    </p>
                                  </h3>
                                </div>
                                <div className="flex mt-1 text-sm">
                                  <p className="text-gray-500 dark:text-gray-400 text-sm">{product.category}</p>
                                  {product.size ? <p className="ml-4 border-l border-gray-200 dark:border-gray-600 pl-4 text-sm text-gray-500 dark:text-gray-400">{product.size}</p> : null}
                                </div>
                                <div className="flex mt-1 items-end">
                                  <p className="text-xs font-medium line-through pb-0.5 text-gray-500 dark:text-gray-600">₹{parseFloat(product.price).toLocaleString()}</p>
                                  <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white"> &nbsp;&nbsp;₹{parseFloat(product.price * 0.8).toLocaleString()}</p>
                                  &nbsp;&nbsp;
                                  <p className="ml-2 text-sm font-medium text-green-500">20% Off</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <div className="flex mb-2">
                          <div className="flex min-w-24 px-3">
                            <button
                              onClick={() => handleDecrement(product.id)}
                              type="button"
                              className="h-7 w-7 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 flex items-center justify-center"
                            >
                              -
                            </button>
                            <input type="text" className="mx-1 h-7 w-9 rounded-md border border-gray-300 dark:border-gray-600 text-center text-black dark:text-gray-100 dark:bg-gray-800" value={product.quantity} />
                            <button
                              onClick={() => handleIncrement(product.id)}
                              type="button"
                              className="h-7 w-7 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                          <div className="flex text-sm ml-6">
                            <button onClick={() => deleteCart(product)} type="button" className="flex items-center space-x-1 px-2 py-1">
                              <Trash size={12} className="text-red-500" />
                              <span className="text-xs font-medium text-red-500">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div>
                    <div className="flex flex-col justify-center items-center">
                      <img className="mt-4 mb-2" src={nocart} alt="" />
                      <h1 className=" text-black dark:text-gray-300 font-bold mb-1 text-xl">Your cart is empty</h1>
                      <p className="text-black dark:text-gray-300 mb-6 text-center">Looks like you have not added anything to your cart. Go ahead and explore top categories.</p>
                    </div>
                  </div>
                )}
              </ul>
            </section>
            {/* Order summary */}
            <section className="rounded-md py-4 mt-4 lg:col-span-4 lg:mt-0 lg:p-0">
              <section aria-labelledby="summary-heading" className="mt-16 rounded-lg bg-white shadow-md dark:bg-[#1c1c1c] lg:col-span-4 lg:mt-0 lg:p-0">
                <h2 id="summary-heading" className="border-b border-gray-400 dark:border-gray-300 px-4 py-3 text-lg font-medium text-gray-900 dark:text-gray-100 sm:p-4">
                  Order summary
                </h2>
                <div>
                  <dl className="space-y-1 px-4 py-4 text-gray-800 dark:text-gray-300">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm">Price ({cartItemTotal} item)</dt>
                      <dd className="text-sm font-medium">₹{parseFloat(cartTotal).toLocaleString()}</dd>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <dt className="flex items-center text-sm">
                        <span>Discount</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-500">- ₹{parseFloat(cartTotal * 0.2).toLocaleString()}</dd>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <dt className="flex text-sm">
                        <span>Delivery Charges</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-500">Free</dd>
                    </div>
                    <div className="flex items-center justify-between border-y border-dashed border-gray-400 dark:border-gray-200 py-4 ">
                      <dt className="text-base font-medium ">Total Amount</dt>
                      <dd className="text-base font-medium ">₹{parseFloat(cartTotal * 0.8).toLocaleString()}</dd>
                    </div>
                  </dl>
                </div>
              </section>
              {/* address */}
              <section aria-labelledby="summary-heading" className="mt-16 rounded-lg bg-white shadow-md dark:bg-[#1c1c1c] lg:col-span-4 lg:mt-10 lg:p-0">
                <div>
                  <dl className="space-y-1 px-4 py-4 text-gray-800 dark:text-gray-300">
                    <div className="flex items-center justify-between">
                      {user?.address && (
                        <div key={user.address.id} className="rounded-lg w-full">
                          <div className="flex flex-col space-y-1">
                            {user?.address?.name && <span className="font-medium">{user.address.name}</span>}
                            {user?.address?.house && <span className="font-medium">{user.address.house}</span>}
                            {user?.address?.building && <span>{user.address.building}</span>}
                            {user?.address?.landmark && <span className="">Near {user.address.landmark}</span>}
                            <div className="flex gap-2 mt-1 text-sm">
                              {user?.address?.pincode && <span>{user.address.pincode}</span>}
                              {user?.address?.number && <span>•</span>}
                              {user?.address?.number && <span>{user.address.number}</span>}
                            </div>
                            {user?.address?.addressLabel && <span className="mt-2 text-sm font-medium text-blue-600">{user.address.addressLabel}</span>}
                          </div>
                        </div>
                      )}
                    </div>
                    {user?.address && (
                      <div className="flex items-center justify-end py-2">
                        <dt onClick={() => setShowSelectAddress(true)} className="flex text-md text-pink-400 cursor-pointer">
                          <span>Select Address</span>
                        </dt>
                      </div>
                    )}
                    <div className="flex items-center justify-end border-y border-dashed border-gray-400 dark:border-gray-200 py-4 ">
                      <dt onClick={() => setShowAddAddress(true)} className="text-base font-medium text-pink-500 cursor-pointer">
                        + Add Address
                      </dt>
                    </div>
                  </dl>
                  <div className="px-4 pb-4 font-medium text-green-700">
                    <div className="flex gap-4 mb-1">
                      <button
                        onClick={buyNow}
                        disabled={!user?.address}
                        type="button"
                        className="w-full px-4 py-3 text-center text-gray-100 bg-gradient-to-r from-[#ff930f] to-[#e0da2f] border border-transparent hover:opacity-90 shadow-sm rounded-xl disabled:opacity-40"
                      >
                        Buy now
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </form>
        </div>
      </div>
      {showAddAddress && <AddAddressModal setShowAddAddress={setShowAddAddress} setShowSelectAddress={setShowSelectAddress} />}
      {showSelectAddress && <SelectAddressModal setShowSelectAddress={setShowSelectAddress} setShowAddAddress={setShowAddAddress} />}
    </Layout>
  );
};

export default CartPage;
