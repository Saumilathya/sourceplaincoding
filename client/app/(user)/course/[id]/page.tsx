// "use client";

// import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
// import { useEffect, useState } from "react";
// import Navbar from "../../components/header/Navbar";

// const Page = ({ params }: any) => {
//   const [open, setOpen] = useState(false);
//   const [activeItem, setActiveItem] = useState(0);
//   const [route, setRoute] = useState("login");
//   const [courseData, setCourseData] = useState();
//   const { data, isSuccess, isLoading, error } = useGetCourseDetailsQuery(
//     params.id
//   );

//   useEffect(() => {
//     setCourseData(data?.course);
//   }, [data]);

//   return (
//     <>
//        <Navbar
//         activeItem={activeItem}
//         open={open}
//         setOpen={setOpen}
//         route={route}
//         setRoute={setRoute}
//       />
//       {/* <CourseOverview data={courseData} /> */}
//     </>
//   );
// };

// export default Page;

import React from 'react'

const Page = () => {
  return (
    <div>Page</div>
  )
}

export default Page