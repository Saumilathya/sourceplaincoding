"use client";
import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiOutlineCode, HiOutlineMenu, HiUser } from "react-icons/hi";
import Navitems from "./Navitems";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Verification from "../auth/Verification";
import CustomModel from "../../utils/customModel";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Navbar: FC<Props> = ({ activeItem, open, setOpen, route, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [user, setUser] = useState({});
  const [logout, setLogout] = useState(false);

  //   useEffect(() => {
  //     if (!user && data) {
  //       socialAuth({
  //         email: data?.user?.email,
  //         name: data?.user?.name,
  //         avatar: data?.user?.image,
  //       });
  //     }
  //     if (data === null) {
  //       if (isSuccess) {
  //         toast.success("Login successful");
  //       }
  //       setLogout(true);
  //     }
  //   }, [data, user, socialAuth, isSuccess]);

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
      <div className="w-full relative">
        <div className={`${active ? "navbar" : "navbar2"}`}>
          <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
            <div className="w-full h-[80px] flex items-center justify-between p-3">
              <Link
                href="/"
                className="text-[25px] font-Poppins font-[500] text-purple-700 dark:text-white"
              >
                logo
                {/* <img
                  src="/logo.svg"
                  className="h-[50px] bg-cover rounded-xl"
                  alt="logo"
                /> */}
              </Link>

              <Navitems activeItem={activeItem} isMobile={false} />
              <div className="hidden lg:flex">
                <HiUser
                  onClick={() => setOpen(true)}
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                />
              </div>

              {/* {user ? (
                  <Link href="/profile">
                    {user.avatar ? (
                      <Image
                        src={user.avatar.url || webroadmap}
                        width={25}
                        height={25}
                        alt="user"
                        className="rounded-full bg-cover outline-none border border-purple-700 shadow"
                      />
                    ) : (
                      <HiUser
                        size={25}
                        className="cursor-pointer dark:text-white text-black"
                      />
                    )}
                  </Link>
                ) : (
                  <Link href="/auth/login">
                    <HiUser
                      size={25}
                      className="cursor-pointer dark:text-white text-black"
                    />
                  </Link>
                )} */}

              <div className=" lg:hidden">
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
                {/* {user ? (
                  <Link href="/profile">
                    {user.avatar ? (
                      <Image
                        src={user.avatar.url || webroadmap}
                        width={25}
                        height={25}
                        alt="user"
                        className="rounded-full bg-cover outline-none border border-purple-700 shadow"
                      />
                    ) : (
                      <HiUser
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
                )} */}
                <HiUser
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                />
                <Navitems activeItem={activeItem} isMobile={true} />
              </div>
            </div>
          )}
        </div>
      </div>

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
