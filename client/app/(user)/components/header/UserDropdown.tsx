"use client";

import React from "react";
import Link from "next/link";

const UserDropdown = () => {
  return (
    <div className="w-64 rounded-xl bg-[#0f0f0f] text-white shadow-lg p-4 space-y-2">
      <div className="text-sm text-gray-400">Signed in as</div>
      <div className="font-semibold text-white break-words">
        saumilathya@gmail.com
      </div>

      <hr className="border-gray-700 my-2" />

      <div className="flex flex-col space-y-3 pt-0.5">
        <DropdownLink href="/profile" label="My Profile" />
         <DropdownLink href="/admin" label="Admin" />
        <DropdownLink href="/help" label="Help & Feedback" />
        <DropdownLink href="/logout" label="Log Out" />
      </div>
    </div>
  );
};

const DropdownLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="text-sm text-gray-300 hover:text-white transition-colors"
  >
    {label}
  </Link>
);

export default UserDropdown;
