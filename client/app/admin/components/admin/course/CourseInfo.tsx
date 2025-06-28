"use client";
import Image from "next/image";
import React, { FC, useState } from "react";

type props = {
  active: number;
  setActive: (active: number) => void;
  courseInfo: any;
  setCourseInfo: (active: any) => void;
};
const CourseInfo: FC<props> = ({
  active,
  setActive,
  courseInfo,
  setCourseInfo,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] mt-24 m-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="text-black dark:text-white text-[19px]"
          >
            Course Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="NERN stack full course"
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            className="border border-[#d1cedc] bg-white shadow dark:bg-[#2a0f4000] w-full text-black dark:text-white  mt-2 text-[17px] px-3 py-1"
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="description"
            className="text-black dark:text-white text-[19px]"
          >
            Description
          </label>
          <textarea
            id="description"
            cols={30}
            rows={6}
            name="description"
            required
            placeholder="write something amazing ..."
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            className="border border-[#d1cedc] bg-white shadow dark:bg-[#2a0f4000] w-full text-black dark:text-white  mt-2 text-[17px] px-3 py-1"
          ></textarea>
        </div>

        <div className="flex mb-3 justify-between">
          <div className="w-[45%]">
            <label
              htmlFor="price"
              className="text-black dark:text-white text-[19px]"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              required
              placeholder="79"
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              className="border border-[#d1cedc] bg-white shadow dark:bg-[#2a0f4000] w-full text-black dark:text-white  mt-2 text-[17px] px-3 py-1"
            />
          </div>
          <div className="w-[45%]">
            <label
              htmlFor="estimatedPrice"
              className="text-black dark:text-white text-[19px]"
            >
              estimatedPrice
            </label>
            <input
              type="text"
              id="estimatedPrice"
              name="estimatedPrice"
              required
              placeholder="69"
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              className="border border-[#d1cedc] bg-white shadow dark:bg-[#2a0f4000] w-full text-black dark:text-white  mt-2 text-[17px] px-3 py-1"
            />
          </div>
        </div>

        <div className="mb-3">
          <label
            htmlFor="tags"
            className="text-black dark:text-white text-[19px]"
          >
            tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            required
            placeholder="full stack"
            value={courseInfo.tags}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            className="border border-[#d1cedc] bg-white shadow dark:bg-[#2a0f4000] w-full text-black dark:text-white  mt-2 text-[17px] px-3 py-1"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="level"
            className="text-black dark:text-white text-[19px]"
          >
            level
          </label>
          <input
            type="text"
            id="level"
            name="level"
            required
            placeholder="Beginners"
            value={courseInfo.level}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, level: e.target.value })
            }
            className="border border-[#d1cedc] bg-white shadow dark:bg-[#2a0f4000] w-full text-black dark:text-white  mt-2 text-[17px] px-3 py-1"
          />
        </div>

        <div className="mb-3">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrag={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <Image
                src={courseInfo.thumbnail || courseInfo.thumbnail.url}
                width={130}
                height={130}
                alt=""
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-gray-400 text-[15px]">
                Drag & Drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[130px] h-[40px] text-[20px] bg-[#37a39a] text-center text-[#fff] rounded mt-4 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default CourseInfo;
