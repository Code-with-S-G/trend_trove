/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import navbarImg from "../../assets/navbarImg.png";
import logo from "../../assets/logo.png"; 

const BannerImg = {
  backgroundImage: `url(${navbarImg})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "10%",
  width: "100%", 
};

const Signup = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-50">
      {/* Login Form */}
      <div className="flex flex-col bg-white shadow-md w-full max-w-md border border-pink-100 rounded-xl">
      <div style={BannerImg} className="flex justify-center items-center space-x-3 py-2 rounded-t-xl">
            <img src={logo} alt="logo" className="h-10 w-10 ml-2" />
            <h1 className="text-white hover:text-[#e8c547] font-semibold tracking-widest text-2xl sm:text-3xl">
              TrendTrove
            </h1>
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
            id="name"
            type="text"
            placeholder="Full Name"
             className="bg-gray-50 border border-amber-200 px-2 py-2 w-full rounded-md outline-none placeholder-gray-300"
          />
        </div>

        {/* Email Input */}
        <div className="mb-3">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email Address"
             className="bg-gray-50 border border-amber-200 px-2 py-2 w-full rounded-md outline-none placeholder-gray-300"
          />
        </div>

        {/* Password Input */}
        <div className="mb-5">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="bg-gray-50 border border-amber-200 px-2 py-2 w-full rounded-md outline-none placeholder-gray-300"
          />
        </div>

        {/* Signup Button */}
        <div className="mb-5">
          <button
            type="button"
            className="bg-gradient-to-r from-[#ff930f] to-[#e0da2f] hover:opacity-90 w-full text-white text-center py-2 font-bold rounded-md"
          >
            SignUp
          </button>
        </div>

        {/* Login Prompt */}
        <div>
          <h2 className="text-black text-center">
            Have an account?{" "}
            <Link className="text-amber-500 font-bold" to={"/login"}>
              LogIn
            </Link>
          </h2>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Signup;
