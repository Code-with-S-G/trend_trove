import Layout from "@/components/Layout/Layout";
import myContext from "@/context/myContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: "userdashboard1",
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
  const user = JSON.parse(localStorage.getItem("users"));
  const context = useContext(myContext);
  const { loading, getAllOrder } = context;
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="w-full px-3 sm:px-10 py-5 lg:py-8 dark:bg-[#2c2c2c]">
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
              {/* name */}
              <h1 className=" text-center text-lg">
                <span className=" font-bold">Name :</span> {user?.name}
              </h1>
              {/* email */}
              <h1 className=" text-center text-lg">
                <span className=" font-bold">Email :</span> {user?.email}
              </h1>
              {/* Date  */}
              <h1 className=" text-center text-lg">
                <span className=" font-bold">Date : </span>
                {user?.date}
              </h1>
              {/* Role  */}
              <h1 className=" text-center text-lg">
                <span className=" font-bold">Role : </span>
                {user?.role}
              </h1>
            </div>
          </div>
        </div>

        {/* bottom  */}
        <div className="bottom">
          {/* main 1 */}
          <div className="mx-auto my-4 px-2 md:my-6 md:px-0">
            {/* text  */}
            <h2 className=" text-2xl lg:text-3xl font-bold">Order Details</h2>

            {/* main 2 */}
            {getAllOrder
              .filter((obj) => obj.userid === user?.uid)
              .map((order, index) => {
                return (
                  <div key={order.paymentId}>
                    {order.cartItems.map((item) => {
                      const { orderId, date, quantity, price, title, images, category, id } = item;
                      return (
                        <div key={orderId} className="mt-5 flex flex-col overflow-hidden rounded-xl border border-slate-300 md:flex-row">
                          {/* main 3  */}
                          <div className="w-full border-r border-slate-300 bg-slate-100 dark:bg-[#1c1c1c] md:max-w-[21rem]">
                            {/* left  */}
                            <div className="p-2 sm:p-8">
                              <div className="mb-4">
                                <div className="text-xs sm:text-sm font-semibold text-black dark:text-gray-100">Order Id</div>
                                <div className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">{orderId}</div>
                              </div>
                              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-1">
                                <div className="mb-4 ml-1 sm:ml-0">
                                  <div className="text-xs sm:text-sm font-semibold dark:text-gray-100">Date</div>
                                  <div className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">{order.date}</div>
                                </div>

                                <div className="mb-4 ml-2 sm:ml-0">
                                  <div className="text-xs sm:text-sm font-semibold dark:text-gray-100">Total Amount</div>
                                  <div className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">₹{parseFloat(price * quantity * 0.8).toLocaleString()}</div>
                                </div>

                                <div className="sm:mb-4">
                                  <div className="text-xs sm:text-sm font-semibold dark:text-gray-100">Order Status</div>
                                  <div className="text-xs sm:text-sm font-medium text-green-500">{order.orderStatus}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* right  */}
                          <div className="flex-1">
                            <div className="p-2 sm:p-8">
                              <ul className="-my-7 divide-y divide-gray-200 dark:divide-gray-400">
                                <li className="flex flex-col justify-between space-x-5 py-7 lg:flex-row">
                                  <div className="flex flex-col lg:flex-row sm:flex-1 items-stretch">
                                    <div className="flex sm:flex-shrink-0 mb-2 lg:mb-0 justify-center lg:justify-normal">
                                      <img className="h-32 w-32 rounded-lg border border-gray-200 object-cover cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out" src={images[0]} alt="img" onClick={() => navigate(`/productinfo/${id}`) } />
                                    </div>

                                    <div className="ml-1 md:ml-5 flex flex-col justify-between">
                                      <div className="flex-1">
                                        <p onClick={() => navigate(`/productinfo/${id}`) } className="text-xs md:text-sm font-bold text-gray-900 dark:text-gray-100 hover:text-yellow-500 cursor-pointer">{title}</p>
                                        <p className="mt-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">{category}</p>
                                        <p className="hidden lg:inline-block mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">x {quantity}</p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="ml-auto flex flex-row lg:flex-col items-end justify-between">
                                  <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400 lg:hidden">x {quantity}</p>
                                    <p className="text-right text-sm font-bold text-gray-900 dark:text-gray-100">₹{parseFloat(price * 0.8).toLocaleString()}</p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
