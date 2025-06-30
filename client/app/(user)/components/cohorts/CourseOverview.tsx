import Image from "next/image";
import Link from "next/link";
import Footer from "../footer/FooterSection";

interface CourseBenefit {
  _id: string;
  title:string
}

export interface CourseType {
  _id: string;
  name: string;
  description: string;
  categories: string;
  price: string; // consider converting to number if needed
  tags: string;
  level: string;
  demoUrl: string;
  thumbnail: {
    url: string;
  };
  benefits: CourseBenefit[];
  ratings: number;
  purchased: number;
  prerequisites: CourseBenefit[];
  reviews: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  courseContent: any[];
}



const CourseHeroSection = ({ course }: { course: CourseType }) => {
  const discountedPrice = (parseFloat(course.price) * 0.88).toFixed(0);

  return (
    <>
      <div className=" bg-black text-white flex pt-[4rem] px-4 lg:px-16">
        <div className="max-w-10xl w-full grid md:grid-cols-2 gap-8">
          {/* Left Content */}
          <div className="space-y-4  pr-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full w-fit text-sm font-medium">
              {course.categories}
              <span className=" ">✔</span>
            </div>

            <div className="inline-flex ml-3 items-center gap-2 px-3 py-1 bg-gray-800 rounded-full w-fit text-sm font-medium">
              {course.level}
              <span className="">✔</span>
            </div>

            <h1 className="text-3xl py-5 md:text-5xl font-extrabold bg-gradient-to-r from-orange-300 via-red-500 to-yellow-300 bg-clip-text text-transparent">
              {course.name}
            </h1>
            <p className=" text-lg font-light mt-5 bp-0  lg:max-w-xl">
              {course.description}
            </p>

            <p className="text-gray-300 text-xl">{course.tags}</p>

            {/* <div className="text-xl font-medium">
            Only{" "}
            <span className="line-through text-red-400">₹{course.price}</span>{" "}
            <span className="text-green-500 font-bold">
              ₹{discountedPrice}*
            </span>{" "}
            <span className="text-sm">(12% Off)</span>
          </div> */}
            <Link href={`/course/${course._id}/course-access`}>
              <button className="bg-green-500 cursor-pointer hover:bg-green-600 text-white mt-5 px-6 py-3 rounded-lg font-semibold text-lg transition">
                Start Learning
              </button>
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl ">
              <Image
                src={
                  course.demoUrl ||
                  course.thumbnail?.url ||
                  "/images/placeholder.webp"
                }
                alt={course.name}
                width={800}
                height={600}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className=" lg:flex w-full justify-around text-white py-10 px-6 md:px-20 space-y-10">
        {/* Prerequisites */}
        <div>
          <h1 className="text-[3rem] md:text-[6rem] opacity-30 font-bold mt-4 md:leading-[8rem] bg-clip-text  capitalize">
            Prerequisites
          </h1>

          <ul className="list-disc  list-inside space-y-2 text-gray-300">
            {course.prerequisites.length > 0 ? (
              course.prerequisites.map((item, idx) => (
                <li key={idx} className="leading-relaxed font-medium text-lg">
                  {item.title}
                </li>
              ))
            ) : (
              <p className="text-gray-400">
                No prerequisites required for this course.
              </p>
            )}
          </ul>
        </div>

        {/* Benefits */}
        <div>
          <h1 className="text-[3rem] md:text-[6rem] opacity-30  font-bold mt-4 md:leading-[8rem] bg-clip-text  capitalize">
            Benefits{" "}
          </h1>

          <ul className="list-disc list-inside space-y-2 text-gray-300">
            {course.benefits.map((item, idx) => (
              <li key={idx} className="leading-relaxed font-medium text-lg">
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="px-8 py-14 md:py-6 w-full h-full mt-12">
        <div className="flex flex-col lg:h-full w-full  items-center justify-center">
          <h1 className="md:text-[7rem] text-[4rem] font-bold mt-4 md:leading-[8rem] bg-clip-text  capitalize">
            Syullabus
          </h1>
          <h3 className="font-Josefin text-end text-[1.2rem]">{course.name}</h3>
        </div>
        <div></div>

        {/* section 3 */}
        <div className="md:w-[70%] mx-auto">
          <div className="mt-12">
            {course.courseContent.map((item, idx) => (
              <>
                <div className="w-[100%] mx-auto my-6 border opacity-30 border-white " />
                <ul className="list-disc w-full flex items-center justify-between">
                  <li
                    id="title"
                    className="text-[1.3rem] md:text-4xl font-medium !text-white md:font-bold "
                  >
                    {item.title}
                  </li>
                </ul>
              </>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseHeroSection;
