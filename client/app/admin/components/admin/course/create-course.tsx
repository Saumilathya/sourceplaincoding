"use client";
import React, { FC, useEffect, useState } from "react";
import CourseInfo from "./CourseInfo";
import CourseOption from "./CourseOption";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type props = {};
const CreateCourse: FC<props> = () => {
  const [active, setActive] = useState(0);
  const [createCourse, { isSuccess, error }] = useCreateCourseMutation();

  const [couresInfo, setCourseInfo] = useState({
    name: String,
    description: String,
    categories: String,
    price: Number,
    estimatedPrice: String,
    thumbnail: String,
    tags: String,
    level: String,
    demoUrl: String,
  });

  const [benefits, setBenfits] = useState([{ title: "" }]);
  const [prerquisites, setPrerquisites] = useState([{ title: "" }]);
  const [courseContent, setCourseContent] = useState([
    {
      title: "",
      videoUrl: "",
      description: "",
      videoSection: "Untitled Section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});
 
  const handleSubmit = () => {
    const formatBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    const formatPrerquisites = prerquisites.map((prerquisite) => ({
      title: prerquisite.title,
    }));

    const formatCourseContent = courseContent.map((courseContent) => ({
      title: courseContent.title,
      videoUrl: courseContent.videoUrl,
      videoSection: courseContent.videoSection,
      description: courseContent.description,
      links: courseContent.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: courseContent.suggestion,
    }));

    const data = {
      name: couresInfo.name,
      description: couresInfo.description,
      price: couresInfo.price,
      estimatedPrice: couresInfo.estimatedPrice,
      tags: couresInfo.tags,
      level: couresInfo.level,
      thumbnail: couresInfo.thumbnail,
      totalVideos: courseContent.length,
      benefits: formatBenefits,
      prerquisites: formatPrerquisites,
      courseContent: formatCourseContent,
    };

    setCourseData(data);
  };

  const handlCourseCreate = async () => {
    await createCourse(courseData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("course create successfully");
      redirect("/admin/all-courses");
    }
    if (error) {
      if ("data" in error) {
        console.log(error);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full flex overflow-scroll h-[100vh]">
      <div className="w-[80%] pl-6 p-3">
        {active === 0 && (
          <CourseInfo
            active={active}
            setActive={setActive}
            courseInfo={couresInfo}
            setCourseInfo={setCourseInfo}
          />
        )}
        {active === 1 && (
          <CourseData
            active={active}
            setActive={setActive}
            benefits={benefits}
            setBenefits={setBenfits}
            prerquisites={prerquisites}
            setPrerquisites={setPrerquisites}
          />
        )}
        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContent={courseContent}
            setCourseContent={setCourseContent}
            handleSubmit={handleSubmit}
          />
        )}

        {active === 3 && (
          <CoursePreview
            courseData={courseData}
            setCourseData={setCourseData}
            handlCourseCreate={handlCourseCreate}
            active={active}
            setActive={setActive}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] z-[-1] fixed right-[18px] top-8">
        <CourseOption active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
