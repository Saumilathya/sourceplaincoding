"use client";
import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import Navitems from "./Navitems";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import Image from "next/image";
import { HiOutlineCode, HiOutlineMenu, HiUser } from "react-icons/hi";
import { useSelector } from "react-redux";
import CustomModel from "../../utils/customModel";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Verification from "../auth/Verification";
import UserDropdown from "./UserDropdown";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route?: string;
  setRoute?: (route: string) => void;
};

const Navbar: FC<Props> = ({ activeItem, open, setOpen, route, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const [visiable, setVisiable] = useState(false);
  // const { data } = useSession();
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  useLogOutQuery(undefined, { skip: !logout });



  // useEffect(() => {
  //   if (!user && data) {
  //     socialAuth({
  //       email: data?.user?.email,
  //       name: data?.user?.name,
  //       avatar: data?.user?.image,
  //     });
  //   }
  //   if (data === null) {
  //     if (isSuccess) {
  //       toast.success("Login successful");
  //     }
  //     setLogout(true);
  //   }
  // }, [data, user, socialAuth, isSuccess]);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <>
      <div className="w-full relative" >
        <div
          className={`${
            active
              ? "fixed top-0 left-0 w-full bg-black h-[80px] dark:opacity-100 shadow-xl z-[999999999] transition duration-500"
              : "w-full h-[80px] dark:shadow z-[999999999] border-b dark:border-[#ffffff1C]"
          }`}
        >
          <div className="w-[95%] lg:w-[92%] m-auto py-2 h-full">
            <div className="w-full h-[80px] flex items-center justify-between p-3">
              <Link
                href="/"
                className="text-[25px] font-Poppins font-[500] text-purple-700 dark:text-white"
              >
                <Image
                  src="/logo.svg"
                  width={50}
                  height={50}
                  className="h-[50px] bg-cover rounded-xl"
                  alt="logo"
                />
              </Link>
              <Navitems activeItem={activeItem} isMobile={false} />

              <div className="lg:flex items-center hidden">
                {user ? (
                  <>
                    {user.avatar ? (
                      <Image
                        src={user.avatar.url}
                        width={25}
                        height={25}
                        alt="user"
                        className="rounded-full bg-cover outline-none border border-purple-700 shadow"
                      />
                    ) : (
                      <HiUser
                        onClick={() => setVisiable(!visiable)}
                        size={25}
                        className="cursor-pointer dark:text-white text-black"
                      />
                    )}
                  </>
                ) : (
                  <HiUser
                    onClick={() => setOpen(true)}
                    size={25}
                    className="cursor-pointer dark:text-white text-black"
                  />
                )}
              </div>

              <div className="lg:hidden">
                {openSidebar ? (
                  <HiOutlineCode
                    size={25}
                    className="cursor-pointer dark:text-white"
                    onClick={() => setOpenSidebar(false)}
                  />
                ) : (
                  <HiOutlineMenu
                    size={25}
                    className="cursor-pointer dark:text-white"
                    onClick={() => setOpenSidebar(true)}
                  />
                )}
              </div>
            </div>
          </div>

          {openSidebar && (
            <div
              className="fixed w-full h-full top-0 left-0 z-[9999] bg-[#000024] dark:bg-[unset]"
              onClick={handleClose}
              id="screen"
            >
              <div className="w-[70%] fixed z-[9999999] flex items-center flex-col h-full bg-white dark:bg-slate-900 dark:opacity-35 top-0 right-0">
                {user ? (
                  <Link href="/profile">
                    {user.avatar ? (
                      <Image
                        src={user.avatar.url}
                        width={25}
                        height={25}
                        alt="user"
                        className="rounded-full bg-cover outline-none border border-purple-700 shadow"
                      />
                    ) : (
                      <HiUser
                        onClick={() => setVisiable(!visiable)}
                        size={25}
                        className="cursor-pointer dark:text-white text-black"
                      />
                    )}
                  </Link>
                ) : (
                  <div
                    className="btn2 cursor-pointer dark:text-white hover:!text-black"
                    onClick={() => setOpen(true)}
                  >
                    Login
                  </div>
                )}
                <Navitems activeItem={activeItem} isMobile={true} />
              </div>
            </div>
          )}
        </div>
      
      </div>
        {visiable && (
        <div className="fixed top-16 z-50 right-15 rounded-xl shadow-2xl shadow-orange-800">
          <UserDropdown />
        </div>
      )}

      

      {route === "login" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
        />
      )}

      {route === "Sign-up" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Signup}
        />
      )}

      {route === "verification" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        />
      )}
    </>
  );
};

export default Navbar;
