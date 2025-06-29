"use client";

import React, { useEffect, useState } from "react";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { styles } from "../../styles/styles";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
});

const Login = () => {
  const [show, setShow] = useState<boolean>(false);
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
    <div className="w-full px-8">
      <h2 className="text-2xl font-semibold text-gray-700 text-center dark:text-gray-200">
        Login account
      </h2>

      <div className="mt-4 mb-5 flex items-center justify-between">
        <span className="border-b w-1/5 lg:w-1/4"></span>
        <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400">
          or login with email
        </span>
        <span className="border-b w-1/5 lg:w-1/4"></span>
      </div>

      <form onSubmit={handleSubmit}>
        <label className={`${styles.label} `} htmlFor="email">
          Enter your Email
        </label>
        <input
          type="email"
          name=""
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="loginmail@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="email">
            Enter your password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password!@%"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute text-black bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute text-black bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}
        <div className="w-full mt-5">
          <input type="submit" value="Sign Up" className={`${styles.button}`} />
        </div>
        <br />
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
