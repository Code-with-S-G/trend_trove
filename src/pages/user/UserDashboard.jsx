import Layout from "../../components/layout/Layout";
const products = [
  {
    id: 1,
    name: "Nike Air Force 1 07 LV8",
    imageSrc: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png",
    href: "#",
    price: "₹61,999",
    color: "Orange",
    imageAlt: "Nike Air Force 1 07 LV8",
    quantity: 1,
  },
];

const UserDashboard = () => {
  return (
    <Layout>
      <div className=" container mx-auto px-4 py-5 lg:py-8 dark:bg-[#2c2c2c]">
        {/* Top  */}
        <div className="top ">
          {/* main  */}
          <div className=" bg-slate-100 dark:bg-[#1c1c1c] py-5 rounded-xl border border-slate-300">
            {/* image  */}
            <div className="flex justify-center">
              <img src="https://www.svgrepo.com/show/192244/man-user.svg" alt="" className="w-24 h-24" />
            </div>
            {/* text  */}
            <div className="">
              <h1 className=" text-center text-lg">
                <span className=" font-bold">Name :</span> Kamal Nayan Upadhyay
              </h1>
              <h1 className=" text-center text-lg">
                <span className=" font-bold">Email :</span> test@gmail.com
              </h1>
            </div>
          </div>
        </div>

        {/* bottom  */}
        <div className="bottom">
          {/* main 1 */}
          <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
            {/* text  */}
            <h2 className=" text-2xl lg:text-3xl font-bold">Order Details</h2>

            {/* main 2 */}
            <div className="mt-5 flex flex-col overflow-hidden rounded-xl border border-slate-300 md:flex-row">
              {/* main 3  */}
              <div className="w-full border-r border-slate-300 bg-slate-100 dark:bg-[#1c1c1c] md:max-w-xs">
                {/* left  */}
                <div className="p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                    <div className="mb-4">
                      <div className="text-sm font-semibold text-black dark:text-gray-100">Order Id</div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">#74557994327</div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-semibold dark:text-gray-100">Date</div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">4 March, 2023</div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-semibold dark:text-gray-100">Total Amount</div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">₹84,499</div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-semibold dark:text-gray-100">Order Status</div>
                      <div className="text-sm font-medium text-green-500">Confirmed</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* right  */}
              <div className="flex-1">
                <div className="p-8">
                  <ul className="-my-7 divide-y divide-gray-200 dark:divide-gray-400">
                    {products.map((product) => (
                      <li key={product.id} className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
                        <div className="flex flex-1 items-stretch">
                          <div className="flex-shrink-0">
                            <img className="h-20 w-20 rounded-lg border border-gray-200 object-contain" src={product.imageSrc} alt={product.imageSrc} />
                          </div>

                          <div className="ml-5 flex flex-col justify-between">
                            <div className="flex-1">
                              <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{product.name}</p>
                              <p className="mt-1.5 text-sm font-medium text-gray-500 dark:text-gray-400">{product.color}</p>
                            </div>

                            <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">x {product.quantity}</p>
                          </div>
                        </div>

                        <div className="ml-auto flex flex-col items-end justify-between">
                          <p className="text-right text-sm font-bold text-gray-900 dark:text-gray-100">{product.price}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
