import React from "react";
import { Trash } from "lucide-react";
import Layout from "@/components/Layout/Layout";

const products = [
  {
    id: "cart1",
    name: "Nike Air Force 1 07 LV8",
    href: "#",
    price: "₹47,199",
    originalPrice: "₹48,900",
    discount: "5% Off",
    color: "Orange",
    size: "8 UK",
    imageSrc: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png",
  },
  {
    id: "cart2",
    name: "Nike Blazer Low 77 SE",
    href: "#",
    price: "₹1,549",
    originalPrice: "₹2,499",
    discount: "38% off",
    color: "White",
    leadTime: "3-4 weeks",
    size: "8 UK",
    imageSrc: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png",
  },
  {
    id: "cart3",
    name: "Nike Air Max 90",
    href: "#",
    price: "₹2219 ",
    originalPrice: "₹999",
    discount: "78% off",
    color: "Black",
    imageSrc: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/dunk-high-retro-shoe-DdRmMZ.png",
  },
];

const CartPage = () => {
  return (
    <Layout>
      <div className="container px-4 max-w-full lg:px-0 bg-stone-50 dark:bg-[#2c2c2c]">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Shopping Cart</h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="rounded-lg bg-white shadow-md dark:bg-[#1c1c1c] lg:col-span-8">
              <h2 id="cart-heading" className="border-b border-gray-400 dark:border-gray-300 px-4 py-3 text-lg font-medium text-gray-900 dark:text-gray-300  sm:p-4">
                Items in your shopping cart
              </h2>
              <ul role="list" className="divide-y divide-gray-300 dark:divide-gray-400 divide-dashed ">
                {products.map((product) => (
                  <div key={product.id} className="">
                    <li className="py-6 flex sm:py-8 px-4">
                      <div className="flex-shrink-0">
                        <img src={product.imageSrc} alt={product.name} className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center" />
                      </div>
                      <div className="flex ml-4 flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <a href={product.href} className="font-semibold text-black dark:text-gray-100 hover:text-gray-800 dark:hover:text-gray-200 transition ">
                                  {product.name}
                                </a>
                              </h3>
                            </div>
                            <div className="flex mt-1 text-sm">
                              <p className="text-gray-500 dark:text-gray-400 text-sm">{product.color}</p>
                              {product.size ? <p className="ml-4 border-l border-gray-200 dark:border-gray-600 pl-4 text-sm text-gray-500 dark:text-gray-400">{product.size}</p> : null}
                            </div>
                            <div className="flex mt-1 items-end">
                              <p className="text-xs font-medium line-through text-gray-500 dark:text-gray-600">{product.originalPrice}</p>
                              <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white"> &nbsp;&nbsp;{product.price}</p>
                              &nbsp;&nbsp;
                              <p className="ml-2 text-sm font-medium text-green-500">{product.discount}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <div className="flex mb-2">
                      <div className="flex min-w-24 px-3">
                        <button type="button" className="h-7 w-7 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 flex items-center justify-center">
                          -
                        </button>
                        <input type="text" className="mx-1 h-7 w-9 rounded-md border border-gray-300 dark:border-gray-600 text-center text-black dark:text-gray-100 dark:bg-gray-800" defaultValue={1} />
                        <button type="button" className="h-7 w-7 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 flex items-center justify-center">
                          +
                        </button>
                      </div>
                      <div className="flex text-sm ml-6">
                        <button type="button" className="flex items-center space-x-1 px-2 py-1">
                          <Trash size={12} className="text-red-500" />
                          <span className="text-xs font-medium text-red-500">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </section>
            {/* Order summary */}
            <section aria-labelledby="summary-heading" className="mt-16 rounded-lg bg-white shadow-sm dark:bg-[#1c1c1c] lg:col-span-4 lg:mt-0 lg:p-0">
              <h2 id="summary-heading" className="border-b border-gray-400 dark:border-gray-300 px-4 py-3 text-lg font-medium text-gray-900 dark:text-gray-100 sm:p-4">
                Order summary
              </h2>
              <div>
                <dl className="space-y-1 px-4 py-4 text-gray-800 dark:text-gray-300">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Price (3 item)</dt>
                    <dd className="text-sm font-medium">₹ 52,398</dd>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <dt className="flex items-center text-sm">
                      <span>Discount</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-500">- ₹ 3,431</dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="flex text-sm">
                      <span>Delivery Charges</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-500">Free</dd>
                  </div>
                  <div className="flex items-center justify-between border-y border-dashed border-gray-400 dark:border-gray-200 py-4 ">
                    <dt className="text-base font-medium ">Total Amount</dt>
                    <dd className="text-base font-medium ">₹ 48,967</dd>
                  </div>
                </dl>
                <div className="px-4 pb-4 font-medium text-green-700">
                  <div className="flex gap-4 mb-1">
                    <button className="w-full px-4 py-3 text-center text-gray-100 bg-gradient-to-r from-[#ff930f] to-[#e0da2f] border border-transparent hover:opacity-90 shadow-sm rounded-xl">Buy now</button>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
