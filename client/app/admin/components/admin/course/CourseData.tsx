import React, { FC } from "react";
import { GrAddCircle } from "react-icons/gr";

type props = {
  active: number;
  setActive: (active: number) => void;
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerquisites: { title: string }[];
  setPrerquisites: (prerquisites: { title: string }[]) => void;
};

const CourseData: FC<props> = ({
  active,
  setActive,
  benefits,
  setBenefits,
  prerquisites,
  setPrerquisites,
}) => {
    const handleBenefitChange = (index: number, value: any) => {
        console.log(index, value);
      
        // Make a shallow copy of the benefits array
        const updatedBenefits = [...benefits];
        console.log(updatedBenefits);
      
        // Update the title of the benefit at the specified index
        if (updatedBenefits[index]) {
          updatedBenefits[index] = {
            ...updatedBenefits[index],
            title: value,
          };
        }
      
        // Update the state with the modified array
        setBenefits(updatedBenefits);
      };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerquisiteChange = (index: number, value: string) => {
    // Make a shallow copy of the prerequisites array
    const updatedPrerequisites = [...prerquisites];
  
    // Ensure the index is within bounds and update the title immutably
    if (updatedPrerequisites[index]) {
      updatedPrerequisites[index] = {
        ...updatedPrerequisites[index],
        title: value,
      };
    }
  
    // Update the state with the modified array
    setPrerquisites(updatedPrerequisites);
  };
  const handleAddPrerquisite = () => {
    setPrerquisites([...prerquisites, { title: "" }]);
  };

  const nextButton = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerquisites[prerquisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    }
  };

  const preButton = () => {
    setActive(active - 1);
  };

  return (
    <div className="w-[80%] mt-24 block">
      <div>
        <label
          htmlFor="benefit"
          className="text-black dark:text-white text-[19px]"
        >
          what are the benefits for students in this course
        </label>
        {benefits?.map((benefit: any, index: number) => (
          <input
            type="text"
            key={index}
            name="benefit"
            placeholder="you will be able to build a full stack LMs Platform..."
            required
            className="border mb-2 border-[#d1cedc] bg-white shadow dark:bg-[#2a0f4000] w-full text-black dark:text-white  mt-2 text-[17px] px-3 py-1"
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}

        <GrAddCircle
          size={25}
          style={{ margin: "20px 0px 0px 0px", cursor: "pointer" }}
          onClick={handleAddBenefit}
        />
      </div>
      <br />
      <div>
        <label
          htmlFor="prerquisite"
          className="text-black dark:text-white text-[19px]"
        >
          what are the prerquisites for students in this course
        </label>
        {prerquisites.map((prerquisite: any, index: number) => (
          <input
            type="text"
            key={index}
            name="prerquisite"
            placeholder="you will be able to build a full stack LMs Platform..."
            required
            className="border border-[#d1cedc] bg-white mb-2 shadow dark:bg-[#2a0f4000] w-full text-black dark:text-white  mt-2 text-[17px] px-3 py-1"
            value={prerquisite.title}
            onChange={(e) => handlePrerquisiteChange(index, e.target.value)}
          />
        ))}
        <GrAddCircle
          size={25}
          style={{ margin: "20px 0px 0px 0px", cursor: "pointer" }}
          onClick={handleAddPrerquisite}
        />
      </div>
      <div className="w-full flex mt-4 items-center justify-between">
        <button
          className="w-full 800px:w-[130px] flex items-center justify-center h-[40px] text-[20px] bg-[#37a39a] text-center text-[#fff] rounded mt-4 cursor-pointer"
          onClick={preButton}
        >
          preview
        </button>

        <button
          onClick={nextButton}
          className="w-full 800px:w-[130px] flex items-center justify-center h-[40px] text-[20px] bg-[#37a39a] text-center text-[#fff] rounded mt-4 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseData;
