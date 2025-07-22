"use client";
import { useMemo, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { styles } from "../../styles/styles";
import CourseContentList from "./Contentlist";
import { useGetCourseContentQuery } from "@/redux/features/courses/coursesApi";

type Props = {
  id: string;
  user: any;
  setOpen: any;
};

const CourseAccess = ({ id, user, setOpen }: Props) => {
  const [question, setQueestion] = useState("");
  const [activeVideo, setActiveVideo] = useState(0);
  const [activeBar, setActiveBar] = useState(0);
  const { data: contentData, isLoading } = useGetCourseContentQuery(id!, {
    skip: !id,
  });
  const data = contentData?.content;

  return (
    <>
      {isLoading && (
        <p className="text-center text-gray-700 dark:text-gray-200">
          Loading course…
        </p>
      )}

      {contentData.message == "Please login to access this resource" ||
        (contentData.message == "Json web token is expired, try again" && (
          <>
            <p className=" flex items-center justify-center max-h-screen text-center text-gray-700 dark:text-gray-200">
              Please Login first
            </p>
            <div
              onClick={() => setOpen(true)}
              className={`${styles.button} !w-[150px] mt-4 rounded-sm`}
            >
              Login First
            </div>
          </>
        ))}
      {contentData &&
        contentData.success(
          <>
            <div className="w-full grid lg:grid-cols-10">
              <div className="col-span-7">
                <div className="w-[95%] lg:w-[86%] py-4 m-auto">
                  <iframe
                    className="w-full h-[500]"
                    src={data[activeVideo].videoUrl}
                    allowFullScreen
                  />

                  <div className="w-full flex justify-between"></div>
                  <h1 className="pt-2 text-2xl font-[600] ">
                    {data[activeVideo].title}
                  </h1>
                  <br />
                  <div className="w-full p-3 flex items-center justify-between backdrop-blur-md rounded-sm bg-slate-700 shadow-[bg-slate-700] ">
                    {["Overview", "Resource", "Q/A", "Review"].map(
                      (text: any, index: number) => (
                        <h5
                          key={index}
                          className={`text-[20px] font-[400] opacity-100 cursor-pointer  ${
                            activeBar === index ? "text-red-500" : "text-white"
                          }`}
                          onClick={() => setActiveBar(index)}
                        >
                          {text}
                        </h5>
                      )
                    )}
                  </div>
                  <br />
                  {activeBar === 0 && (
                    <div className="text-[17px] text-white">
                      {data[activeVideo].description}
                    </div>
                  )}

                  {activeBar === 1 && (
                    <div className="text-[17px] text-white">
                      {data[activeVideo].links.map(
                        (item: any, index: number) => (
                          <>
                            <div className="text-[17px] flex items-center text-white">
                              {item.title} :
                              <Link href={item.url} download target="blank">
                                <div className="text-[17px] text-white ml-2 hover:text-blue-400">
                                  {item.url}
                                </div>
                              </Link>
                            </div>
                          </>
                        )
                      )}
                    </div>
                  )}

                  {activeBar === 2 && (
                    <>
                      <div className="w-full flex">
                        <div className="w-[40px] h-[40px]">
                          <Image
                            src={
                              "https://media.istockphoto.com/id/1477583639/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=OWGIPPkZIWLPvnQS14ZSyHMoGtVTn1zS8cAgLy1Uh24="
                            }
                            height={40}
                            width={40}
                            alt="user"
                            className=" bg-cover rounded-full"
                          />
                        </div>

                        <textarea
                          name=""
                          value={question}
                          onChange={(e) => setQueestion(e.target.value)}
                          id=""
                          cols={30}
                          maxLength={100}
                          rows={5}
                          placeholder="write your question related to topic"
                          className="outline-none bg-transparent ml-3 border border-[#f4f4e4] lg:w-full p-2 rounded w-[90%] text-[18px] "
                        ></textarea>
                      </div>
                      <div className="w-full flex justify-end">
                        <div
                          className={`${styles.button} !w-[150px] mt-4 rounded-sm`}
                        >
                          Submit
                        </div>
                      </div>
                    </>
                  )}

                  {activeBar === 3 && (
                    <>
                      <div className="w-full flex">
                        <div className="w-[40px] h-[40px]">
                          <Image
                            src={
                              "https://media.istockphoto.com/id/1477583639/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=OWGIPPkZIWLPvnQS14ZSyHMoGtVTn1zS8cAgLy1Uh24="
                            }
                            height={40}
                            width={40}
                            alt="user"
                            className=" bg-cover rounded-full"
                          />
                        </div>

                        <textarea
                          name=""
                          value={question}
                          onChange={(e) => setQueestion(e.target.value)}
                          id=""
                          cols={30}
                          maxLength={100}
                          rows={5}
                          placeholder="write your question related to topic"
                          className="outline-none bg-transparent ml-3 border border-[#f4f4e4] lg:w-full p-2 rounded w-[90%] text-[18px] "
                        ></textarea>
                      </div>
                      <div className="w-full flex justify-end">
                        <div
                          className={`${styles.button} !w-[150px] mt-4 rounded-sm`}
                        >
                          Submit
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="hidden lg:block mt-4 bg-[#090909]  mr-7 right-0 lg:col-span-3">
                <CourseContentList
                  setActiveVideo={setActiveVideo}
                  data={data}
                  activeVideo={activeVideo}
                />
              </div>
            </div>
          </>
        )}
    </>
  );
};

export default CourseAccess;
