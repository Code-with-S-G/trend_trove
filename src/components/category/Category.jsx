import React from 'react';
import { useNavigate } from 'react-router-dom';

const category = [
  {
    image: 'https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/653844a5-57f9-465d-987c-7fcff30f902e._CR0,0,1200,628_SX507_QL76_.jpg',
    name: 'Mens wear',
  },
  {
    image: 'https://m.media-amazon.com/images/G/31/img23/WA/2024/sept/jupiter/kurta/revised/without/Kurtas__Sets._SS400_QL85_FMpng_.png',
    name: 'Womens wear',
  },
  {
    image: 'https://m.media-amazon.com/images/G/31/img24/Fashion/AF/PrimeDay/EventDay/kf/halo/MFA._SS300_QL85_FMpng_.png',
    name: 'Kids wear',
  },
  {
    image: 'https://m.media-amazon.com/images/G/31/img22/WLA/2024/November/Uber/BAU_Uber_Halo_210x210_4._CB542329453_.png',
    name: 'Mobiles',
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC-6Jn7FIlSyMXxK1F_oDFEQ2l3R80_2QCSw&s',
    name: 'Laptops',
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSVMwemMxajylx-67B4--VMwCkffjA3u2GfA&s',
    name: 'Home Appliences',
  },
  {
    image: 'https://www.ikea.com/es/en/images/products/eskilstuna-3-seat-sofa-with-chaise-longue-tallmyra-white-black__1256254_pe924977_s5.jpg?f=s',
    name: 'Sofas',
  },
  {
    image: 'https://m.media-amazon.com/images/I/71OvjUoWWIL._SX679_.jpg',
    name: 'Dinning Tables',
  },
  {
    image: 'https://ebansal.com/cdn/shop/products/EBANSAL_BED_10TH_12_-_Copy_25508715-5cc6-4bdd-b32a-87f5f80a0711.jpg?v=1680265655',
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
                  <div onClick={() => navigate(`/category/${item.name}`)} className="w-16 h-16 sm:w-24 sm:h-24 max-w-xs rounded-ful transition-all cursor-pointer mb-1">
                    <div className="flex justify-center mb-12 w-16 h-16 sm:w-24 sm:h-24 rounded-full">
                        {/* Image tag */}
                        <img src={item.image} alt="img" className='w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover' />
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
