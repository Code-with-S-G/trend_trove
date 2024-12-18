import React from 'react';
import { useNavigate } from 'react-router-dom';

const productData = [
  {
    id: 1,
    image: 'https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg',
    title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
    desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
    price: 150,
    trendingProductName: 'Featured',
    quantity: 1,
  },
  {
    id: 2,
    image: 'https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg',
    title: 'Kaushalam kalash Copper Pot',
    desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
    price: 120,
    trendingProductName: 'Featured',
    quantity: 1,
  },
  {
    id: 3,
    image: 'https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg',
    title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
    desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
    price: 130,
    trendingProductName: 'Featured',
    quantity: 1,
  },
  {
    id: 4,
    image: 'https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg',
    title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
    desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
    price: 120,
    trendingProductName: 'Featured',
    quantity: 1,
  },
  {
    id: 1,
    image: 'https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg',
    title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
    desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
    price: 150,
    trendingProductName: 'Featured',
    quantity: 1,
  },
  {
    id: 2,
    image: 'https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg',
    title: 'Kaushalam kalash Copper Pot',
    desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
    price: 120,
    trendingProductName: 'Featured',
    quantity: 1,
  },
  {
    id: 3,
    image: 'https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg',
    title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
    desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
    price: 130,
    trendingProductName: 'Featured',
    quantity: 1,
  },
  {
    id: 4,
    image: 'https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg',
    title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
    desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
    price: 120,
    trendingProductName: 'Featured',
    quantity: 1,
  },
];

const HomePageProductCard = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-100 dark:bg-slate-900 pt-5 mt-10">
      {/* heading */}
      <h1 className="text-center mb-2 text-2xl font-bold">Bestselling Products</h1>

      {/* main */}
      <section className="text-gray-600 body-font ">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            {productData.map((item, index) => {
              const { image, title, price, id } = item;
              return (
                <div key={id} className="p-4 w-full md:w-1/4">
                  <div className="border border-gray-300 h-full rounded-xl overflow-hidden shadow-md cursor-pointer">
                    <img onClick={() => navigate('/productinfo')} src={image} className="lg:h-80 h-96 w-full" alt="blog" />
                    <div className="p-6 dark:bg-gray-900/80">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 dark:text-gray-300/80 mb-1">TrendTrove</h2>
                      <h1 onClick={() => navigate('/productinfo')} className="title-font text-lg font-medium text-gray-900 mb-6 line-clamp-1 dark:text-gray-300/90">{title}</h1>
                      <div className="flex justify-between  items-center">
                        <h1 onClick={() => navigate('/productinfo')} className="title-font text-lg font-medium text-gray-900 dark:text-gray-300/90">₹{price}</h1>
                        <button className="bg-yellow-500 text-lg hover:bg-amber-500  text-white py-[5px] rounded-lg font-semibold px-3">Add To Cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageProductCard;
