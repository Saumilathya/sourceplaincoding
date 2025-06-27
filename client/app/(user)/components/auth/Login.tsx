"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../styles/styles";


type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const Login: React.FC<Props> = ({ setRoute, setOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email.includes("@")) {
      toast.error("Invalid email");
      return false;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Login successful");
        setOpen(false);
        redirect("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-auto">
      <h1 className={`${styles.title}`}>Login with ShareNotes</h1>
      <br />
      <form onSubmit={handleLogin}>
        <label className={`${styles.label} ${styles.color}`} htmlFor="email">
          Enter your email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="login12@gmail.com"
          className={`${styles.input}`}
        />

        <div className="w-full mt-3 relative mb-1">
          <label className={`${styles.label} ${styles.color}`} htmlFor="password">
            Enter your password
          </label>
          <input
            type={show ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password@1236"
            className={`${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className={`absolute bottom-3 right-2 z-1 cursor-pointer ${styles.color}`}
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className={`absolute bottom-3 right-2 z-1 cursor-pointer ${styles.color}`}
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>

        <div className="w-full mt-5">
          <input
            type="submit"
            value={loading ? "Logging in..." : "Login"}
            className={`${styles.button}`}
            disabled={loading}
          />
        </div>

        <br />
        <h5 className={`text-center pt-4 font-Poppins text-[16px] ${styles.color}`}>
          or join with
        </h5>

        <div className="flex items-center justify-center my-3">
          <AiFillGithub
            size={30}
            className="cursor-pointer mr-2 text-black dark:text-white"
            onClick={() => console.log("github")}
          />
          <FcGoogle
            size={30}
            className="cursor-pointer ml-2"
            onClick={() => console.log("google")}
          />
        </div>

        <h5 className={`text-center pt-4 font-Poppins text-[16px] ${styles.color}`}>
          not have any account?
          <span
            className="text-purple-700 pl-1 cursor-pointer"
            onClick={() => setRoute("Sign-up")}
          >
            Sign up
          </span>
        </h5>
      </form>
    </div>
  );
};

export default Login;
