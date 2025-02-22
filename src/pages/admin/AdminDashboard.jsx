import OrderDetail from '@/components/admin/OrderDetail';
import ProductDetail from '@/components/admin/ProductDetail';
import UserDetail from '@/components/admin/UserDetail';
import Layout from '@/components/Layout/Layout';
import myContext from '@/context/myContext';
import { useContext } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem('users'));

  const context = useContext(myContext);
  const { getAllProduct, getAllOrder, getAllUser } = context;

  return (
    <Layout>
      <div className="w-full px-5 sm:px-10 py-5 lg:py-8 dark:bg-[#2c2c2c]">
        {/* Top */}
        <div className="top mb-5">
          <div className="bg-slate-100 dark:bg-[#1c1c1c] py-5 rounded-xl border border-slate-300">
            {/* Title */}
            <h1 className="text-center text-3xl font-bold text-pink-500">Admin Dashboard</h1>
          </div>
        </div>

        {/* Middle Section */}
        <div className="mid mb-5">
          <div className="bg-slate-100 dark:bg-[#1c1c1c] py-5 rounded-xl border border-slate-300">
            {/* Profile Image */}
            <div className="flex justify-center">
              <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="Admin Avatar" className="w-24 h-24" />
            </div>
            {/* Profile Details */}
            <div className="text-center mt-3">
              <h1 className="text-lg text-gray-900 dark:text-gray-100">
                <span className="font-bold">Name:</span> {user?.name}
              </h1>
              <h1 className="text-lg text-gray-900 dark:text-gray-100">
                <span className="font-bold">Email:</span> {user?.email}
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

        {/* Statistics Section */}
        <div className="bottom">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6">Dashboard Statistics</h2>
          <Tabs>
            <TabList className="flex flex-wrap -m-4 text-center justify-center">
              {/* Total Products */}
              <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                <div className="border bg-slate-100 dark:bg-[#1c1c1c] hover:bg-slate-200 dark:hover:bg-[#323232] border-slate-300 px-4 py-3 rounded-xl">
                  <div className="text-pink-500 w-12 h-12 mb-3 inline-block">
                    {/* Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={50}
                      height={50}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-shopping-basket"
                    >
                      <path d="m5 11 4-7" />
                      <path d="m19 11-4-7" />
                      <path d="M2 11h20" />
                      <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
                      <path d="m9 11 1 9" />
                      <path d="M4.5 15.5h15" />
                      <path d="m15 11-1 9" />
                    </svg>
                  </div>
                  <h2 className="title-font font-medium text-3xl text-gray-900 dark:text-gray-100">{getAllProduct.length}</h2>
                  <p className="text-pink-500 font-bold">Total Products</p>
                </div>
              </Tab>

              {/* Total Orders */}
              <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                <div className="border bg-slate-100 dark:bg-[#1c1c1c] hover:bg-slate-200 dark:hover:bg-[#323232] border-slate-300 px-4 py-3 rounded-xl">
                  <div className="text-pink-500 w-12 h-12 mb-3 inline-block">
                    {/* Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={50}
                      height={50}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-list-ordered"
                    >
                      <line x1={10} x2={21} y1={6} y2={6} />
                      <line x1={10} x2={21} y1={12} y2={12} />
                      <line x1={10} x2={21} y1={18} y2={18} />
                      <path d="M4 6h1v4" />
                      <path d="M4 10h2" />
                      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                    </svg>
                  </div>
                  <h2 className="title-font font-medium text-3xl text-gray-900 dark:text-gray-100">{getAllOrder.length}</h2>
                  <p className="text-pink-500 font-bold">Total Orders</p>
                </div>
              </Tab>

              {/* Total Users */}
              <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                <div className="border bg-slate-100 dark:bg-[#1c1c1c] hover:bg-slate-200 dark:hover:bg-[#323232] border-slate-300 px-4 py-3 rounded-xl">
                  <div className="text-pink-500 w-12 h-12 mb-3 inline-block">
                    {/* Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={50}
                      height={50}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-users"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx={9} cy={7} r={4} />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h2 className="title-font font-medium text-3xl text-gray-900 dark:text-gray-100">{getAllUser.length}</h2>
                  <p className="text-pink-500 font-bold">Total Users</p>
                </div>
              </Tab>
            </TabList>
            <TabPanel>
              <ProductDetail />
            </TabPanel>
            <TabPanel>
              <OrderDetail />
            </TabPanel>
            <TabPanel>
              <UserDetail />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
