"use client";
import React, { useEffect, useState } from "react";
import AdminDashBoradHero from "./components/admin/AdminDashBoradHero";
import AdminSidebar from "./components/admin/adminsidebar";
import socketIO from "socket.io-client";
import AdminProtected from "../hooks/useProtected";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const Page = () => {
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    socketId.on("connection", () => {});
    setisMounted(true);
  }, []);

  if (!isMounted) {
    return;
  }

  return (
    <AdminProtected>
      <div className="flex bg-transparent">
        <div className="w-1/6 z-[9999999] bg-scroll">
          <AdminSidebar />
        </div>
        <div className="w-[85%] h-[100vh] overflow-y-hidden pb-3">
          <AdminDashBoradHero />
          <div className="w-full overflow-y-scroll"></div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
