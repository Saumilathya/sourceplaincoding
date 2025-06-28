"use client";
import { ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface ProtectedProps {
  children: ReactNode;
}

interface User {
  name: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  courses: string[]; // Better to type array
}

interface RootState {
  auth: {
    user: User | null;
  };
}


export default function AdminProtected({ children }: ProtectedProps) {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined) {
      if (!user || user.role !== "admin") {
        router.replace("/");
      } else {
        setLoading(false);
      }
    }
  }, [user, router]);

  if (loading) {
    return <div className="text-center text-white mt-20">Loading...</div>;
  }

  return <>{children}</>;
}
