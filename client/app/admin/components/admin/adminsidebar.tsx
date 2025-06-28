"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoArrowBack, IoBarChartOutline, IoHomeOutline, IoMapOutline, IoReceiptOutline } from "react-icons/io5";
import { MdExitToApp, MdManageHistory, MdOndemandVideo, MdPeopleOutline } from "react-icons/md";
import { PiWebcamDuotone } from "react-icons/pi";
import { FcVideoCall } from "react-icons/fc";
import { CiSettings } from "react-icons/ci";
import { TiGroupOutline } from "react-icons/ti";
import { IoMdArrowForward } from "react-icons/io";

interface itemsProps {
  title: string;
  to: string;
  icon: any;
  selected: string;
  setSelected: any;
}

const AdminSidebar = () => {
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState("Dashborad");
  const [isCollapsed, setIsCollapsed] = useState<Boolean>(false);
  const  user  = useSelector((state: any) => state.auth);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const adminSideItem = [
    {
      name: "Dashborad",
      icon: IoHomeOutline,
      to: "http://localhost:3000/admin",
      bol: true,
    },
    {
      name: "Data",
      icon: IoHomeOutline,
      to: "",
      bol: false,
    },
    {
      name: "Users",
      icon: MdPeopleOutline,
      to: "/admin/all-users",
      bol: true,
    },
    {
      name: "Invoice",
      icon: PiWebcamDuotone,
      to: "/admin",
      bol: true,
    },
    {
      name: "Content",
      icon: IoHomeOutline,
      to: "",
      bol: false,
    },
    {
      name: "Create Course",
      icon: MdOndemandVideo,
      to: "/admin/create-course",
      bol: true,
    },
    {
      name: "Live Course",
      icon: FcVideoCall,
      to: "/admin/all-courses",
      bol: true,
    },
    {
      name: "Customization",
      icon: IoHomeOutline,
      to: "",
      bol: false,
    },
    {
      name: "Hero",
      icon: MdManageHistory,
      to: "",
      bol: true,
    },
    {
      name: "Catogries",
      icon: CiSettings,
      to: "",
      bol: true,
    },
    {
      name: "Controllers",
      icon: IoHomeOutline,
      to: "",
      bol: false,
    },
    {
      name: "Manage Team",
      icon: TiGroupOutline,
      to: "",
      bol: true,
    },
    {
      name: "Analytics",
      icon: IoHomeOutline,
      to: "",
      bol: false,
    },
    {
      name: "Course Analytics",
      icon: IoBarChartOutline,
      to: "/admin/course-analytics",
      bol: true,
    },
    {
      name: "User Analytics",
      icon: IoReceiptOutline,
      to: "admin/user-analytics",
      bol: true,
    },
    {
      name: "Order Analytics",
      icon: IoMapOutline,
      to: "/admin/order-analytics",
      bol: true,
    },
    {
      name: "Exit",
      icon: MdExitToApp,
      to: "",
      bol: true,
    },
  ];

  return (
    <div className="overflow-scroll z-[9999999] h-[100vh]">
      {!isCollapsed && (
        <div className="flex px-4 py-2 justify-between items-center">
          <Link href="/">
            <h3 className="text-[22px] font-[500] dark:text-white text-black">
              ShareNotes
            </h3>
          </Link>

          <IoArrowBack
            className={`text-black dark:text-white text-[20px] cursor-pointer`}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        </div>
      )}

      {!isCollapsed && (
        <div className="m-2">
          {/* {user ? (
            <>
               <div className="flex justify-center items-center">
                <Image
                  src={user.user.avatar.url ? user.user.avatar.url : avartr}
                   className="cursor-pointer rounded-[50%] shadow"
                  alt="user-image"
                  width={100}
                height={100}
                />
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center">
              <Image
                alt="profile-uer"
                width={100}
                height={100}
                src={avatarDefailt}
                className="cursor-pointer rounded-[50%] shadow"
              />
            </div>
          )} */}

          <div className="text-center">
            <h3 className="text-[22px] font-[700] font-sans dark:text-white text-black">
              {user.user?.name}
            </h3>
            <p className="text-black dark:text-white font-[1rem]">
              -{user.user?.role}
            </p>
          </div>
        </div>
      )}

      <div className={`${isCollapsed ? undefined : ""} pl-6 py-5`}>
        {isCollapsed && (
          <IoMdArrowForward
            className={`text-black dark:text-white text-[20px] cursor-pointer`}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        )}
        {adminSideItem &&
          adminSideItem.map((item: any, index: number) => (
            <>
              {" "}
              <div className={` flex mt-4 items-center m-auto`}>
                {item.bol ? (
                  <Link
                    href={`${item.to}`}
                    onClick={() => setSelected(item.name)}
                  >
                    <div className="flex items-center justify-between">
                      <item.icon
                        className={`${
                          selected === item.name
                            ? "dark:text-[#37a39a] text-[crimson]"
                            : "dark:text-[#ffff] text-black"
                        } text-[20px] cursor-pointer`}
                      />
                      {!isCollapsed && (
                        <p
                          className={`${
                            selected === item.name
                              ? "dark:text-[#37a39a] text-[crimson]"
                              : "dark:text-[#ffff] text-black"
                          } text-[18px] px-6 text-center font-sans font-[500]`}
                        >
                          {item.name}
                        </p>
                      )}
                    </div>
                  </Link>
                ) : (
                  <>
                    {!isCollapsed && (
                      <p
                        className={`dark:text-[#ffff] text-black text-[20px] font-[400]`}
                      >
                        {item.name}
                      </p>
                    )}
                  </>
                )}
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
