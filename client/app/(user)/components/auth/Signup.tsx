"use client";
import React, { useEffect, useState } from "react";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";
import { styles } from "../../styles/styles";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
});

const Signup: React.FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState<boolean>(false);
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
      <h2 className="text-3xl mb-4 font-semibold text-white text-center ">
        Create an Account!
      </h2>

      <div className="flex items-center justify-center my-4">
        <div className="flex items-center justify-center h-[44px] w-[220px] border rounded-md cursor-pointer border-gray-400">
          <FcGoogle size={25} />
          <p className="text-gray-600 font-semibold ml-2">
            Sign up with Google
          </p>
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
        <div className="mb-3 mt-4">
          <label className={`${styles.label}`} htmlFor="email">
            Enter your Name
          </label>
          <input
            type="text"
            name=""
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="johndoe"
            className={`${errors.name && touched.name && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.name && touched.name && (
            <span className="text-red-500 pt-2 block">{errors.name}</span>
          )}
        </div>
        <label className={`${styles.label}`} htmlFor="email">
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
