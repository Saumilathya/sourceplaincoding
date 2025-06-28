"use client";

import React from "react";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { format } from "timeago.js";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";

interface Course {
  _id: string;
  name: string;
  purchased: number;
  createdAt: string;
  updatedAt: string;
}

const AllCourses: React.FC = () => {
  const { data, isLoading, error } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  if (data === undefined || isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen text-black dark:text-white">
        Loading courses...
      </div>
    );
  }



  const rows: any = data?.courses;

  return (
    <div className="w-full overflow-x-auto mt-24 px-6 py-3">
      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">ID</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Course name</th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">Purchased</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Updated At</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Created At</th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">Edit</th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">Delete</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y py-2.5 divide-gray-200 dark:divide-gray-800">
          {data && rows && rows.map((course:any) => (
            <tr key={course._id} className="hover:bg-gray-50  dark:hover:bg-gray-800">
              <td className="px-4 py-2 text-sm whitespace-nowrap">{course._id}</td>
              <td className="px-4 py-2 text-sm whitespace-nowrap">{course.name}</td>
              <td className="px-4 py-2 text-sm text-center whitespace-nowrap">{course.purchased}</td>
              <td className="px-4 py-2 text-sm whitespace-nowrap">{format(course.updatedAt)}</td>
              <td className="px-4 py-2 text-sm whitespace-nowrap">{format(course.createdAt)}</td>
              <td className="px-4 py-2 text-center whitespace-nowrap">
                <Link href={`/admin/edit-course/${course._id}`} className="inline-flex items-center">
                  <FiEdit2 size={18} className="text-blue-600 hover:text-blue-800 dark:text-blue-400" />
                </Link>
              </td>
              <td className="px-4 py-2 text-center whitespace-nowrap">
                <button
                  type="button"
                  onClick={() => {}}
                  className="inline-flex items-center"
                >
                  <AiOutlineDelete size={18} className="text-red-600 hover:text-red-800 dark:text-red-400" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCourses;
