"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CourseInfo from "../course/CourseInfo";
import CourseOption from "../course/CourseOption";
import CourseData from "../course/CourseData";
import CourseContent from "../course/CourseContent";
import CoursePreview from "../course/CoursePreview";
import {
  useEditCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";

type Props = { id: string };

interface BenefitOrPrerequisite {
  title: string;
}

interface LinkItem {
  title: string;
  url: string;
}

interface ContentItem {
  title: string;
  videoUrl: string;
  description: string;
  videoSection: string;
  links: LinkItem[];
  suggestion: string;
}

interface CourseInfoState {
  name: string;
  description: string;
  categories: string;
  price: number;
  estimatedPrice: number;
  thumbnail: string;
  tags: string;
  level: string;
  demoUrl: string;
}

export interface Course {
  _id: string;
  name: string;
  description: string;
  price: string; // or number if you're handling it numerically
  estimatedPrice: string; // same here
  tags: string; // comma-separated string; use string[] if already split
  level: "Beginner" | "Intermediate" | "Advanced" | string;
  thumbnail: {
    url: string;
    public_id?: string; // optional depending on your backend
  };
  benefits: {
    title: string;
  }[];
  prerequisites: {
    title: string;
  }[];
  demoUrl?: string;
  categories?: string;
  totalVideos?: number;
  courseContent?: {
    title: string;
    videoUrl: string;
    videoSection: string;
    description: string;
    links: {
      title: string;
      url: string;
    }[];
    suggestion: string;
  }[];
}

const EditCourse: React.FC<Props> = ({ id }) => {
  const router = useRouter();
  const [active, setActive] = useState(0);

  const {
    data,
    isLoading: isCoursesLoading,
    error: coursesError,
  } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });

  const [editCourse, { isSuccess: isUpdateSuccess, error: updateError }] =
    useEditCourseMutation();

  const courseToEdit =
    data?.courses?.find((course: Course) => course._id === id) ?? null;
  console.log(courseToEdit, "jjjl");

  const [courseInfo, setCourseInfo] = useState<CourseInfoState>({
    name: "",
    description: "",
    categories: "",
    price: 0,
    estimatedPrice: 0,
    thumbnail: "",
    tags: "",
    level: "",
    demoUrl: "",
  });

  const [benefits, setBenefits] = useState<BenefitOrPrerequisite[]>([
    { title: "" },
  ]);
  const [prerequisites, setPrerequisites] = useState<BenefitOrPrerequisite[]>([
    { title: "" },
  ]);
  const [courseContent, setCourseContent] = useState<ContentItem[]>([
    {
      title: "",
      videoUrl: "",
      description: "",
      videoSection: "Untitled Section",
      links: [{ title: "", url: "" }],
      suggestion: "",
    },
  ]);

  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success("Course updated successfully");
      router.push("/admin/all-courses");
    }
    if (updateError && "data" in updateError) {
      toast.error("Course update failed");
    }
  }, [isUpdateSuccess, updateError, router]);

  useEffect(() => {
    if (courseToEdit) {
      setCourseInfo({
        name: courseToEdit.name,
        description: courseToEdit.description,
        categories: courseToEdit.categories,
        price: courseToEdit.price,
        estimatedPrice: courseToEdit.estimatedPrice,
        thumbnail: courseToEdit?.thumbnail?.url || "",
        tags: courseToEdit.tags,
        level: courseToEdit.level,
        demoUrl: courseToEdit.demoUrl,
      });
      setBenefits(courseToEdit.benefits);
      setPrerequisites(courseToEdit.prerequisites);
      setCourseContent(courseToEdit.courseContent);
    }
    if (coursesError) {
      toast.error("Failed to fetch course");
    }
  }, [courseToEdit, coursesError]);

  const handleSubmit = () => {
    const formattedBenefits = benefits.map((b) => ({ title: b.title }));
    const formattedPrerequisites = prerequisites.map((p) => ({
      title: p.title,
    }));
    const formattedContent = courseContent.map((c) => ({
      title: c.title,
      videoUrl: c.videoUrl,
      videoSection: c.videoSection,
      description: c.description,
      links: c.links.map((l) => ({ title: l.title, url: l.url })),
      suggestion: c.suggestion,
    }));

    setCourseData({
      ...courseInfo,
      totalVideos: courseContent.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseContent: formattedContent,
    });
  };
  console.log(courseToEdit, "id");

  const handleCourseUpdate = async () => {
    if (!courseToEdit) return;
    await editCourse({ id: courseToEdit._id, data: courseData });
  };

  if (isCoursesLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen text-black dark:text-white">
        Loading course…
      </div>
    );
  }

  return (
    <div className="w-full flex overflow-scroll h-[100vh]">
      <div className="w-[80%] pl-6 p-3">
        {active === 0 && (
          <CourseInfo
            active={active}
            setActive={setActive}
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
          />
        )}
        {active === 1 && (
          <CourseData
            active={active}
            setActive={setActive}
            benefits={benefits}
            setBenefits={setBenefits}
            prerquisites={prerequisites}
            setPrerquisites={setPrerequisites}
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
            handlCourseCreate={handleCourseUpdate}
            active={active}
            setActive={setActive}
            isEdit
          />
        )}
      </div>

      <div className="w-[20%] mt-[100px] fixed right-[18px] top-8">
        <CourseOption active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
