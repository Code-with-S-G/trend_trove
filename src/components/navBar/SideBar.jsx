import React, { useContext } from 'react';
import logo from '../../assets/logo.png';
import navbarImg from '../../assets/navbarImg.png';
import { Link, useNavigate } from 'react-router-dom';
import { RxCross1 } from 'react-icons/rx';
import myContext from '@/context/myContext';
import toast from 'react-hot-toast';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '@/firebase/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

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
  const navigate = useNavigate();

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
    !user &&  {
      id: 'sGuest-User-Login',
      name: 'Guest User Login',
      onClick: () => {
        guestLoginFunction("Customer");
        setShowSideBar(false);
      },
    },
    !user &&  {
      id: 'sGuest-Admin-Login',
      name: 'Guest Admin Login',
      onClick: () => {
        guestLoginFunction("Admin");
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

  const guestLoginFunction = async (role) => {
    // setLoading(true);
    const email = role === "Customer" ? "gautamranjan96@gmail.com":"gautamranjan97@gmail.com"; // Add the email of the guest user
    const toastId = toast.loading("Authenticating... Please wait."); // Store the toast ID
    try {
      const users = await signInWithEmailAndPassword(auth, email, "123456");

      try {
        const userDoc = await getDoc(doc(fireDB, "users", email));

        if (userDoc.exists()) {
          const updatedUserData = userDoc.data();
          localStorage.setItem("users", JSON.stringify(updatedUserData));
          if (updatedUserData.role === "Customer") {
            navigate("/");
          } else {
            navigate("/admin-dashboard");
          }
          toast.success("Login Successfully", { id: toastId });
          setShowLogIn(false);
        }
        //setLoading(false);
        //window.location.reload();
        // return () => data;
      } catch (error) {
        console.log(error);
        //setLoading(false);
      }
    } catch (error) {
      console.log(error);
      //setLoading(false);
      toast.error(error.message || "An error occurred during Login", { id: toastId }); // Update existing toast
    }
  };

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
