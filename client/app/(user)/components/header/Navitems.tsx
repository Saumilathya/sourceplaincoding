import Link from "next/link";
import React, { FC } from "react";

export const navitems = [
  {
    icon: "",
    name: "Home",
    url: "/",
  },
  {
    name: "Roadmap",
    url: "/",
  },
  {
    name: "Course",
    url: "/courses",
  },
];

type Props = {
  activeItem: number;
  isMobile: Boolean;
};

const Navitems: FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden lg:flex">
        {navitems &&
          navitems.map((item, index) => (
            <Link href={`${item.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-[#ffff] text-black"
                } text-[18px] px-3 font-Poppins font-[400]`}
              >
                {item.name}
              </span>
            </Link>
          ))}
      </div>

      {isMobile && (
        <div className=" 800px:hidden">
          {navitems &&
            navitems.map((item, index) => (
              <Link href={`${item.url}`} passHref>
                <p
                  className={`${
                    activeItem === index
                      ? "dark:text-[#37a39a] text-[crimson]"
                      : "dark:text-[#ffff] text-black"
                  } text-[18px] py-2 text-center mt-3 font-mono font-[400]`}
                >
                  {item.name}
                </p>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default Navitems;
