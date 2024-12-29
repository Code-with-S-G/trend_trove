import myContext from '@/context/myContext';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';

const HomePageProductCard = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllProduct, loading } = context;

  return (
    <div className="bg-slate-100 dark:bg-slate-900 pt-5 mt-10">
      {/* heading */}
      <h1 className="text-center mb-2 text-2xl font-bold">Bestselling Products</h1>

      {/* main */}
      <section className="text-gray-600 body-font ">
        <div className="container px-5 py-5 mx-auto">
          <div className="text-center">{loading && <PropagateLoader color="#ec4899" />}</div>
          <div className="flex flex-wrap -m-4">
            {getAllProduct.slice(0, 8).map((item) => {
              const { images, title, price, id } = item;
              return (
                <div key={id} className="p-4 w-full md:w-1/4">
                  <div className="border border-gray-300 h-full rounded-xl overflow-hidden shadow-md cursor-pointer">
                    {images?.length > 0 ? (
                      <img onClick={() => navigate('/productinfo')} src={images[0]} className="lg:h-80 h-96 w-full" alt="blog" />
                    ) : (
                      <div className="lg:h-80 h-96 w-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                        <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="p-6 dark:bg-gray-900/80">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 dark:text-gray-300/80 mb-1">TrendTrove</h2>
                      <h1 onClick={() => navigate('/productinfo')} className="title-font text-lg font-medium text-gray-900 mb-6 line-clamp-1 dark:text-gray-300/90">
                        {title}
                      </h1>
                      <div className="flex justify-between  items-center">
                        <h1 onClick={() => navigate('/productinfo')} className="title-font text-lg font-medium text-gray-900 dark:text-gray-300/90">
                          ₹{parseFloat(price).toLocaleString()}
                        </h1>
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
