"use client";

import React, { useEffect } from "react";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import Link from "next/link";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
});

const Login = () => {
  const [login, { error, data, isSuccess }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Login successful");
      redirect("/");
    }
    if (error && "data" in error) {
      const errorData = error as any;
      toast.error(errorData.data.message);
    }
  }, [isSuccess, error, data?.message]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  const { errors, touched, values, handleSubmit, handleChange } = formik;

  return (
    <div className="w-full p-8">
      <h2 className="text-2xl font-semibold text-gray-700 text-center dark:text-gray-200">
        ShareNotes.com
      </h2>
      <p className="text-xl text-gray-600 text-center dark:text-gray-300">
        Login account
      </p>

      <span className="flex items-center justify-center my-3">
        <div
          className="g_id_signin text-gray-600 font-bold"
          data-text="signup_with"
          data-type="standard"
        ></div>
        <div
          id="g_id_onload"
          data-client_id="92879692782-7nd751eusg5fep81a1vhm0r6hf0pdn54.apps.googleusercontent.com"
          data-ux_mode="redirect"
          data-login_uri="https://www.codewithharry.com/api/auth/googlelogin"
        ></div>
      </span>

      <div className="mt-4 flex items-center justify-between">
        <span className="border-b w-1/5 lg:w-1/4"></span>
        <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400">
          or login with email
        </span>
        <span className="border-b w-1/5 lg:w-1/4"></span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className={`${
              errors.email && touched.email ? "border-red-500 border-2" : ""
            } bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none`}
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
            Password
          </label>
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            className={`${
              errors.password && touched.password ? "border-red-500 border-2" : ""
            } bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none`}
          />
        </div>

        <button
          type="submit"
          className="bg-gray-700 mt-8 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600 disabled:opacity-50 dark:bg-slate-600 dark:hover:bg-slate-900"
        >
          Login
        </button>
      </form>

      <div className="mt-4 flex items-center justify-between">
        <span className="border-b w-1/5 md:w-1/4"></span>
        <span className="text-xs text-gray-500 uppercase dark:text-gray-400">
          <Link href="/auth/sign-up">or sign-up</Link>
        </span>
        <span className="border-b w-1/5 md:w-1/4"></span>
      </div>
    </div>
  );
};

export default Login;
