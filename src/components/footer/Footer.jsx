import React from 'react'
import footerLogo from '../../assets/logo.png';
import Banner from '../../assets/footer/footer-pattern.jpg';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";
import { Link } from 'react-router-dom';

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%", 
};

const topProducts = [
  {
    title: "Mens Wear",
    link: "/category/Mens wear",
  },
  {
    title: "Womens wear",
    link: "/category/Womens wear",
  },
  {
    title: "Kids wear",
    link: "/category/Kids wear",
  },
  {
    title: "Laptops",
    link: "/category/Laptops",
  },
  {
    title: "Mobiles",
    link: "/category/Mobiles",
  },
];

const explore = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Store",
    link: "/allproduct",
  },
  {
    title: "Home Appliences",
    link: "/category/Home Appliences",
  },
  {
    title: "Dinning Tables",
    link: "/category/Dinning Tables",
  },
  {
    title: "Beds",
    link: "/category/Beds",
  },
]

const Footer = () => {
  return (
    <div style={BannerImg} className='text-white'>
      <div className='container'>
        <div  className="grid md:grid-cols-3 pb-44 pt-5">
          {/* company details */}
          <div className='py-8 px-4'>
            <h1 className='sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3'>
              <img src={footerLogo} alt='' className="max-w-[50px]" />
              TrendTrove</h1>
            <p>Your satisfaction is our priority.
            We deliver exceptional service with every order.</p>
          </div>
          {/* Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            <div>
              <div className='py-8 px-4'>
                <h1 className='sm:text-xl text-xl font-bold sm:text-left text-justify mb-3 text-[#D7AE64]'>Top Products</h1>
                <ul className='flex flex-col gap-3'>
                  {
                    topProducts.map((link) => (
                      <Link to={link.link} className='cursor-pointer hover:text-amber-400 hover:translate-x-1 duration-300 text-gray-200' key={link.title}>
                        <span>{link.title}</span>
                      </Link>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div>
              <div className='py-8 px-4'>
                <h1 className='sm:text-xl text-xl font-bold sm:text-left text-justify mb-3 text-[#D7AE64]'>Explore</h1>
                <ul className='flex flex-col gap-3'>
                  {
                    explore.map((link) => (
                      <Link to={link.link} className='cursor-pointer hover:text-amber-400 hover:translate-x-1 duration-300 text-gray-200' key={link.title}>
                        <span>{link.title}</span>
                      </Link>
                    ))
                  }
                </ul>
              </div>
            </div>

            {/* social links */}
            <div>
            <div className="flex items-center gap-3 mt-6">
                <a href="#">
                  <FaInstagram className="text-3xl" />
                </a>
                <a href="#">
                  <FaFacebook className="text-3xl" />
                </a>
                <a href="#">
                  <FaLinkedin className="text-3xl" />
                </a>
              </div>
              <div className='mt-6'>
              <div className="flex items-center gap-3">
                  <FaLocationArrow />
                  <p>Noida, Uttar Pradesh</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <FaMobileAlt />
                  <p>+91 123456789</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;