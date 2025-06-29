"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { useGetCourseContentQuery, useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import CourseOverview from "@/app/(user)/components/cohorts/CourseOverview";
import Navbar from "@/app/(user)/components/header/Navbar";
import CourseAccess from "@/app/(user)/components/cohorts/CourseAccess";

const Page = () => {
  const { id } = useParams() as { id?: string | string[] };
  const courseId = useMemo(() => (Array.isArray(id) ? id[0] : id), [id]);

  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("login");
  const [courseData, setCourseData] = useState<any>(null);

  const {
    data,
    isLoading,
    error,
  } = useGetCourseContentQuery(courseId!, {
    skip: !courseId,
  });

  useEffect(() => {
    if (data && data?.content) setCourseData(data.content);
  }, [data]);

  return (
    <>
      <Navbar
        activeItem={activeItem}
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
      />

      {isLoading && (
        <p className="text-center text-gray-700 dark:text-gray-200">
          Loading course…
        </p>
      )}
     

      {courseData && <CourseAccess course={courseData} />}
    </>
  );
};

export default Page;
