"use client";

import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type Course = {
  _id: string;
  name: string;
  description: string;
  tags: string;
  demoUrl?: string;
  thumbnail?: {
    url: string;
    public_id: string;
  };
};

const CohortSection = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const { data, isLoading } = useGetUsersAllCoursesQuery({});

  // Set data when it's available
  useEffect(() => {
    if (data?.courses) {
      setCourses(data.courses);
    }
  }, [data]);

  return (
    <section className="text-white max-w-6xl mx-auto px-4 mt-20 md:mt-40">
      <h1 className="text-2xl md:text-3xl font-bold">Courses</h1>
      <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-4 leading-loose tracking-wide">
        Explore a selection of courses designed to help you enhance your
        skills.
      </p>

      {isLoading ? (
        <section className="max-w-6xl mx-auto px-4 mt-20 md:mt-40">
          <p className="text-center text-zinc-400">Loading courses…</p>
        </section>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {courses.map((course) => (
            <Link
              key={course._id}
              href={`/course/${course._id}`}
              className="group block p-2"
            >
              <div className="rounded-2xl shadow-lg overflow-hidden border border-zinc-700 hover:border-cyan-500 transition duration-300">
                <div className="relative h-48 sm:h-60 md:h-48 w-full">
                  <Image
                    src={
                      course.thumbnail?.url ||
                      course.demoUrl ||
                      "/images/placeholder.webp"
                    }
                    alt={course.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-center transition duration-500"
                  />
                </div>

                <div className="p-4">
                  <h4 className="text-zinc-100 font-bold tracking-wide text-lg">
                    {course.name}
                  </h4>

                  <p className="mt-2 text-zinc-400 text-sm line-clamp-3">
                    {course.description}
                  </p>

                  <div className="flex items-center space-x-2 mt-4">
                    <svg
                      className="h-4 w-4 text-zinc-500 group-hover:text-cyan-500 transition"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 9z" />
                      <path d="M3.146 4.146a.5.5 0 1 1 .708.708L2.707 6.5l1.147 1.646a.5.5 0 1 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2z" />
                      <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12z" />
                    </svg>
                    <span className="text-zinc-500 group-hover:text-cyan-500 text-xs">
                      {course.tags}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default CohortSection;
