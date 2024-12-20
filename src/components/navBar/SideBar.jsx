import React from "react";
import logo from "../../assets/logo.png";
import navbarImg from "../../assets/navbarImg.png";
import { Link } from "react-router-dom";

const SideBarMenu = [
    {
        id: "sUserdashboard",
        name: "User Dashboard",
        link: "/user-dashboard",
    },
    {
        id: "sMen Wear",
        name: "Men Wear",
        link: "/menswear"
    },
    {
        id: "sWomen Wear",
        name: "Women Wear",
        link: "/womenswear"
    },
    {
        id: "sKids Wear",
        name: "Kids Wear",
        link: "/kidswear"
    },
    {
        id: "slaptops",
        name: "Laptops",
        link: "/laptop"
    },
    {
        id: "smobiles",
        name: "Mobiles",
        link: "/mobiles"
    },
    {
        id: "shomeappliences",
        name: "Home Appliences",
        link: "/homeappliences"
    },
    {
        id: "ssofas",
        name: "Sofas",
        link: "/sofas"
    },
    {
        id: "stables",
        name: "Dinning Tables",
        link: "/tables"
    },
    {
        id: "sbeds",
        name: "Beds",
        link: "/beds"
    },
    {
        id: "sLogIn",
        name: "LogIn",
        link: "/login",
    },
    {
        id: "sSignUp",
        name: "SignUp",
        link: "/signup",
    }
]

const BannerImg = {
  backgroundImage: `url(${navbarImg})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "10%",
  width: "100%", 
};
const SideBar = ({setShowSideBar}) => {
    return <>
        <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowSideBar(false)}
        ></div>
        <div className="lg:hidden fixed top-0 left-0 h-full w-64 bg-slate-100 z-50 shadow-lg">
            <div style={BannerImg} className="flex items-center space-x-3">
                <img src={logo} alt="logo" className="h-10 w-10 ml-2" />
                <Link to={"/"} className="text-white hover:text-[#e8c547] font-semibold tracking-widest text-2xl sm:text-3xl">
              TrendTrove
            </Link>
            </div>
            <ul className="divide-y divide-gray-300 mt-2">
                {SideBarMenu.map((data, index) => (
                    <li key={data.id}>
                        <a href={data.link} className="block px-4 py-2 font-semibold text-gray-700 hover:text-amber-400 transition-all duration-200">
                            {" "}
                            {data.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </>
}

export default SideBar;