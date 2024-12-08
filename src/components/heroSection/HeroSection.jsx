import React from "react";
import Slider from "react-slick";
import Image1 from "../../assets/heroSection/girl.png";
import Image2 from "../../assets/heroSection/menShopping.png";

const ImageList = [
  {
    id: 1,
    img: "https://www.pngkey.com/png/full/284-2844044_fashion-toys-electrical-items-and-more-girl-with.png",
    title: "Your Wardrobe, Reimagined",
    description:
      "Discover a collection that blends timeless elegance with modern trends. From everyday essentials to statement pieces, we bring you styles that reflect your unique personality. Shop now and elevate your wardrobe with fashion designed to inspire confidence and redefine your look.",
  },
  {
    id: 2,
    img: Image2,
    title: "Smart Choices for Smart Living",
    description:
      "Upgrade your lifestyle with cutting-edge gadgets and innovative solutions designed to simplify your everyday life. From smart home devices to the latest tech essentials, discover products that combine functionality with modern design. Start living smarter today!",
  },
  {
    id: 3,
    img: "Image3",
    title: "Turn Your House into a Home",
    description:
      "Transform your living space into a cozy sanctuary with our curated collection of home essentials. From elegant décor to practical furnishings, find everything you need to create a space that reflects your style and feels truly yours. Start building your dream home today!",
  },
];

const HeroSection = () => {
  // Custom Next Arrow Component
  const CustomNextArrow = React.memo(({ onClick }) => (
    <div
      className="absolute top-1/2 right-4 -translate-y-1/2 z-20 w-12 h-12 bg-gray-200/50 dark:bg-gray-700/50 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-600 dark:text-gray-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </div>
  ));

  // Custom Previous Arrow Component
  const CustomPrevArrow = React.memo(({ onClick }) => (
    <div
      className="absolute top-1/2 left-4 -translate-y-1/2 z-20 w-12 h-12 bg-gray-200/50 dark:bg-gray-700/50 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-600 dark:text-gray-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </div>
  ));
  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    // Critical addition to remove default arrows
    variableWidth: false, // Ensure consistent width
    adaptiveHeight: false, // Prevent height adjustments
  };

  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h--[550px] bg-gray-100 dark:bg-gray-900 flex justify-center items-center dark:text-white transition-all duration-200">
      {/* background pattern */}
      <div className="h-[600px] w-[600px] bg-[#FFDDA9] absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-9"></div>

      {/* hero section */}
      <div className="container pb-8 sm:pb-0">
        <Slider {...settings}>
          {ImageList.map((data) => (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* text content section */}
                <div className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold"> {data.title} </h1>
                  <p className="text-sm dark:text-gray-300"> {data.description} </p>
                  <div>
                    {" "}
                    <button className="bg-[#f42c37] text-white px-4 py-2 rounded-full hover:scale-105 transition-all duration-200 dark:bg-[#ff6b6b]">Order now</button>
                  </div>
                </div>
                {/* img section */}
                <div className="order-1 sm:order-2">
                  <div className="relative z-10">
                    <img src={data.img} alt="carousel-img" className="w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-100 lag:scale-100 object-contain mx-auto" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HeroSection;
