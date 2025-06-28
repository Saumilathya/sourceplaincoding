"use client";
import React, { useEffect } from "react";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  email: yup.string().email("Invalid email").required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
});

const Signup: React.FC<Props> = ({ setRoute }) => {
  const [register, { error, data, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Registration successful");
      setRoute("verification");
    } else if (error && "data" in error) {
      const err = error as any;
      toast.error(err.data?.message || "Something went wrong");
    }
  }, [isSuccess, error, data?.message, setRoute]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async (values) => {
      await register(values);
    },
  });

  const { errors, touched, values, handleSubmit, handleChange } = formik;

  return (
    <div className="w-full p-8">
      <h2 className="text-2xl font-semibold text-gray-700 text-center dark:text-gray-200">
        ShareNotes.com
      </h2>
      <p className="text-xl text-gray-600 text-center dark:text-gray-300">
        Create an Account!
      </p>

      <div className="flex items-center justify-center my-4">
        <div className="flex items-center justify-center h-[44px] w-[220px] border rounded-md cursor-pointer border-gray-400">
          <FcGoogle size={25} />
          <p className="text-gray-600 font-semibold ml-2">Sign up with Google</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="border-b w-1/5 lg:w-1/4"></span>
        <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400">
          or sign up with email
        </span>
        <span className="border-b w-1/5 lg:w-1/4"></span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            className={`${
              errors.name && touched.name ? "border-red-500 border-2" : ""
            } bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full`}
          />
        </div>

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
            } bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full`}
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
            } bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full`}
          />
        </div>

        <button
          type="submit"
          className="bg-gray-700 mt-8 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600 disabled:opacity-50 dark:bg-slate-600 dark:hover:bg-slate-900"
        >
          Create an account
        </button>
      </form>

      <div className="mt-4 flex items-center justify-between">
        <span className="border-b w-1/5 md:w-1/4"></span>
        <span
          className="text-xs text-gray-500 uppercase cursor-pointer dark:text-gray-400"
          onClick={() => setRoute("login")}
        >
          or Login
        </span>
        <span className="border-b w-1/5 md:w-1/4"></span>
      </div>
    </div>
  );
};

export default Signup;
