const UserDetail = () => {
  return (
    <div className="py-5">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-pink-500">All Users</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage user accounts and permissions</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <input type="search" placeholder="Search users..." className="w-full sm:w-64 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-[#1c1c1c] focus:outline-none focus:ring-2 focus:ring-pink-500" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1c1c1c] rounded-xl border border-slate-300 dark:border-slate-600 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#2c2c2c] border-b border-slate-300 dark:border-slate-600">
                <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">User</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">Role</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">Status</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">Joined Date</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors duration-200">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
                      <span className="text-sm font-medium text-pink-600 dark:text-pink-400">JD</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">John Doe</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">john@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">Customer</span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Active</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-300">Jan 15, 2024</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button className="inline-flex items-center justify-center w-8 h-8 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button className="inline-flex items-center justify-center w-8 h-8 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">100</span> results
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400">Previous</button>
              <button className="px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserDetail;
