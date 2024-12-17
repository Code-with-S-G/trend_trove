import React from 'react';
import Slider from 'react-slick';

const testimonialData = [
  {
    id: 1,
    name: 'John Doe',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 2,
    name: 'Jane Doe',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 3,
    name: 'John Doe',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 4,
    name: 'Jane Doe',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 5,
    name: 'John Doe',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://picsum.photos/200/300',
  },
];

const Testimonials = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    // slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
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
    <div className="py-10">
      <div className="container">
        {/* header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p className="text-sm text-amber-400">What Our Customers Say</p>
          <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-xs text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
          </p>
        </div>
        {/* testimonial cards */}
        <div>
          <Slider {...settings}>
            {testimonialData.map((testimonial) => (
              <div className='my-6'>
                <div
                  key={testimonial.id}
                  className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800 bg-amber-500/10 relative"
                >
                  <div className="mb-4">
                    <img src={testimonial.image} alt="" className="rounded-full w-20 h-20" />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3">
                      <p className="text-xs text-gray-500">{testimonial.text}</p>
                      <h1 className="text-xl font-bold text-black/80 dark:text-white">{testimonial.name}</h1>
                    </div>
                  </div>
                  <p className='text-black/20 text-9xl font-serif absolute top-0 right-0'>,,</p>
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
