import React from "react";
import SearchBar from "./SearchBar";
import DarkMode from "./DarkMode";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";

const MenuLinks = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "Shop",
    link: "/#shop",
  },
  {
    id: 3,
    name: "About",
    link: "/#about",
  },
];

const DropdownMenu = [
  {
    id: 1,
    title: "Fashion",
    list: [
      { id: 1, name: "Mens wear", link: "/menswear" },
      { id: 2, name: "Womens wear", link: "/womenswear" },
      { id: 3, name: "Kids wear", link: "/kidswear" },
    ],
  },
  {
    id: 2,
    title: "Electronics",
    list: [
      { id: 1, name: "Laptops", link: "/laptop" },
      { id: 2, name: "Mobiles", link: "/mobiles" },
      { id: 3, name: "Home Appliences", link: "/homeappliences" },
    ],
  },
  {
    id: 3,
    title: "Furnitures",
    list: [
      { id: 1, name: "Sofas", link: "/sofas" },
      { id: 2, name: "Tables", link: "/tables" },
      { id: 3, name: "Beds", link: "/beds" },
    ],
  },
];

const NavBar = () => {
  return (
    <div className="bg-white border-b-white border-b-4 dark:bg-gray-900 dark:text-white transition-all duration-200 z-40 sticky top-0">
      <div className="py-4 px-2">
        <div className="flex justify-between items-center">
          {/* Logo and link section */}
          <div className="flex items-center gap-4">
            <Link to={"/"} className="text-[#f42c37] font-semibold tracking-widest text-2xl sm:text-3xl">
              TrendTrove
            </Link>
            {/* Menu Items */}
            <div className="hidden lg:block">
              <ul className="flex items-center gap-4">
                {MenuLinks.map((data, index) => (
                  <li key={index}>
                    <a href={data.link} className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white transition-all duration-200">
                      {" "}
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
                          <NavigationMenuTrigger className="px-2 text-gray-500 hover:text-black dark:hover:text-white duration-200">{category.title}</NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-2 p-4 md:w-[200px] md:grid-rows-3 lg:w-max ">
                              {category.list.map((item) => (
                                <Link key={item.id} to={item.link}>
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
              <FaCartShopping className="text-xl text-gray-600 dark:text-gray-400" />
              <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">4</div>
            </button>
            {/* Dark Mode secttion */}
            <div>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
