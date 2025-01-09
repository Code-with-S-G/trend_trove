import React, { useEffect, useState } from "react";
import navbarImg from "../../assets/navbarImg.png";
import logo from "../../assets/logo.png";
import { RxCross1 } from "react-icons/rx";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { fireDB } from "@/firebase/FirebaseConfig";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";

const BannerImg = {
  backgroundImage: `url(${navbarImg})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "10%",
  width: "100%",
};

const SelectAddressModal = ({ setShowSelectAddress, setShowAddAddress }) => {
  // get user from localStorage
  const user = JSON.parse(localStorage.getItem("users"));
  const [addressesArray, setAddressesArray] = useState([]);

  const selectAddressHandler = async (address) => {
    if (!user || !user.email) {
      toast.error("User information is missing. Please log in again.");
      return;
    }

    try {
      // Update the user's address in Firestore
      await updateDoc(doc(fireDB, "users", user.email), { address });

      toast.success("Address selected successfully!");
      setShowSelectAddress(false);
    } catch (error) {
      console.error("Error selecting address:", error);
      toast.error("Failed to select the address. Please try again later!");
    }
  };

  const deleteAddress = async (address) => {

    if (!user || !user.email) {
      toast.error("User information is missing. Please log in again.");
      return;
    }
    if (user.address.id === address.id) {
      await updateDoc(doc(fireDB, "users", user.email), { address: "" });
    }

    try {
      const newAddressArray = addressesArray.filter((item) => item.id !== address.id);
      await updateDoc(doc(fireDB, "address", user.email), { address: arrayRemove(address) });

      toast.success("Address removed successfully!");
      setAddressesArray(newAddressArray);
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to remove the address. Please try again later!");
    }
  };

  useEffect(() => {
    const fetchAddress = async (userEmail) => {
      try {
        const addressDoc = await getDoc(doc(fireDB, "address", userEmail));
        if (addressDoc.exists()) {
          setAddressesArray(addressDoc.data().address || []);
        } else {
          setAddressesArray([]);
        }
      } catch (error) {
        console.error("Error fetching Address:", error);
      }
    };
    fetchAddress(user?.email);
  }, []);

  return (
    <div
      onClick={() => {
        setShowSelectAddress(false);
      }}
      className="flex justify-center items-center h-screen  backdrop-filter backdrop-blur-xl bg-opacity-30 fixed top-0 z-40 w-screen"
    >
      {/* Address Form */}
      <div onClick={(e) => e.stopPropagation()} className="flex flex-col bg-white/70 backdrop-filter backdrop-blur shadow-md w-full max-w-lg border border-pink-100 rounded-xl group">
        <div style={BannerImg} className="flex justify-center items-center space-x-3 py-2 rounded-t-xl">
          <img src={logo} alt="logo" className="h-10 w-10 ml-2" />
          <h1 className="text-white hover:text-[#e8c547] font-semibold tracking-widest text-2xl sm:text-3xl">TrendTrove</h1>
          <RxCross1 size={28} onClick={() => setShowSelectAddress(false)} className="absolute text-black right-4 transition-transform duration-300 ease-in-out group-hover:translate-x-[-10px] group-hover:text-amber-400 cursor-pointer" />
        </div>
        <div className="h-96 overflow-y-auto custom-scrollbar bg-white px-5 lg:px-8 pt-2 pb-4 border border-amber-100 shadow-md rounded-b-xl">
          {/* Top Heading */}
          <div className="mb-3 text-center">
            <h2 className="text-2xl font-bold text-black">Select Address</h2>
          </div>

          {addressesArray.map((address) => (
            <div onClick={() => selectAddressHandler(address)} key={address.id} className="flex items-start justify-between mb-4 p-3 rounded-lg bg-stone-100 shadow-sm hover:shadow-md hover:bg-stone-200 transition-all cursor-pointer">
              <div className="flex flex-col text-gray-800 space-y-1">
                {address.house && <span className="font-medium">{address.house}</span>}
                {address.building && <span>{address.building}</span>}
                {address.landmark && <span className="text-gray-600">Near {address.landmark}</span>}
                <div className="flex gap-2 mt-1 text-sm text-gray-500">
                  {address.pincode && <span>{address.pincode}</span>}
                  {address.number && <span>•</span>}
                  {address.number && <span>{address.number}</span>}
                </div>
                {address.addressLabel && <span className="mt-2 text-sm font-medium text-blue-600">{address.addressLabel}</span>}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteAddress(address);
                }}
                type="button"
                className="flex items-center space-x-1 px-2 py-1 hover:bg-red-100"
              >
                <Trash size={12} className="text-red-500" />
                <span className="text-xs font-medium text-red-500">Remove</span>
              </button>
            </div>
          ))}

          {/* Select Address Prompt */}
          <div>
            <h2 className="text-black text-center">
              Want to add a new Address?{" "}
              <p
                className="text-amber-500 font-bold cursor-pointer"
                onClick={() => {
                  setShowAddAddress(true);
                  setShowSelectAddress(false);
                }}
              >
                Add Address
              </p>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectAddressModal;
