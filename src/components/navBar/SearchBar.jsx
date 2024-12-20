import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";

// Search Data
const searchData = [
  {
    name: "Fashion",
    image: "https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg",
  },
  {
    name: "Shirt",
    image: "https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg",
  },
  {
    name: "Jacket",
    image: "https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg",
  },
  {
    name: "Mobile",
    image: "https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg",
  },
  {
    name: "Laptop",
    image: "https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg",
  },
  {
    name: "Home",
    image: "https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg",
  },
  {
    name: "book",
    image: "https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg",
  },
];

const SearchBar = () => {
  //Search State
  const [search, setSearch] = useState("");

  //Filter search data
  const filterSearchData = searchData.filter((obj) => obj.name.toLowerCase().includes(search)).slice(0, 8);

  return (
    <>
      {/* serach input */}
      <div className="relative group sm:block">
        <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} className="search-bar focus:pr-10 focus:text-black focus:dark:text-black hover:placeholder-[#f42c37] duration-200" />
        <IoMdSearch className="text-xl text-gray-500 md:text-gray-100 group-hover:text-[#f42c37] absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
      </div>
      {/* search drop-down */}
      <div className="flex justify-center">
        {search && (
          <div className="absolute block md:right-14 md:top-14 bg-gray-200 w-80 sm:w-[500px] lg:w-96 z-50 my-1 rounded-lg px-2 py-2 dark-text-black">
            {filterSearchData.length > 0 ? (
              <>
                {filterSearchData.map((item, index) => {
                  return (
                    <div key={index} className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <img src={item.image} alt="image" className="w-10" />
                        {item.name}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <img className=" w-20" src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png" alt="img" />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
