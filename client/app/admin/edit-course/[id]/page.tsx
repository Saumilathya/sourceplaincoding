"use client"
import React from "react";
import { useParams } from "next/navigation";
import AdminProtected from "@/app/hooks/useProtected";
import EditCourse from "../../components/admin/editCourse/editCourse";
import AdminSidebar from "../../components/admin/adminsidebar";
import AdminDashBoradHero from "../../components/admin/AdminDashBoradHero";

const Page = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  return (
    <AdminProtected>
      <div className="flex bg-transparent min-h-screen">
        <aside className="w-1/6 z-[9999999] bg-scroll">
          <AdminSidebar />
        </aside>

        <main className="w-5/6 h-full overflow-hidden">
          <AdminDashBoradHero />
          <div className="w-full h-[calc(100vh-80px)] overflow-y-auto">
            <EditCourse id={id} />
          </div>
        </main>
      </div>
    </AdminProtected>
  );
};

export default Page;
