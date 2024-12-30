import Layout from "@/components/Layout/Layout";
import { ShoppingCart } from "lucide-react";
import React from "react";
import Slider from "react-slick";

const ProductInfo = () => {
  // Custom Next Arrow Component
  const CustomNextArrow = React.memo(({ onClick }) => (
    <div
      className="absolute top-1/2 -right-14 -translate-y-1/2 z-20 w-12 h-12 bg-gray-200/50 dark:bg-gray-700/50 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer"
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
      className="absolute top-1/2 -left-14 -translate-y-1/2 z-20 w-12 h-12 bg-gray-200/50 dark:bg-gray-700/50 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-600 dark:text-gray-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </div>
  ));
  const laptop = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj9zTsUw9GLhneuaoFGKsx3WAzZc9qE1SK_w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9iSLbDb9hfQlIS4hItKSw7t5Drnf-j8K5Ww&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5g6RtpZx7EEBs-Df3UedGvZ-QpVKt6JpX5Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0-VXEoQZwOvjP96IFoTnyumPUv_isZqTxww&s",
  ];

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={laptop[i]} />
        </a>
      );
    },
    appendDots: (dots) => (
      <div
        style={{
          backgroundColor: "#dddddd56",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <ul style={{ margin: "auto", display: "flex", alignItems: "center" }}> {dots} </ul>
      </div>
    ),
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <Layout>
      <section className="py-5 lg:py-16 dark:bg-gray-800">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex flex-wrap mb-24 -mx-4">
            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
              <div className="">
                <div className="slider-container">
                  <Slider {...settings} className="">
                    <div className="bg-[#ddd] bg-opacity-40 dark:bg-opacity-20 p-2 rounded-lg">
                      <img className="w-full h-full rounded-lg" src={laptop[0]} />
                    </div>
                    <div className="bg-[#ddd] bg-opacity-40 dark:bg-opacity-20 p-2 rounded-lg ">
                      <img className="w-full h-full rounded-lg" src={laptop[1]} />
                    </div>
                    <div className="bg-[#ddd] p-2 bg-opacity-40 dark:bg-opacity-20 rounded-lg ">
                      <img className="w-full h-full rounded-lg" src={laptop[2]} />
                    </div>
                    <div className="bg-[#ddd] p-2 bg-opacity-40 dark:bg-opacity-20 rounded-lg">
                      <img className="w-full h-full rounded-lg" src={laptop[3]} />
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
            <div className="mt-20 md:mt-0 w-full px-4 md:w-1/2">
              <div className="lg:pl-20">
                <div className="mb-3 md:mb-6">
                  <h2 className="max-w-xl mb-3 md:mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">Title</h2>
                  <div className="flex flex-wrap items-center mb-0 md:mb-6">
                    <ul className="flex mb-4 mr-2 lg:mb-0">
                      <li>
                        <a href="">
                          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="w-4 mr-1 text-amber-500 bi bi-star " viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="">
                          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="w-4 mr-1 text-amber-500 bi bi-star " viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="">
                          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="w-4 mr-1 text-amber-500 bi bi-star " viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a href="">
                          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="w-4 mr-1 text-amber-500 bi bi-star " viewBox="0 0 16 16">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                    <span>Rs.7,000.00</span>
                  </p>
                </div>
                <div className="mb-6">
                  <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400"> Description:</h2>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa, explicabo enim ratione voluptatum at cupiditate delectus nemo dolorum officia esse beatae optio ut mollitia sit omnis, possimus nesciunt voluptas natus! Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Provident rerum ad rem reprehenderit qui, omnis nam distinctio, dignissimos nisi quidem aliquam, sapiente delectus commodi! Perspiciatis provident illo autem quidem ad! Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Beatae reiciendis eum dolorum cupiditate{" "}
                  </p>
                </div>
                <div className="mb-6 " />
                <div className="flex flex-wrap items-center mb-6">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-200 transition duration-300">
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductInfo;
