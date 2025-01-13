import React from "react";
import Slider from "react-slick";

const testimonialData = [
  {
    id: "testimonialData1",
    name: "Aryan Sharma",
    text: "Fast shipping, great quality, and excellent prices. I’ve been shopping here for months, and I’m never disappointed. Highly recommend to anyone looking for quality products!",
    image: "https://randomuser.me/api/portraits/men/31.jpg",
  },
  {
    id: "testimonialData2",
    name: "Rohan Verma",
    text: "Easy to navigate website, smooth checkout, and timely updates. I love how hassle-free everything is. Truly amazing shopping experience each time I visit the site!",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    id: "testimonialData3",
    name: "Aditya Singh",
    text: "Customer service was super helpful, and delivery was quick. I had a small issue with my order, but they resolved it immediately. This is definitely my go-to shopping store!",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: "testimonialData4",
    name: "Isha Gupta",
    text: "Affordable prices and top-notch quality. I've saved a lot while getting great products. This is now my favorite shopping site for everything I need.",
    image: "https://randomuser.me/api/portraits/women/48.jpg",
  },
  {
    id: "testimonialData5",
    name: "Ananya Roy",
    text: "Seamless experience from start to finish. The website is so easy to use, and the products are exactly what I wanted. Great value for money on every purchase!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const Testimonials = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 800,
    arrows: false,
    // slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="pt-2 pb-10 dark:bg-gray-900">
      <div className="">
        {/* header section */}
        <div className="text-center mb-5 max-w-[600px] mx-auto">
          <p className="text-sm text-amber-400">What Our Customers Say</p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Testimonials</h1>
          <p className="text-xs scale-110 text-gray-400 mt-2">See why our customers love us! Real experiences, honest reviews, and happy shoppers from all over the world.</p>
        </div>
        {/* testimonial cards */}
        <div>
          <Slider {...settings}>
            {testimonialData.map((testimonial) => (
              <div key={testimonial.id} className="my-6">
                <div className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800 bg-amber-500/10 relative md:min-h-[300px] lg:min-h-[270px] hover:scale-105 transition-all duration-300 ease-in-out">
                  <div className="mb-4">
                    <img src={testimonial.image} alt="" className="rounded-full w-20 h-20" />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.text}</p>
                      <h1 className="text-xl font-bold text-black/80 dark:text-white">{testimonial.name}</h1>
                    </div>
                  </div>
                  <p className="text-black/20 text-9xl font-serif absolute top-0 right-0 dark:text-gray-500">,,</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
