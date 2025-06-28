import React, { FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { BsLink45Deg } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type props = {
  active: number;
  setActive: (active: number) => void;
  courseContent: any;
  setCourseContent: (courseContent: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<props> = ({
  active,
  setActive,
  courseContent,
  setCourseContent,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContent.length).fill(false)
  );
  const [activeSection, setActiveSection] = useState(1);
  const handleSubmit = (e: any) => {
    if (
      courseContent[courseContent.length - 1].title === "" ||
      courseContent[courseContent.length - 1].description === "" ||
      courseContent[courseContent.length - 1].videoUrl === "" ||
      courseContent[courseContent.length - 1].links[0].title === "" ||
      courseContent[courseContent.length - 1].links[0].url === ""
    ) {
      alert("section can`t be empty");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  const handleCollapseToggle = (index: number) => {
    const updateCollapsed = [...isCollapsed];
    updateCollapsed[index] = !updateCollapsed[index];
    setIsCollapsed(updateCollapsed);
  };

  const handleRemoveLink = (index: number, linkindex: number) => {
    const updateData = [...courseContent];
    updateData[index].links.splice(linkindex, 1);
    setCourseContent(updateData);
  };

  const handleAddLink = (index: number) => {
    const updateData = [...courseContent];
    updateData[index].links.push({ title: "", url: "" });
    setCourseContent(updateData);
  };

  const newAddSection = () => {
    if (
      courseContent[courseContent.length - 1].title === "" ||
      courseContent[courseContent.length - 1].description === "" ||
      courseContent[courseContent.length - 1].videoUrl === "" ||
      courseContent[courseContent.length - 1].links[0].title === "" ||
      courseContent[courseContent.length - 1].links[0].url === ""
    ) {
      alert("please fill all the field first");
    } else {
      setCourseContent(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untittled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContent([...courseContent, newContent]);
    }
  };

  const newContentHandler = (item: any) => {
    if (
      item.videoSection === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title.url === ""
    ) {
      alert("please fill all the fields first");
    } else {
      let newVideoSection = "";
      if (courseContent.length > 0) {
        const lastVideoSection =
          courseContent[courseContent.length - 1].videoSection;
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };
      setCourseContent([...courseContent, newContent]);
    }
  };
  const preButton = () => {
    setActive(active - 1);
  };

  return (
    <div className="w-[80%] mt-24 block">
      <form onSubmit={handleSubmit}>
        {courseContent &&
          courseContent.map((item: any, index: number) => {
            
            const showSectionInput =
              index === 0 ||
              item.videoSection !== courseContent[index - 1].videoSection;
            return (
              <>
                <div key={index}
                  className={`w-full bg-[#cdc8c817] p-4 ${
                    showSectionInput ? "mt-10" : "mb-0"
                  }`}
                >
                  {showSectionInput && (
                    <>
                      <div className="flex w-full items-center">
                        <input
                          type="text"
                          className={`${
                            item.videoSection === "Untittled Section"
                              ? "w-[170px]"
                              : "w-min"
                          } text-[20px] cursor-pointer text-black dark:text-white bg-transparent outline-none`}
                          id=""
                          value={item.videoSection}
                          onChange={(e) => {
                            const updatedData = [...courseContent];

                            if (updatedData[index]) {
                              updatedData[index] = {
                                ...updatedData[index],
                                videoSection: e.target.value,
                              };
                            }

                            setCourseContent(updatedData);
                          }}
                        />

                        <BiPencil className=" cursor-pointer text-black dark:text-white" />
                      </div>
                      <br />
                    </>
                  )}
                  <div className="flex w-full items-center justify-between">
                    {isCollapsed[index] ? (
                      <>
                        {item.title ? (
                          <p className=" font-sans text-black dark:text-white">
                            {index + 1}.{item.title}
                          </p>
                        ) : (
                          <></>
                        )}{" "}
                      </>
                    ) : (
                      <div></div>
                    )}

                    {/* {} */}
                    <div className="flex items-center">
                      <AiOutlineDelete
                        className={`text-black dark:text-white mr-2 text-[20px] ${
                          index > 0 ? "cursor-pointer" : "cursor-no-drop"
                        }`}
                        onClick={() => {
                          if (index > 0) {
                            const updateData = [...courseContent];
                            updateData.splice(index, 1);
                            setCourseContent(updateData);
                          }
                        }}
                      />
                      <MdOutlineKeyboardArrowDown
                        fontSize="large"
                        className={`text-black dark:text-white`}
                        style={{
                          transform: isCollapsed[index]
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                        onClick={() => {
                          handleCollapseToggle(index);
                        }}
                      />
                    </div>
                  </div>
                  {!isCollapsed[index] && (
                    <>
                      <div className="my-3">
                        <label
                          htmlFor="title"
                          className="text-black dark:text-white text-[19px]"
                        >
                          video title
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          required
                          placeholder="Project plan..."
                          value={item.title}
                          onChange={(e: any) => {
                            const updatedData = [...courseContent];
                            if (updatedData[index]) {
                              updatedData[index] = {
                                ...updatedData[index],
                                title: e.target.value,
                              };
                            }
                            setCourseContent(updatedData);
                          }}
                          className="border border-[#d1cedc] bg-white shadow dark:bg-[#2a0f4000] w-full text-black dark:text-white  mt-2 text-[17px] px-3 py-1"
                        />
                      </div>

                      <div className="my-3">
                        <label
                          htmlFor="videourl"
                          className="text-black dark:text-white text-[19px]"
                        >
                          video url
                        </label>
                        <input
                          type="text"
                          id="videourl"
                          name="videourl"
                          required
                          placeholder="video Url"
                          value={item.videoUrl}
                          onChange={(e: any) => {
                            const updatedData = [...courseContent];

                            // Ensure the index is within bounds and update the videoUrl immutably
                            if (updatedData[index]) {
                              updatedData[index] = {
                                ...updatedData[index],
                                videoUrl: e.target.value,
                              };
                            }

                            // Update the state with the modified array
                            setCourseContent(updatedData);
                          }}
                          className="border border-[#d1cedc] bg-white shadow dark:bg-[#2a0f4000] w-full text-black dark:text-white  mt-2 text-[17px] px-3 py-1"
                        />
                      </div>

                      <div className="my-3">
                        <label
                          htmlFor="description"
                          className="text-black dark:text-white text-[19px]"
                        >
                          video description
                        </label>
                        <textarea
                          cols={20}
                          rows={8}
                          id="description"
                          name="description"
                          required
                          placeholder="video description"
                          value={item.description}
                          onChange={(e: any) => {
                            const updatedData = [...courseContent];

                            // Ensure the index is within bounds and update the description immutably
                            if (updatedData[index]) {
                              updatedData[index] = {
                                ...updatedData[index],
                                description: e.target.value,
                              };
                            }

                            // Update the state with the modified array
                            setCourseContent(updatedData);
                          }}
                          className="border border-[#aa96f3] bg-white shadow dark:bg-[#2a0f4000] w-full text-black dark:text-white  mt-2 text-[17px] px-3 py-1"
                        ></textarea>
                      </div>

                      {item?.links.map((link: any, linkindex: number) => (
                        <div className="my-3" key={linkindex}>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="linkTitle"
                              className="text-black dark:text-white text-[19px]"
                            >
                              Link {linkindex + 1}
                            </label>
                            <AiOutlineDelete
                              className={`${
                                linkindex === 0
                                  ? "cursor-no-drop"
                                  : "cursor-pointer"
                              } text-black dark:text-white text-block text-[20px]`}
                              onClick={() =>
                                linkindex === 0
                                  ? null
                                  : handleRemoveLink(index, linkindex)
                              }
                            />
                          </div>
                          <input
                            type="text"
                            id="linktitle"
                            name="linkTitle"
                            required
                            placeholder="link title"
                            value={link.title}
                            onChange={(e: any) => {
                              const updatedData = [...courseContent];

                              // Ensure the index and linkIndex are within bounds and update the title immutably
                              if (
                                updatedData[index] &&
                                updatedData[index].links[linkindex]
                              ) {
                                const updatedLinks = [
                                  ...updatedData[index].links,
                                ];
                                updatedLinks[linkindex] = {
                                  ...updatedLinks[linkindex],
                                  title: e.target.value,
                                };
                                updatedData[index] = {
                                  ...updatedData[index],
                                  links: updatedLinks,
                                };
                              }

                              // Update the state with the modified array
                              setCourseContent(updatedData);
                            }}
                            className="border border-[#d1cedc] bg-white shadow dark:bg-[#2a0f4000] w-full text-black dark:text-white  mt-2 text-[17px] px-3 py-1"
                          />

                          <input
                            type="text"
                            id="videourl"
                            name="link_url"
                            required
                            placeholder="link url"
                            value={link.url}
                            onChange={(e: any) => {
                                const updatedData = [...courseContent];

                                // Ensure the index and linkIndex are within bounds and update the url immutably
                                if (updatedData[index] && updatedData[index].links[linkindex]) {
                                  const updatedLinks = [...updatedData[index].links];
                                  updatedLinks[linkindex] = {
                                    ...updatedLinks[linkindex],
                                    url: e.target.value,
                                  };
                                  updatedData[index] = {
                                    ...updatedData[index],
                                    links: updatedLinks,
                                  };
                                }
                              
                                // Update the state with the modified array
                                setCourseContent(updatedData);
                            }}
                            className="border border-[#d1cedc] bg-white shadow dark:bg-[#2a0f4000] w-full text-black dark:text-white  mt-3 text-[17px] px-3 py-1"
                          />
                        </div>
                      ))}

                      {/*  */}
                      <div className="inline-block mb-4">
                        <p
                          className=" font-sans flex items-center text-[18px] cursor-pointer text-black dark:text-white"
                          onClick={() => handleAddLink(index)}
                        >
                          <BsLink45Deg className="mr-2" /> add Link
                        </p>
                      </div>
                    </>
                  )}
                  <br />
                  {index == courseContent.length - 1 && (
                    <div>
                      <p
                        className=" font-sans flex items-center text-[18px] cursor-pointer text-black dark:text-white"
                        onClick={() => newContentHandler(item)}
                      >
                        <AiOutlinePlusCircle className="mr-2" /> add New Content
                      </p>
                    </div>
                  )}
                </div>
              </>
            );
          })}
        <br />
        <div>
          <p
            className=" font-sans flex items-center text-[18px] cursor-pointer text-black dark:text-white"
            onClick={newAddSection}
          >
            <AiOutlinePlusCircle className="mr-2" /> add New Content
          </p>
        </div>
      </form>
      <div className="w-full flex mt-4 items-center justify-between">
        <button
          className="w-full 800px:w-[130px] flex items-center justify-center h-[40px] text-[20px] bg-[#37a39a] text-center text-[#fff] rounded mt-4 cursor-pointer"
          onClick={preButton}
        >
          preview
        </button>

        <button
          onClick={handleSubmit}
          className="w-full 800px:w-[130px] flex items-center justify-center h-[40px] text-[20px] bg-[#37a39a] text-center text-[#fff] rounded mt-4 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseContent;
