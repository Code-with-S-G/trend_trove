/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import navbarImg from "../../assets/navbarImg.png";
import logo from "../../assets/logo.png";
import { RxCross1 } from "react-icons/rx";
import { useContext } from "react";
import myContext from "@/context/myContext";
import { useState } from "react";
import toast from "react-hot-toast";
import { auth, fireDB } from "@/firebase/FirebaseConfig";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ScaleLoader } from "react-spinners";

const BannerImg = {
  backgroundImage: `url(${navbarImg})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "10%",
  width: "100%",
};

const Signup = ({ setShowSignUp }) => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const {showLogIn, setShowLogIn} = context;

  // User Signup State
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Customer",
  });

  /**========================================================================
   *                      User Signup Function
   *========================================================================**/

  const userSignupFunction = async (e) => {
    if (userSignup.name === "" || userSignup.email === "" || !userSignup.password.trim()) {
      return toast.error("All Fields are required!");
    }

    setLoading(true);
    const toastId = toast.loading("Creating your account..."); // Store the toast ID

    try {
      const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

      const userObject = {
        name: userSignup.name,
        email: users?.user?.email,
        role: userSignup.role,
        uid: users?.user?.uid,
        address:"",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const userRef = doc(fireDB, "users", userSignup.email);
      await setDoc(userRef, userObject);

      setUserSignup({
        name: "",
        email: "",
        password: "",
      });
      setShowSignUp(false);
      toast.success("Signup Successfully!", { id: toastId }); // Update existing toast
    } catch (error) {
      toast.error(error.message || "An error occurred during signup", { id: toastId }); // Update existing toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => {
        setShowSignUp(false);
      }}
      className="flex justify-center items-center h-screen  backdrop-filter backdrop-blur-xl bg-opacity-30 fixed top-0 z-40 w-screen"
    >
      {/* Signup Form */}
      <div onClick={(e) => e.stopPropagation()} className="flex flex-col bg-white/70 backdrop-filter backdrop-blur shadow-md w-full max-w-lg border border-pink-100 rounded-xl group">
        <div style={BannerImg} className="flex justify-center items-center space-x-3 py-2 rounded-t-xl">
          <img src={logo} alt="logo" className="h-10 w-10 ml-2" />
          <h1 className="text-white hover:text-[#e8c547] font-semibold tracking-widest text-2xl sm:text-3xl">TrendTrove</h1>
          <RxCross1 size={28} onClick={() => setShowSignUp(false)} className="absolute text-black right-4 transition-transform duration-300 ease-in-out group-hover:translate-x-[-10px] group-hover:text-amber-400 cursor-pointer" />
        </div>
        <div className="login_Form bg-white px-5 lg:px-8 py-6 border border-amber-100 shadow-md rounded-b-xl">
          {/* Top Heading */}
          <div className="mb-3 text-center">
            <h2 className="text-2xl font-bold text-black">SignUp</h2>
          </div>

          {/* Name Input */}
          <div className="mb-3">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
              Full Name
            </label>
            <input
              value={userSignup.name}
              onChange={(e) => setUserSignup({ ...userSignup, name: e.target.value })}
              id="name"
              type="text"
              placeholder="Full Name"
              className="bg-gray-50 text-black border border-amber-200 px-2 py-2 w-full rounded-md outline-none placeholder-gray-300"
            />
          </div>

          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email Address
            </label>
            <input
              value={userSignup.email}
              onChange={(e) => setUserSignup({ ...userSignup, email: e.target.value })}
              id="email"
              type="email"
              placeholder="Email Address"
              className="bg-gray-50 text-black border border-amber-200 px-2 py-2 w-full rounded-md outline-none placeholder-gray-300"
            />
          </div>

          {/* Password Input */}
          <div className="mb-5">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              value={userSignup.password}
              onChange={(e) => setUserSignup({ ...userSignup, password: e.target.value })}
              id="password"
              type="password"
              placeholder="Password"
              className="bg-gray-50 text-black border border-amber-200 px-2 py-2 w-full rounded-md outline-none placeholder-gray-300"
            />
          </div>

          {/* Signup Button */}
          <div className="mb-5">
            <button
              onClick={userSignupFunction}
              type="button"
              className="bg-gradient-to-r disabled:opacity-70 from-[#ff930f] to-[#e0da2f] hover:opacity-90 w-full text-white text-center py-2 font-bold rounded-md flex justify-center items-center transition-opacity duration-300"
              aria-label="Sign up button"
              disabled={loading} // Prevents multiple submissions
            >
              {loading ? <ScaleLoader height={20} color="#ffffff"/> : "SignUp"}
            </button>
          </div>

          {/* Login Prompt */}
          <div>
            <h2 className="text-black text-center">
              Have an account?{" "}
              <p
                className="text-amber-500 font-bold cursor-pointer"
                onClick={() => {
                  setShowSignUp(false);
                  setShowLogIn(true);
                }}
              >
                LogIn
              </p>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
