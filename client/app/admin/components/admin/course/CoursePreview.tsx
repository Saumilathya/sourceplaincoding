import { styles } from "@/app/(user)/styles/styles";
import React, { FC } from "react";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

// Define types for course data
interface Benefit {
  title: string;
}

interface CoursePreviewProps {
  courseData: {
    name?: string;
    price?: number;
    estimatedPrice?: number;
    benefits?: Benefit[];
    description?: string;
  };
  setCourseData: (data: any) => void;
  handlCourseCreate: () => void;
  active: number;
  setActive: (active: number) => void;
  isEdit?: boolean;
}

const CoursePreview: FC<CoursePreviewProps> = ({
  courseData,
  setCourseData,
  handlCourseCreate,
  active,
  setActive,
  isEdit,
}) => {
  const preButton = () => {
    setActive(active - 1);
  };

  const discount =
    courseData?.estimatedPrice && courseData?.price
      ? ((courseData.estimatedPrice - courseData.price) /
          courseData.estimatedPrice) *
        100
      : 0;
  const discountPrice = discount.toFixed(0);

  return (
    <div className="w-[90%] mx-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-5">
          {/* TODO: Dynamically load video from courseContent if available */}
          <iframe
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/WpfI9ge5HYE?si=oUL8Q6UYyRnQmeYR"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="flex items-center">
        <h1 className="pt-5 text-[25px]">
          {courseData.price === 0 ? "Free" : `${courseData.price}$`}
        </h1>
        <h5 className="pt-3 text-[20px] mt-2 line-through opacity-50">
          {courseData.estimatedPrice}$
        </h5>
        <h4 className="pl-5 pt-4 text-[22px]">{discountPrice}% off</h4>
      </div>

      <div className="flex items-center">
        <div
          className={`${styles.button} !w-[180px] my-3 !bg-red-600 cursor-not-allowed`}
        >
          Buy Now {courseData.price}
        </div>
      </div>

      <p className="pb-1">Source code included</p>
      <p className="pb-1">Full lifetime access</p>
      <p className="pb-1">Certificate of completion</p>
      <p className="pb-1">Premium Support</p>

      <div className="w-full 800px:pr-3">
        <h1 className="font-Poppins font-[600] text-[25px]">
          {courseData?.name}
        </h1>

        <br />
        <h1 className="font-Poppins font-[600] text-[25px]">
          Why you should learn from this course:
        </h1>

        {courseData?.benefits?.map((item, index) => (
          <div
            key={index}
            className="w-full flex 800px:items-center py-2"
          >
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneCircle size={20} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}

        <br />
        <div className="w-full">
          <h1 className="font-Poppins font-[600] text-[25px]">
            Course Details
          </h1>
          <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden">
            {courseData?.description}
          </p>
        </div>
      </div>

      <div className="w-full flex mt-4 items-center justify-between">
        <button
          className="w-full 800px:w-[130px] flex items-center justify-center h-[40px] text-[20px] bg-[#37a39a] text-center text-white rounded mt-4 cursor-pointer"
          onClick={preButton}
        >
          Preview
        </button>

        <button
          onClick={handlCourseCreate}
          className="w-full 800px:w-[130px] flex items-center justify-center h-[40px] text-[20px] bg-[#37a39a] text-center text-white rounded mt-4 cursor-pointer"
        >
          {isEdit ? "Edit Course" : "Create"}
        </button>
      </div>
    </div>
  );
};

export default CoursePreview;
