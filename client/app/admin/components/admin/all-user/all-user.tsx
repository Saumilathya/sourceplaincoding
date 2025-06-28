"use client";

import React from "react";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";

const AllUsers = () => {
  const { data, isLoading, error } = useGetAllUsersQuery({});

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-black dark:text-white">
        Loading users...
      </div>
    );
  }

  if (error || !data?.users) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 dark:text-red-400">
        Failed to fetch users.
      </div>
    );
  }

  const users = data.users;

  return (
    <div className="w-full overflow-x-auto mt-24 px-6 py-3">
      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">ID</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Email</th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">Role</th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">Courses</th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">Delete</th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">Email</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {users.map((user: any) => (
            <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-4 py-2 text-sm whitespace-nowrap">{user._id}</td>
              <td className="px-4 py-2 text-sm whitespace-nowrap">{user.name}</td>
              <td className="px-4 py-2 text-sm whitespace-nowrap">{user.email}</td>
              <td className="px-4 py-2 text-sm text-center whitespace-nowrap">{user.role}</td>
              <td className="px-4 py-2 text-sm text-center whitespace-nowrap">{user.courses?.length || 0}</td>
              <td className="px-4 py-2 text-center whitespace-nowrap">
                <button
                  type="button"
                  onClick={() => {
                    // TODO: handle delete mutation
                  }}
                  className="inline-flex items-center"
                >
                  <AiOutlineDelete className="text-red-600 hover:text-red-800 dark:text-red-400" size={20} />
                </button>
              </td>
              <td className="px-4 py-2 text-center whitespace-nowrap">
                <a href={`mailto:${user.email}`} className="inline-flex items-center">
                  <AiOutlineMail className="text-blue-600 hover:text-blue-800 dark:text-blue-400" size={20} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
