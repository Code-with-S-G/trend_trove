import Layout from "@/components/Layout/Layout";
import myContext from "@/context/myContext";
import { fireDB } from "@/firebase/FirebaseConfig";
import { addToCart, deleteFromCart } from "@/redux/cartSlice";
import { doc, setDoc } from "firebase/firestore";
import { ShoppingCart } from "lucide-react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { PropagateLoader } from "react-spinners";

const ProductInfo = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProduct } = context;
  const [isInitial, setIsInitial] = useState(true);
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [product, setProduct] = useState("");

  const { id } = useParams();

  // Custom Next Arrow Component
  const CustomNextArrow = React.memo(({ onClick }) => (
    <div
      className="absolute top-1/2 -right-14 -translate-y-1/2 z-20 w-12 h-12 bg-gray-200/50 dark:bg-gray-700/50 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-600 dark:text-gray-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </div>
  ));

  // Custom Previous Arrow Component
  const CustomPrevArrow = React.memo(({ onClick }) => (
    <div
      className="absolute top-1/2 -left-14 -translate-y-1/2 z-20 w-12 h-12 bg-gray-200/50 dark:bg-gray-700/50 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-600 dark:text-gray-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </div>
  ));
  const productImg = [...(product?.images || "")];

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={productImg[i]} />
        </a>
      );
    },
    appendDots: (dots) => (
      <div
        style={{
          backgroundColor: "#dddddd56",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <ul style={{ margin: "auto", display: "flex", alignItems: "center", overflow: "hidden" }}> {dots} </ul>
      </div>
    ),
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  const addCart = (item) => {
    // console.log(item)
    dispatch(addToCart(item));
    toast.success("Add to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart");
  };

  useMemo(() => {
    if (!getAllProduct.length) return;

    const getProduct = getAllProduct.filter((item) => item.id === id);

    if (getProduct.length > 0) {
      setProduct({
        title: getProduct[0]?.title || "",
        id: getProduct[0].id,
        quantity: getProduct[0].quantity,
        price: getProduct[0]?.price || "",
        images: getProduct[0]?.images || [],
        category: getProduct[0]?.category || "",
        description: getProduct[0]?.description || "",
        stock: getProduct[0]?.stock || "",
        time: getProduct[0]?.time,
        date: getProduct[0]?.date,
      });
      // setPrevCategory(getProduct[0]?.category || '');
    }
  }, [getAllProduct, id]);

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
      <section className="py-5 lg:py-16 dark:bg-[#2c2c2c]">
        {loading ? (
          <div className="text-center">
            {" "}
            <PropagateLoader color="#ec4899" />
          </div>
        ) : (
          <div className="max-w-6xl px-4 mx-auto">
            <div className="flex flex-wrap mb-24 -mx-4">
              <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                <div className="">
                  <div className="slider-container">
                    <Slider {...settings} className="">
                      {productImg.map((image) => (
                        <div className="bg-[#ddd] bg-opacity-40 dark:bg-opacity-20 p-2 rounded-lg">
                          <img className="w-full h-full rounded-lg" src={image} />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
              <div className="mt-20 md:mt-0 w-full px-4 md:w-1/2">
                <div className="lg:pl-20">
                  <div className="mb-3 md:mb-6">
                    <h2 className="max-w-xl mb-3 md:mb-6 text-lg font-semibold text-gray-700 md:text-xl dark:text-gray-300">{product?.title}</h2>
                    <p className="inline-block text-2xl font-semibold text-amber-500 ">
                      <span>₹{parseFloat(product?.price).toLocaleString()}</span>
                    </p>
                  </div>
                  <div className="mb-6">
                    <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400"> Description:</h2>
                    <p>{product?.description}</p>
                  </div>
                  <div className="mb-6 " />
                  <div className="flex flex-wrap items-center mb-6">
                    {cartItems.some((p) => p.id === product.id) ? (
                      <button
                        onClick={() => deleteCart(product)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-200 transition duration-300"
                      >
                        <ShoppingCart size={20} />
                        Delete from Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => addCart(product)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-200 transition duration-300"
                      >
                        <ShoppingCart size={20} />
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default ProductInfo;
