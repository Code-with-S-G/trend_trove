import React from 'react';

const categoryList = [
  { name: 'Mens wear' },
  { name: 'Womens wear' },
  { name: 'Kids wear' },
  { name: 'Laptops' },
  { name: 'Mobiles' },
  { name: 'Home Appliences' },
  { name: 'Sofas' },
  { name: 'Dinning Tables' },
  { name: 'Beds' },
];

const AddProductPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Add product Form */}
      <div className="w-full max-w-xl mx-2 bg-white px-4 py-2 md:px-10 md:py-8 border border-gray-200 shadow-lg rounded-2xl">
        {/* Top Heading */}
        <div className="mb-1 sm:mb-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">Add Product</h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-0 sm:mt-1">
            Fill in the details below to add a new product.
          </p>
        </div>

        {/* Input One */}
        <div className="mb-1 sm:mb-4">
          <label htmlFor="title" className="block text-sm text-gray-600 font-medium">
            Product Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter product title"
            className="w-full mt-1 px-3 py-0.5 sm:py-2 bg-gray-50 text-gray-800 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-200 text-sm sm:text-base"
          />
        </div>

        {/* Input Two */}
        <div className="mb-1 sm:mb-4">
          <label htmlFor="price" className="block text-sm text-gray-600 font-medium">
            Product Price
          </label>
          <input
            type="number"
            id="price"
            placeholder="Enter product price"
            className="w-full mt-1 px-3 py-0.5 sm:py-2 bg-gray-50 text-gray-800 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-200 text-sm sm:text-base"
          />
        </div>

        {/* Input Three */}
        <div className="mb-1 sm:mb-4">
          <label htmlFor="image-url" className="block text-sm text-gray-600 font-medium">
            Product Image URL
          </label>
          <input
            type="text"
            id="image-url"
            placeholder="Enter product image URL"
            className="w-full mt-1 px-3 py-0.5 sm:py-2 bg-gray-50 text-gray-800 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-200 text-sm sm:text-base"
          />
        </div>

        {/* Input Four */}
        <div className="mb-1 sm:mb-4">
          <label htmlFor="category" className="block text-sm text-gray-600 font-medium">
            Product Category
          </label>
          <select
            id="category"
            defaultValue=""
            className="w-full mt-1 px-3 py-0.5 sm:py-2 bg-gray-50 text-gray-800 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-200 text-sm sm:text-base"
          >
            <option value="" disabled>Select Product Category</option>
            {categoryList.map((value) => (
              <option key={value.name} value={value.name} className="capitalize">
                {value.name}
              </option>
            ))}
          </select>
        </div>

        {/* Input Five */}
        <div className="mb-1 sm:mb-4">
          <label htmlFor="description" className="block text-sm text-gray-600 font-medium">
            Product Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter product description"
            rows="4"
            className="w-full mt-1 px-3 py-0.5 sm:py-2 bg-gray-50 text-gray-800 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-200 text-sm sm:text-base"
          ></textarea>
        </div>

        {/* Add Product Button */}
        <div>
          <button
            type="button"
            className="w-full py-0.5 sm:py-2 px-4 bg-gradient-to-r from-[#ff930f] to-[#e0da2f] text-white font-semibold text-lg rounded-md hover:opacity-90 transition duration-200 focus:outline-none focus:ring-4 focus:ring-amber-300"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
