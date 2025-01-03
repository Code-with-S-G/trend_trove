import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import DarkMode from "./DarkMode";
import navbarImg from "../../assets/navbarImg.png";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import SideBar from "./SideBar";
import Login from "@/pages/registration/Login";
import Signup from "@/pages/registration/Signup";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "@/firebase/FirebaseConfig";
import { setCart } from "@/redux/cartSlice";

// const MenuLinks = [
//   // {
//   //   id: 1,
//   //   name: "Login",
//   //   link: "/login",
//   // },
//   {
//     id: 2,
//     name: "Admin",
//     link: "/admin-dashboard",
//   },
//   // {
//   //   id: 3,
//   //   name: "Home",
//   //   link: "/",
//   // },
//   {
//     id: 4,
//     name: "All Products",
//     link: "/allproduct",
//   },
//   // {
//   //   id: 5,
//   //   name: "Shop",
//   //   link: "/#shop",
//   // },
//   {
//     id: 6,
//     name: "About",
//     link: "/#about",
//   },
// ];

const BannerImg = {
  backgroundImage: `url(${navbarImg})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const NavBar = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  // get user from localStorage
  const user = JSON.parse(localStorage.getItem("users"));
  // navigate
  const navigate = useNavigate();
  // CartItems
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const DropdownMenu = [
    {
      id: "fashion",
      title: "Fashion",
      list: [
        { id: "mens-wear", name: "Mens wear", to: "/menswear" },
        { id: "womens-wear", name: "Womens wear", to: "/womenswear" },
        { id: "kids-wear", name: "Kids wear", to: "/kidswear" },
      ],
    },
    {
      id: "electronics",
      title: "Electronics",
      list: [
        { id: "laptops", name: "Laptops", to: "/laptop" },
        { id: "mobiles", name: "Mobiles", to: "/mobiles" },
        { id: "home-appliences", name: "Home Appliences", to: "/homeappliences" },
      ],
    },
    {
      id: "furnitures",
      title: "Furnitures",
      list: [
        { id: "sofas", name: "Sofas", to: "/sofas" },
        { id: "tables", name: "Dinning Tables", to: "/tables" },
        { id: "beds", name: "Beds", to: "/beds" },
      ],
    },
    {
      id: "all-products",
      title: "Store",
      link: "/allproduct",
    },
    {
      id: "user",
      title: <img src="https://www.svgrepo.com/show/192244/man-user.svg" alt="" className="w-8 h-8" />,
      list: [
        user
          ? {
              id: "Logout",
              name: "Logout",
              onClick: () => {
                localStorage.removeItem("users"); // Remove the user from localStorage
                window.location.reload(); // Reload the page
              },
            }
          : [
              {
                id: "LogIn",
                name: "LogIn",
                onClick: () => {
                  setShowLogIn(!showLogIn);
                },
              },
              {
                id: "SignUp",
                name: "SignUp",
                onClick: () => {
                  setShowSignUp(!showSignUp);
                },
              },
            ],
        user?.role === "Customer" && { id: "Userdashboard", name: "User Dashboard", to: "/user-dashboard" },
        user?.role === "Admin" && { id: "admin", name: "Admin Dashboard", to: "/admin-dashboard" },
      ]
        .flat()
        .filter(Boolean),
    },
  ];

  useEffect(() => {
    const fetchCart = async (userEmail) => {
      try {
        const cartDoc = await getDoc(doc(fireDB, "cart", userEmail));
        if (cartDoc.exists()) {
          dispatch(setCart(cartDoc.data().cart || []));
          console.log(cartDoc.data().cart);
          
        } else {
          dispatch(setCart([]));
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart(user.email);
  }, []);

  return (
    <>
      <div style={BannerImg} className=" border-b-white border-b-4 dark:text-white transition-all duration-200 z-40 sticky top-0">
        <div className="py-2 lg:py-4 px-2">
          {/* dekstop view */}
          <div className="hidden lg:flex justify-between items-center">
            {/* Logo and link section */}
            <div className="flex items-center gap-4">
              <Link to={"/"} className="text-white hover:text-[#e8c547] font-semibold tracking-widest text-2xl ">
                TrendTrove
              </Link>
              {/* Menu Items */}
              <div className="hidden md:block">
                <ul className="flex items-center mt-2 gap-2 xl:gap-6">
                  {/* {MenuLinks.map((data) => (
                    <li key={data.name}>
                      <Link to={data.link} className="inline-block px-4 font-semibold text-gray-200 hover:text-amber-400 transition-all duration-200">
                        {" "}
                        {data.name}
                      </Link>
                    </li>
                  ))} */}
                  {/* Dropdown */}
                  {DropdownMenu.map((category) => {
                    return (
                      <NavigationMenu key={category.id}>
                        <NavigationMenuList>
                          <NavigationMenuItem>
                            {category?.link ? (
                              <li key={category?.id}>
                                <Link to={category?.link} className="inline-block px-2 font-semibold text-gray-200 hover:text-amber-400 transition-all duration-200">
                                  {" "}
                                  {category?.title}
                                </Link>
                              </li>
                            ) : (
                              <>
                                <NavigationMenuTrigger className="px-2 text-gray-200 hover:text-amber-400 duration-200">{category.title}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                  <ul className="grid w-[400px] gap-2 md:w-[200px] lg:w-max ">
                                    {category.list.map((item) => (
                                      <Link key={item.id} {...item} className="hover:bg-amber-100 p-2 dark:hover:text-black">
                                        {item.name}
                                      </Link>
                                    ))}
                                  </ul>
                                </NavigationMenuContent>
                              </>
                            )}
                          </NavigationMenuItem>
                        </NavigationMenuList>
                      </NavigationMenu>
                    );
                  })}
                </ul>
              </div>
            </div>
            {/* Navbar right section */}
            <div className="flex justify-between items-center gap-2">
              {/* Search Bar section */}
              <SearchBar />
              {/* cart icon section */}
              <button className="relative p-3">
                <FaCartShopping className="text-xl text-gray-100 dark:text-gray-100" />
                <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">{cartItems.length}</div>
              </button>
              {/* Dark Mode secttion */}
              <div>
                <DarkMode />
              </div>
            </div>
          </div>
          {/* Mobile view */}
          <div className="lg:hidden flex flex-col justify-between items-center gap-2">
            {/* Logo, cart and dark mode section */}
            <div className="flex flex-row justify-between items-center w-full  sm:space-x-60">
              <div className="flex justify-between items-center">
                <GiHamburgerMenu
                  onClick={() => {
                    setShowSideBar(!showSideBar);
                  }}
                  className="text-white text-2xl mr-2 mt-1 cursor-pointer"
                />
                <Link to={"/"} className="text-white hover:text-[#e8c547] font-semibold tracking-widest text-2xl sm:text-3xl">
                  TrendTrove
                </Link>
              </div>

              <div className="flex justify-between items-center">
                {/* cart icon section */}
                <button className="relative p-3">
                  <FaCartShopping className="text-xl text-gray-100 dark:text-gray-100" />
                  <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">{cartItems.length}</div>
                </button>
                {/* Dark Mode secttion */}
                <div>
                  <DarkMode />
                </div>
              </div>
            </div>
            {/*Down Navbar section */}
            {/* Search Bar section */}
            <SearchBar />
          </div>
        </div>
      </div>
      {showSideBar && <SideBar setShowSideBar={setShowSideBar} setShowLogIn={setShowLogIn} setShowSignUp={setShowSignUp} />}
      {showLogIn && <Login setShowLogIn={setShowLogIn} setShowSignUp={setShowSignUp} />}
      {showSignUp && <Signup setShowLogIn={setShowLogIn} setShowSignUp={setShowSignUp} />}
    </>
  );
};

export default NavBar;
