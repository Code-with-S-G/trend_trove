import React from 'react';
import { useNavigate } from 'react-router-dom';

const category = [
  {
    image: 'https://cdn-icons-png.flaticon.com/256/4359/4359963.png',
    name: 'Mens wear',
  },
  {
    image: 'https://cdn-icons-png.flaticon.com/256/11833/11833323.png',
    name: 'Womens wear',
  },
  {
    image: 'https://cdn-icons-png.flaticon.com/256/8174/8174424.png',
    name: 'Kids wear',
  },
  {
    image: 'https://cdn-icons-png.flaticon.com/256/7648/7648246.png',
    name: 'Mobiles',
  },
  {
    image: 'https://cdn-icons-png.flaticon.com/256/12142/12142416.png',
    name: 'Laptops',
  },
  {
    image: 'https://cdn-icons-png.flaticon.com/256/10686/10686553.png',
    name: 'Home Appliences',
  },
  {
    image: 'https://cdn-icons-png.flaticon.com/256/12114/12114279.png',
    name: 'Sofas',
  },
  {
    image: 'https://cdn-icons-png.flaticon.com/256/11946/11946316.png',
    name: 'Dinning Tables',
  },
  {
    image: 'https://cdn-icons-png.flaticon.com/256/11946/11946316.png',
    name: 'Beds',
  },
];

const Category = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col mt-5">
        {/* main 1 */}
        <div className="flex overflow-x-scroll justify-center hide-scroll-bar">
          {/* main 2 */}
          <div className="flex">
            {/* category */}
            {category.map((item, index) => {
              return (
                <div className="px-3 sm:px-6 md:px-10" key={item.name}>
                  {/* Image */}
                  <div onClick={() => navigate(`/category/${item.name}`)} className="w-16 h-16 sm:w-24 sm:h-24 max-w-xs rounded-full bg-pink-500 transition-all hover:bg-pink-400 cursor-pointer mb-1">
                    <div className="flex justify-center mb-12">
                        {/* Image tag */}
                        <img src={item.image} alt="img" />
                    </div>
                  </div>

                  {/* Name Text */}
                  <h1 className="text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase"> {item.name} </h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
