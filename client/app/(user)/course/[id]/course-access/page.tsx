"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Navbar from "@/app/(user)/components/header/Navbar";
import CourseAccess from "@/app/(user)/components/cohorts/CourseAccess";
import { useSelector } from "react-redux";
import { RootState } from "@/app/hooks/useProtected";

const Page = () => {
  const { id } = useParams() as { id: string };
  const { user } = useSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("login");

  return (
    <>
      <Navbar
        activeItem={activeItem}
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
      />

      <CourseAccess id={id} user={user} setOpen={setOpen} />
    </>
  );
};

export default Page;
