
import React, { FC, useState } from 'react'
import { IoMdCheckmark } from 'react-icons/io'


type props = {
    active: number,
    setActive: (active: number) => void
}

const CourseOption: FC<props> = ({ active, setActive }) => {
    const options = [
        "Course Infomation",
        "Course Options",
        "Course Content",
        "Course Preview"
    ]
    return (
        <div>
            {options.map((item, index) => (
                <div key={index} className='w-full flex py-5'>
                    <div className={`w-[35px] h-[35px] rounded-full flex justify-center items-center ${active + 1 > index ? "bg-blue-500" : "bg-[#384766]"} relative`}>
                        <IoMdCheckmark className=' text-[25px]' />
                        {index !== options.length - 1 && (
                            <div className={`absolute h-[30px] w-1 ${active + 1 > index ? "bg-blue-500" : "bg-[#384766]"} bottom-[-100%]`}></div>
                        )}
                    </div>
                    <h5 className={`text-[20px] ${active === index ? "dark:text-white text-black" : "dark:text-white text-black"} pl-3`}>{item}</h5>
                </div>
            ))}
        </div>
    )
}

export default CourseOption;
