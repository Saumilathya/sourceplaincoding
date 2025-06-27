import Image from "next/image";
import Link from "next/link";

const courses = [
  {
    title: "Docker Mastery Course",
    link: "https://pro.piyushgarg.dev/learn/docker",
    image: "/images/courses/docker.webp",
    description:
      "In this course, you will learn everything you need to know about Docker, a powerful tool for creating, deploying, and managing containerized applications.",
  },
  {
    title: "Full Stack Twitter Clone",
    link: "https://learn.piyushgarg.dev/learn/twitter-clone",
    image: "/images/courses/twitter-clone.webp",
    description:
      "Create a FullStack Twitter Clone that allows users to create and post tweets, follow other users, and like, and view their own profiles and the profiles of other users.",
  },
  {
    title: "NextJS 14",
    link: "https://learn.piyushgarg.dev/learn/nextjs-14",
    image: "/images/courses/next-js.webp",
    description:
      "Welcome to 'Mastering Next.js 14 Course' a comprehensive course designed to elevate your skills in developing modern web applications using Next.js version 14.",
  },
];

const CohortSection = () => {
  return (
    <section className="text-white max-w-6xl mx-auto px-4 mt-20 md:mt-40">
      <h1 className="text-2xl md:text-3xl font-bold">Courses</h1>
      <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-4 leading-loose tracking-wide">
        Explore a selection of courses designed to help you enhance your skills.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {courses.map((course, index) => (
          <Link
            href={course.link}
            target="_blank"
            key={index}
            className="group block p-2 relative"
          >
            <div className="rounded-2xl overflow-hidden bg-zinc-800 border border-transparent group-hover:border-zinc-700 relative z-10">
              <div className="h-44 sm:h-60 md:h-44 w-full relative bg-black/10 group-hover:bg-transparent transition duration-500">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover object-center mix-blend-multiply"
                />
              </div>
              <div className="p-4">
                <h4 className="text-zinc-100 font-bold tracking-wide mt-4">
                  {course.title}
                </h4>
                <p className="mt-4 text-zinc-400 tracking-wide leading-relaxed text-sm">
                  {course.description}
                </p>
                <div className="flex items-center space-x-2 mt-4 px-0.5">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    className="h-3 w-3 stroke-1.5 text-zinc-500 group-hover:text-cyan-500"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 9zM3.854 4.146a.5.5 0 1 0-.708.708L4.793 6.5 3.146 8.146a.5.5 0 1 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2z"></path>
                    <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12z"></path>
                  </svg>
                  <p className="text-zinc-500 group-hover:text-cyan-500 text-xs">
                    View Course
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CohortSection;
