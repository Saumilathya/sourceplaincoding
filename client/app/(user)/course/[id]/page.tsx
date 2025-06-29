"use client";
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import { useEffect, useState } from "react";
import Navbar from "../../components/header/Navbar";
import CourseOverview from "../../components/cohorts/CourseOverview";

const Page = ({ params }: any) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("login");
  const [courseData, setCourseData] = useState<any>(null);

  const { data,  isLoading, error } = useGetCourseDetailsQuery(params.id);

  useEffect(() => {
    if (data && data.course) {
      setCourseData(data.course);
    }
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

      {isLoading && <p className="text-center text-white">Loading course...</p>}
      {error && <p className="text-center text-red-500">Failed to load course.</p>}

      {courseData && <CourseOverview course={courseData} />}
    </>
  );
};

export default Page;
