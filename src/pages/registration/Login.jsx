/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import navbarImg from "../../assets/navbarImg.png";
import logo from "../../assets/logo.png";
import { RxCross1 } from "react-icons/rx";
import { useContext, useState } from "react";
import myContext from "@/context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "@/firebase/FirebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const BannerImg = {
  backgroundImage: `url(${navbarImg})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "10%",
  width: "100%",
};

const Login = ({ setShowLogIn, setShowSignUp }) => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // User Signup State
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  // navigate 
  const navigate = useNavigate();

  /**========================================================================
   *                      User Login Function
   *========================================================================**/

  const userLoginFunction = async (e) => {
    // validation
    if (userLogin.email === "" || !userLogin.password.trim()) {
      return toast.error("All Fields are required");
    }
    setLoading(true);
    const toastId = toast.loading("Authenticating... Please wait."); // Store the toast ID
    try {
      const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
      // console.log(users.user)

      try {
        const q = query(collection(fireDB, "users"), where("uid", "==", users?.user?.uid));
        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          console.log(QuerySnapshot);
          
          QuerySnapshot.docs.forEach((doc) => (user = doc.data()));
          localStorage.setItem("users", JSON.stringify(user));
          setUserLogin({
            email: "",
            password: "",
          });
          toast.success("Login Successfully", { id: toastId });
          setLoading(false);
          console.log(user);
          
          if (user.role === "Customer") {
            navigate("/");
          } else {
            navigate("/admin-dashboard");
          }
        });
        // return () => data;
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      setShowLogIn(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message || "An error occurred during Login", { id: toastId }); // Update existing toast
    }
  };

  return (
    <div
      onClick={() => {
        setShowLogIn(false);
      }}
      className="flex justify-center items-center h-screen backdrop-filter backdrop-blur-xl bg-opacity-30 fixed top-0 z-40 w-screen"
    >
      {/* Login Form */}
      <div onClick={(e) => e.stopPropagation()} className="flex flex-col bg-white/70 backdrop-filter backdrop-blur shadow-md w-full max-w-lg border border-pink-100 rounded-xl group">
        <div style={BannerImg} className="flex justify-center items-center gap-2 py-2 px-4 rounded-t-xl relative">
          <img src={logo} alt="logo" className="h-10 w-10 ml-2" />
          <h1 className="text-white group-hover:text-[#e8c547] font-semibold tracking-widest text-2xl sm:text-3xl transition-colors duration-300 ease-in-out">TrendTrove</h1>
          <RxCross1 size={28} onClick={() => setShowLogIn(false)} className="absolute text-black right-4 transition-transform duration-300 ease-in-out group-hover:translate-x-[-10px] group-hover:text-amber-400 cursor-pointer" />
        </div>
        <div className="login_Form bg-white px-5 lg:px-8 py-6 border border-amber-100 shadow-md rounded-b-xl">
          {/* Top Heading */}
          <div className="mb-3 text-center">
            <h2 className="text-2xl font-bold text-black">Login</h2>
          </div>

          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email Address
            </label>
            <input
              value={userLogin.email}
              onChange={(e) => {
                setUserLogin({
                  ...userLogin,
                  email: e.target.value,
                });
              }}
              id="email"
              type="email"
              placeholder="Email Address"
              className="bg-gray-50 border text-black border-amber-200 px-2 py-2 w-full rounded-md outline-none placeholder-gray-300"
            />
          </div>

          {/* Password Input */}
          <div className="mb-5">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              value={userLogin.password}
              onChange={(e) => {
                setUserLogin({
                  ...userLogin,
                  password: e.target.value,
                });
              }}
              id="password"
              type="password"
              placeholder="Password"
              className="bg-gray-50 text-black border border-amber-200 px-2 py-2 w-full rounded-md outline-none placeholder-gray-300"
            />
          </div>

          {/* Login Button */}
          <div className="mb-5">
            <button onClick={userLoginFunction} type="button" className="bg-gradient-to-r from-[#ff930f] to-[#e0da2f] hover:opacity-90 w-full text-white text-center py-2 shadow-2xl font-bold rounded-md">
              Login
            </button>
          </div>

          {/* Signup Prompt */}
          <div>
            <h2 className="text-black text-center">
              Don't have an account?{" "}
              <p
                className="text-amber-500 font-bold cursor-pointer"
                onClick={() => {
                  setShowSignUp(true);
                  setShowLogIn(false);
                }}
              >
                Signup
              </p>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
