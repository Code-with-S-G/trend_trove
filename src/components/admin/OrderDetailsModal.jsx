import React, { useContext, useEffect, useState } from "react";
import navbarImg from "../../assets/navbarImg.png";
import logo from "../../assets/logo.png";
import { RxCross1 } from "react-icons/rx";
import { ScaleLoader } from "react-spinners";
import myContext from "@/context/myContext";
import toast from "react-hot-toast";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { fireDB } from "@/firebase/FirebaseConfig";

const BannerImg = {
    backgroundImage: `url(${navbarImg})`,
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "10%",
    width: "100%",
};

const OrderDetailsModal = ({ showOrderDetails, setShowOrderDetails, cartItems, addressInfo }) => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    // get user from localStorage
    const user = JSON.parse(localStorage.getItem("users"));

    return (
        <div
            onClick={() => {
                setShowOrderDetails(false);
            }}
            className="flex justify-center items-center h-screen  backdrop-filter backdrop-blur-xl bg-opacity-30 fixed top-0 left-0 z-40 w-screen"
        >
            {/* Order Details */}
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col bg-white/70 backdrop-filter backdrop-blur shadow-md w-full max-w-lg border border-pink-100 rounded-xl group">
                <div style={BannerImg} className="flex justify-center items-center space-x-3 py-2 rounded-t-xl">
                    <img src={logo} alt="logo" className="h-10 w-10 ml-2" />
                    <h1 className="text-white hover:text-[#e8c547] font-semibold tracking-widest text-2xl sm:text-3xl">TrendTrove</h1>
                    <RxCross1 size={28} onClick={() => { setShowOrderDetails(false) }} className="absolute text-black right-4 transition-transform duration-300 ease-in-out group-hover:translate-x-[-10px] group-hover:text-amber-400 cursor-pointer" />
                </div>
                <div className="h-96 overflow-y-auto custom-scrollbar bg-white px-5 lg:px-8 pt-2 pb-4 border border-amber-100 shadow-md rounded-b-xl">
                    {/* Top Heading */}
                    <div className="mb-3 text-center border-b-2 border-dashed dark:border-gray-300 pb-2">
                        <h2 className="text-2xl font-bold text-black">Cart Details</h2>
                    </div>

                    {cartItems.map((item) => {
                        const { orderId, date, quantity, price, title, images, category } = item;
                        return (
                            <div key={orderId} className="flex-1 border-dashed border-b-2 dark:border-gray-300">
                                <div className="p-2 sm:p-8">
                                    <ul className="-my-7 divide-y divide-gray-200">
                                        <li className="flex flex-col justify-between space-x-5 py-7">
                                            <div className="flex flex-col sm:flex-row sm:flex-1 items-stretch">
                                                <div className="flex sm:flex-shrink-0 mb-2 lg:mb-0 justify-center sm:justify-normal">
                                                    <img className="h-32 w-32 rounded-lg border border-gray-200 object-cover" src={images[0]} alt="img" />
                                                </div>

                                                <div className="ml-1 md:ml-5 flex flex-col justify-between">
                                                    <div className="flex-1">
                                                        <p className="text-xs sm:text-sm font-bold text-gray-900">{title}</p>
                                                        <p className="mt-1.5 text-xs font-medium text-gray-500">{category}</p>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="ml-auto flex flex-row justify-between">
                                                <p className="mt-1 text-sm font-medium text-gray-500">x {quantity}</p>
                                                <p className="text-right text-sm font-bold text-gray-900">₹{parseFloat(price * quantity * 0.8).toLocaleString()}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                    {/* {Address Section} */}
                    <div className="my-3 text-center">
                        <h2 className="text-2xl font-bold text-black">Address Details</h2>
                    </div>
                    <div className="p-4 bg-gray-100 rounded-lg shadow-md border border-gray-300">
                        <p className="text-lg font-medium text-gray-800 mb-2">
                            {addressInfo.name}
                        </p>
                        <p className="text-sm text-gray-600">
                            {`${addressInfo.house}, ${addressInfo.building}`}
                        </p>
                        <p className="text-sm text-gray-600">{`${addressInfo.landmark}`}</p>
                        <p className="text-sm text-gray-600">{`Pincode: ${addressInfo.pincode}`}</p>
                        <p className="text-sm text-gray-600">{`Phone: ${addressInfo.number}`}</p>
                        <div className="mt-2 flex justify-start items-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {addressInfo.addressLabel}
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;
