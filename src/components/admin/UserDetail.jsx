import myContext from "@/context/myContext";
import { fireDB } from "@/firebase/FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Users, Shield } from 'lucide-react';

const UserDetail = () => {
  const context = useContext(myContext);
  const { loading, getAllUser } = context;
  const [searchTerm, setSearchTerm] = useState("");
  const [editUserRole, setEditUserRole] = useState("");

   // Stats data
   const stats = [
    {
      title: "Customers",
      value: getAllUser.filter((user) => user.role === "Customer").length,
      icon: <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      bgColor: "bg-blue-100 dark:bg-blue-900"
    },
    {
      title: "Admins",
      value: getAllUser.filter((user) => user.role === "Admin").length,
      icon: <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />,
      bgColor: "bg-green-100 dark:bg-green-900"
    }
  ];

  // Role styles for badges
  const roleStyles = {
    "Customer": {
      bg: "bg-blue-100 dark:bg-blue-900",
      text: "text-blue-800 dark:text-blue-200"
    },
    "Admin": {
      bg: "bg-green-100 dark:bg-green-900",
      text: "text-green-800 dark:text-green-200"
    }
  };

  // Filter users based on search term
  const filteredUsers = getAllUser.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  
  const updateUserRoleFunction = async(e, id) => {
    const role = e.target.value;
    console.log(id);
    try {
      await updateDoc(doc(fireDB, "users", id), { role: e.target.value });
      toast.success("Order Status updated successfully!");
      setEditUserRole("");
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while updating the order status!");
    }
  };

  return (
    <div className="py-5">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-pink-500">All Users</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage user accounts and permissions</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <input
            type="search"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-[#1c1c1c] focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white dark:bg-[#1c1c1c] p-4 rounded-xl border border-slate-300 dark:border-slate-600">
            <div className="flex items-center gap-3">
              <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1c1c1c] rounded-xl border border-slate-300 dark:border-slate-600 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#2c2c2c] border-b border-slate-300 dark:border-slate-600">
                <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">User</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">UserId</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">Role</th>
                <th className="min-w-[130px] px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">Joined Date</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {currentUsers.map((user) => {
                const { uid, name, role, email, date } = user;
                return (
                  <tr key={uid} className="hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
                          <span className="text-sm font-medium text-pink-600 dark:text-pink-400">
                            {name
                              .split(" ") // Split the name into parts by space
                              .map((part) => part[0]?.toUpperCase()) // Take the first character of each part and uppercase it
                              .join("")}{" "}
                            {/* Join the initials */}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{uid}</td>
                    <td className="px-6 py-4">
                      {editUserRole !== uid ? (
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${roleStyles[role]?.bg} ${roleStyles[role]?.text}`}>
                          {role}
                        </span>
                      ) : (
                        <select
                          onChange={(e) => updateUserRoleFunction(e, user.id)}
                          value={role}
                          className="px-2 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-[#1c1c1c] focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-600"
                        >
                          <option value="Customer">Customer</option>
                          <option value="Admin">Admin</option>
                        </select>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">{date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button onClick={()=> setEditUserRole(uid)} className="inline-flex items-center justify-center w-8 h-8 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to <span className="font-medium">{Math.min(indexOfLastUser, filteredUsers.length)}</span> of <span className="font-medium">{filteredUsers.length}</span> results
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserDetail;
