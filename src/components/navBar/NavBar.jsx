import React, { useState } from 'react';
import SearchBar from './SearchBar';
import DarkMode from './DarkMode';
import navbarImg from '../../assets/navbarImg.png';
import { FaCartShopping } from 'react-icons/fa6';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '../ui/navigation-menu';
import SideBar from './SideBar';
import Login from '@/pages/registration/Login';
import Signup from '@/pages/registration/Signup';

const MenuLinks = [
  // {
  //   id: 1,
  //   name: "Login",
  //   link: "/login",
  // },
  // {
  //   id: 2,
  //   name: "SignUp",
  //   link: "/signup",
  // },
  // {
  //   id: 3,
  //   name: "Home",
  //   link: "/",
  // },
  // {
  //   id: 4,
  //   name: "User Dashboard",
  //   link: "/user-dashboard",
  // },
  // {
  //   id: 5,
  //   name: "Shop",
  //   link: "/#shop",
  // },
  {
    id: 6,
    name: 'About',
    link: '/#about',
  },
];

const BannerImg = {
  backgroundImage: `url(${navbarImg})`,
  backgroundPosition: 'bottom',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '100%',
  width: '100%',
};

const NavBar = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const DropdownMenu = [
    {
      id: 'Fashion',
      title: 'Fashion',
      list: [
        { id: 'Mens wear', name: 'Mens wear', to: '/menswear' },
        { id: 'Womens wear', name: 'Womens wear', to: '/womenswear' },
        { id: 'Kids wear', name: 'Kids wear', to: '/kidswear' },
      ],
    },
    {
      id: 'Electronics',
      title: 'Electronics',
      list: [
        { id: 'Laptops', name: 'Laptops', to: '/laptop' },
        { id: 'Mobiles', name: 'Mobiles', to: '/mobiles' },
        { id: 'Home Appliences', name: 'Home Appliences', to: '/homeappliences' },
      ],
    },
    {
      id: 'Furnitures',
      title: 'Furnitures',
      list: [
        { id: 'Sofas', name: 'Sofas', to: '/sofas' },
        { id: 'Tables', name: 'Dinning Tables', to: '/tables' },
        { id: 'Beds', name: 'Beds', to: '/beds' },
      ],
    },
    {
      id: 'user',
      title: <img src="https://www.svgrepo.com/show/192244/man-user.svg" alt="" className="w-8 h-8" />,
      list: [
        {
          id: 'LogIn',
          name: 'LogIn',
          onClick: () => {
            setShowLogIn(!showLogIn);
          },
        },
        {
          id: 'SignUp',
          name: 'SignUp',
          onClick: () => {
            setShowSignUp(!showSignUp);
          },
        },
        { id: 'Userdashboard', name: 'User Dashboard', to: '/user-dashboard' },
      ],
    },
  ];

  return (
    <>
      <div style={BannerImg} className=" border-b-white border-b-4 dark:text-white transition-all duration-200 z-40 sticky top-0">
        <div className="py-2 md:py-4 px-2">
          {/* dekstop view */}
          <div className="hidden lg:flex justify-between items-center">
            {/* Logo and link section */}
            <div className="flex items-center gap-4">
              <Link to={'/'} className="text-white hover:text-[#e8c547] font-semibold tracking-widest text-2xl ">
                TrendTrove
              </Link>
              {/* Menu Items */}
              <div className="hidden md:block">
                <ul className="flex items-center gap-4">
                  {MenuLinks.map((data, index) => (
                    <li key={index}>
                      <a href={data.link} className="inline-block px-4 font-semibold text-gray-200 hover:text-amber-400 transition-all duration-200">
                        {' '}
                        {data.name}
                      </a>
                    </li>
                  ))}
                  {/* Dropdown */}
                  {DropdownMenu.map((category) => {
                    return (
                      <NavigationMenu key={category.id}>
                        <NavigationMenuList>
                          <NavigationMenuItem>
                            <NavigationMenuTrigger className="px-2 text-gray-200 hover:text-amber-400 duration-200">{category.title}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                              <ul className="grid w-[400px] gap-2 md:w-[200px] md:grid-rows-3 lg:w-max ">
                                {category.list.map((item) => (
                                  <Link key={item.id} {...item} className="hover:bg-amber-100 p-2 dark:hover:text-black">
                                    {item.name}
                                  </Link>
                                ))}
                              </ul>
                            </NavigationMenuContent>
                          </NavigationMenuItem>
                        </NavigationMenuList>
                      </NavigationMenu>
                    );
                  })}
                </ul>
              </div>
            </div>
            {/* Navbar right section */}
            <div className="flex justify-between items-center gap-4">
              {/* Search Bar section */}
              <SearchBar />
              {/* cart icon section */}
              <button className="relative p-3">
                <FaCartShopping className="text-xl text-gray-100 dark:text-gray-100" />
                <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">4</div>
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
            <div className="flex flex-row justify-between items-center w-full gap-20 sm:space-x-60">
              <div className="flex justify-between items-center">
                <GiHamburgerMenu
                  onClick={() => {
                    setShowSideBar(!showSideBar);
                  }}
                  className="text-white text-2xl mr-2 mt-1 cursor-pointer"
                />
                <Link to={'/'} className="text-white hover:text-[#e8c547] font-semibold tracking-widest text-2xl sm:text-3xl">
                  TrendTrove
                </Link>
              </div>

              <div className="flex justify-between items-center">
                {/* cart icon section */}
                <button className="relative p-3">
                  <FaCartShopping className="text-xl text-gray-100 dark:text-gray-100" />
                  <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">4</div>
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
