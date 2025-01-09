import React, { useContext } from 'react';
import logo from '../../assets/logo.png';
import navbarImg from '../../assets/navbarImg.png';
import { Link } from 'react-router-dom';
import { RxCross1 } from 'react-icons/rx';
import myContext from '@/context/myContext';

const BannerImg = {
  backgroundImage: `url(${navbarImg})`,
  backgroundPosition: 'bottom',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '10%',
  width: '100%',
};
const SideBar = ({ setShowSideBar, setShowSignUp }) => {

  const user = JSON.parse(localStorage.getItem("users"));
  const context = useContext(myContext);
  const { showLogIn, setShowLogIn} = context;

  const SideBarMenu = [
    {
      id: 'sStore',
      name: 'Store',
      to: '/allproduct',
    },
    {
      id: 'sMen Wear',
      name: 'Men Wear',
      to: '/category/Mens wear',
    },
    {
      id: 'sWomen Wear',
      name: 'Women Wear',
      to: '/category/Womens wear',
    },
    {
      id: 'sKids Wear',
      name: 'Kids Wear',
      to: '/category/Kids wear',
    },
    {
      id: 'slaptops',
      name: 'Laptops',
      to: '/category/Laptops',
    },
    {
      id: 'smobiles',
      name: 'Mobiles',
      to: '/category/Mobiles',
    },
    {
      id: 'shomeappliences',
      name: 'Home Appliences',
      to: '/category/Home Appliences',
    },
    {
      id: 'ssofas',
      name: 'Sofas',
      to: '/category/Sofas',
    },
    {
      id: 'stables',
      name: 'Dinning Tables',
      to: '/category/Dinning Tables',
    },
    {
      id: 'sbeds',
      name: 'Beds',
      to: '/category/Beds',
    },
    !user &&  {
      id: 'sLogIn',
      name: 'LogIn',
      onClick: () => {
        setShowLogIn(true);
        setShowSideBar(false);
      },
    },
    !user &&  {
      id: 'sSignUp',
      name: 'SignUp',
      onClick: () => {
        setShowSignUp(true);
        setShowSideBar(false);
      },
    },
    user?.role === "Customer" && {
      id: 'sUserdashboard',
      name: 'User Dashboard',
      to: '/user-dashboard',
    },
    user?.role === "Admin" && {
      id: 'sAdmindashboard',
      name: 'Admin Dashboard',
      to: '/admin-dashboard',
    },
    user &&{
      id: 'sLogout',
      name: 'Logout',
      onClick: () => {
        localStorage.removeItem("users"); // Remove the user from localStorage
        window.location.reload(); // Reload the page
      }
    }
  ].filter(Boolean);

  return (
    <>
      <div className="lg:hidden fixed inset-0 bg-black backdrop-filter backdrop-blur-lg bg-opacity-50 z-40" onClick={() => setShowSideBar(false)}></div>
      <div className="lg:hidden fixed top-0 left-0 h-full  backdrop-filter backdrop-blur w-3/4 sm:w-1/2 bg-slate-50/60 z-50 shadow-2xl">
        <div style={BannerImg} className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="logo" className="h-8 w-10 ml-2" />
            <Link to={'/'} className="text-white hover:text-[#e8c547] font-semibold tracking-widest text-2xl sm:text-3xl">
              TrendTrove
            </Link>
          </div>
          <RxCross1 size={28} onClick={() => setShowSideBar(false)} className="text-white pt-2 hover:text-amber-400 cursor-pointer" />
        </div>
        <ul className="divide-y divide-gray-300">
          {SideBarMenu.map((data, index) => (
            <li key={data.id} className="hover:bg-amber-200/60 text-gray-700 transition-all  duration-300">
              <Link {...data} className="block px-4 py-2 font-semibold">
                {' '}
                {data.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideBar;
