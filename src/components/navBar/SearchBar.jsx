import myContext from "@/context/myContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

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
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const context = useContext(myContext);
  const { getAllProduct } = context;

  //Filter search data
  const filterSearchData = getAllProduct.filter((obj) => obj.title.toLowerCase().includes(search.toLowerCase())).slice(0, 8);
  // console.log(filterSearchData);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSearch(""); // Close dropdown
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full lg:w-auto" ref={dropdownRef}>
      {/* search input */}
      <div className="relative group sm:block w-full lg:w-auto">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onBlur={() => {
            setTimeout(() => setSearch(""), 300);
          }}
          className="search-bar focus:pr-10 focus:text-black focus:dark:text-black hover:placeholder-[#f42c37] duration-200"
        />
        <IoMdSearch className="text-xl text-gray-500 lg:text-gray-100 group-hover:text-[#f42c37] absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
      </div>
      {/* search drop-down */}
      <div className="flex justify-center">
        {search && (
          <div className="absolute block lg:right-[7rem] xl:right-[7rem] lg:top-16 bg-white w-full lg:w-[250px] xl:w-[400px] z-50  lg:m-auto rounded-lg px-2 py-2 dark-text-black max-h-60 custom-scrollbar overflow-y-auto">
            {filterSearchData.length > 0 ? (
              <>
                {filterSearchData.map((item) => {
                  return (
                    <div
                      key={item.title}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(item.id);
                        setSearch("");
                        navigate(`/productinfo/${item.id}`);
                      }}
                      className="py-2 px-2 border-b-2 border-amber-200 cursor-pointer hover:bg-[#f8f2dc]"
                    >
                      <div className="flex items-center gap-2 font-semibold text-xs dark:text-black">
                        <img src={item.images[0]} alt="image" className="w-10" />
                        {item.title}
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
    </div>
  );
};

export default SearchBar;
