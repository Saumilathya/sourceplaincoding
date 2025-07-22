"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { format } from "timeago.js";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import { Box, Modal } from "@mui/material";
import { styles } from "@/app/(user)/styles/styles";
import toast from "react-hot-toast";

interface Course {
  _id: string;
  name: string;
  purchased: number;
  createdAt: string;
  updatedAt: string;
}

const AllCourses: React.FC = () => {
  const { data, isLoading, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [courseId, setCourseId] = useState("");
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("Course Deleted Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error, refetch]);

  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id);
  };

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
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              ID
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Course name
            </th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">
              Purchased
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Updated At
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Created At
            </th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">
              Edit
            </th>
            <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y py-2.5 divide-gray-200 dark:divide-gray-800">
          {data &&
            rows &&
            rows.map((course: any) => (
              <tr
                key={course._id}
                className="hover:bg-gray-50  dark:hover:bg-gray-800"
              >
                <td className="px-4 py-2 text-sm whitespace-nowrap">
                  {course._id}
                </td>
                <td className="px-4 py-2 text-sm whitespace-nowrap">
                  {course.name}
                </td>
                <td className="px-4 py-2 text-sm text-center whitespace-nowrap">
                  {course.purchased}
                </td>
                <td className="px-4 py-2 text-sm whitespace-nowrap">
                  {format(course.updatedAt)}
                </td>
                <td className="px-4 py-2 text-sm whitespace-nowrap">
                  {format(course.createdAt)}
                </td>
                <td className="px-4 py-2 text-center whitespace-nowrap">
                  <Link
                    href={`/admin/edit-course/${course._id}`}
                    className="inline-flex items-center"
                  >
                    <FiEdit2
                      size={18}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                    />
                  </Link>
                </td>
                <td className="px-4 py-2 text-center whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="inline-flex items-center"
                  >
                    <AiOutlineDelete
                      onClick={() => {
                        setOpen(!open);
                        setCourseId(course._id);
                      }}
                      size={18}
                      className="text-red-600 hover:text-red-800 dark:text-red-400"
                    />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(!open)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
            <h1 className={`${styles.title}`}>
              Are you sure you want to delete this course?
            </h1>
            <div className="flex w-full items-center justify-between mb-6 mt-4">
              <div
                className={`${styles.button} !w-[120px] h-[30px] bg-[#47d097]`}
                onClick={() => setOpen(!open)}
              >
                Cancel
              </div>
              <div
                className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f]`}
                onClick={handleDelete}
              >
                Delete
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default AllCourses;
