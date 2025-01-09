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

const AddAddressModal = ({ setShowSelectAddress, setShowAddAddress }) => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  // get user from localStorage
  const user = JSON.parse(localStorage.getItem("users"));

  // Address State
  const [address, setAddress] = useState({
    id: Math.random() * 100000000,
    house: "",
    building: "",
    landmark: "",
    number: "",
    pincode: "",
    addressLabel: "",
  });

  /**========================================================================
   *                      User Address Function
   *========================================================================**/

  const addAddressFunction = async (e) => {
    if (address.house == "" || address.building == "" || address.landmark == "" || address.number == "" || address.addressLabel == "" || address.pincode == "") {
      return toast.error("all fields are required");
    }
    setLoading(true);

    try {
      const addressDoc = await getDoc(doc(fireDB, "address", user.email));
      const addressArray = addressDoc.data()?.address || [];
      await setDoc(doc(fireDB, "address", user.email), { address: [...addressArray, address] });
      await updateDoc(doc(fireDB, "users", user.email), { address: address });

      toast.success("Address added successfully!");
      setLoading(false);
      setAddress({
        id: Math.random() * 100000000,
        house: "",
        building: "",
        landmark: "",
        number: "",
        pincode: "",
        addressLabel: "",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to add the address. Please try again later!");
    }
  };

  return (
    <div
      onClick={() => {
        setShowAddAddress(false);
      }}
      className="flex justify-center items-center h-screen  backdrop-filter backdrop-blur-xl bg-opacity-30 fixed top-0 z-40 w-screen"
    >
      {/* Address Form */}
      <div onClick={(e) => e.stopPropagation()} className="flex flex-col bg-white/70 backdrop-filter backdrop-blur shadow-md w-full max-w-lg border border-pink-100 rounded-xl group">
        <div style={BannerImg} className="flex justify-center items-center space-x-3 py-2 rounded-t-xl">
          <img src={logo} alt="logo" className="h-10 w-10 ml-2" />
          <h1 className="text-white hover:text-[#e8c547] font-semibold tracking-widest text-2xl sm:text-3xl">TrendTrove</h1>
          <RxCross1 size={28} onClick={() => setShowAddAddress(false)} className="absolute text-black right-4 transition-transform duration-300 ease-in-out group-hover:translate-x-[-10px] group-hover:text-amber-400 cursor-pointer" />
        </div>
        <div className="h-96 overflow-y-auto custom-scrollbar bg-white px-5 lg:px-8 pt-2 pb-4 border border-amber-100 shadow-md rounded-b-xl">
          {/* Top Heading */}
          <div className="mb-3 text-center">
            <h2 className="text-2xl font-bold text-black">Add Address</h2>
          </div>

          {/* House Number & Floor Input */}
          <div className="mb-3">
            <label htmlFor="house" className="block text-gray-700 font-semibold mb-1">
              House Number & Floor
            </label>
            <input
              value={address.house}
              onChange={(e) => setAddress({ ...address, house: e.target.value })}
              id="house"
              type="text"
              placeholder="House Number & Floor"
              className="bg-gray-50 text-black border border-amber-200 px-2 py-2 w-full rounded-md outline-none placeholder-gray-300"
            />
          </div>

          {/* Building & Block Number Input */}
          <div className="mb-3">
            <label htmlFor="building" className="block text-gray-700 font-semibold mb-1">
              Building & Block Number
            </label>
            <input
              value={address.building}
              onChange={(e) => setAddress({ ...address, building: e.target.value })}
              id="building"
              type="text"
              placeholder="Building & Block Number"
              className="bg-gray-50 text-black border border-amber-200 px-2 py-2 w-full rounded-md outline-none placeholder-gray-300"
            />
          </div>

          {/* Landmark & Area Name Input */}
          <div className="mb-3">
            <label htmlFor="landmark" className="block text-gray-700 font-semibold mb-1">
              Landmark & Area Name
            </label>
            <input
              value={address.landmark}
              onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
              id="landmark"
              type="text"
              placeholder="Landmark & Area Name"
              className="bg-gray-50 text-black border border-amber-200 px-2 py-2 w-full rounded-md outline-none placeholder-gray-300"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pincode" className="block text-gray-700 font-semibold mb-1">
              Pincode
            </label>
            <input
              value={address.pincode}
              onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
              id="pincode"
              type="number"
              placeholder="Pincode"
              className="bg-gray-50 text-black border border-amber-200 px-2 py-2 w-full rounded-md outline-none placeholder-gray-300"
            />
          </div>
          {/* Phone Number Input */}
          <div className="mb-3">
            <label htmlFor="number" className="block text-gray-700 font-semibold mb-1">
              Phone Number
            </label>
            <input
              value={address.number}
              onChange={(e) => setAddress({ ...address, number: e.target.value })}
              id="number"
              type="number"
              placeholder="Phone Number"
              className="bg-gray-50 text-black border border-amber-200 px-2 py-2 w-full rounded-md outline-none placeholder-gray-300"
            />
          </div>
          {/* Address Label Input */}
          <div className="mb-3">
            <label htmlFor="address-lable" className="block text-gray-700 font-semibold mb-1">
              Address Label
            </label>
            <select
              value={address.addressLabel}
              onChange={(e) => setAddress({ ...address, addressLabel: e.target.value })}
              id="address-label"
              className="bg-gray-50 text-black border border-amber-200 px-2 py-2 w-full rounded-md outline-none placeholder-gray-300"
            >
              <option value="">Select a Label</option>
              {["Home", "Work", "Others"].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Add Address Button */}
          <div
            className="mb-3
          "
          >
            <button
              onClick={addAddressFunction}
              type="button"
              className="bg-gradient-to-r disabled:opacity-70 from-[#ff930f] to-[#e0da2f] hover:opacity-90 w-full text-white text-center py-2 font-bold rounded-md flex justify-center items-center transition-opacity duration-300"
              aria-label="Sign up button"
              disabled={loading} // Prevents multiple submissions
            >
              {loading ? <ScaleLoader height={21} color="#ffffff" /> : "+ Add Address"}
            </button>
          </div>

          {/* Select Address Prompt */}
          <div>
            <h2 className="text-black text-center">
              Address already saved?{" "}
              <p
                className="text-amber-500 font-bold cursor-pointer"
                onClick={() => {
                  setShowAddAddress(false);
                  setShowSelectAddress(true);
                }}
              >
                Select Address
              </p>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddressModal;
