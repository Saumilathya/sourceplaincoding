import React from "react";

import CreateCourse from "../components/admin/course/create-course";
import AdminProtected from "@/app/hooks/useProtected";
import AdminSidebar from "../components/admin/adminsidebar";
import AdminDashBoradHero from "../components/admin/AdminDashBoradHero";

const Page = () => {
  return (
    <AdminProtected>
      <div className="flex bg-transparent">
        <div className="w-1/6 z-[9999999] bg-scroll">
          <AdminSidebar />
        </div>
        <div className="w-[85%] h-[100vh] overflow-y-hidden pb-3">
          <AdminDashBoradHero />
          <div className="w-full overflow-y-scroll">
            <CreateCourse/>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
