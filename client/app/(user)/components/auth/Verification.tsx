// "use client";
// import Link from "next/link";
// import { redirect } from "next/navigation";
// import React, { FC, useEffect, useRef, useState } from "react";
// import toast from "react-hot-toast";
// import { VscWorkspaceTrusted } from "react-icons/vsc";
// import { useSelector } from "react-redux";
// import Header from "../global/Header";
// import Footer from "../global/Footer";
// import { styles } from "@/app/styles/styles";
// import { useActivationMutation } from "@/redux/features/auth/authApi";

// type props = {
//   setRoute:(route:string)=>void;
// };

// type VerifyNumber = {
//   "0": string;
//   "1": string;
//   "2": string;
//   "3": string;
// };

// const Verification: FC<props> = ({setRoute}) => {
//   const { token } = useSelector((state: any) => state.auth);
//   const [activation, { isSuccess, error, data }] = useActivationMutation();

//   useEffect(() => {
//     if (token) {
//       if (isSuccess) {
//         const message = data?.message || "Account activeted successful";
//         toast.success(message);
//         setRoute("login")
//       }
//       if (error) {
//         if ("data" in error) {
//           setIsInvaildError(true);
//           const errorData = error as any;
//           toast.error(errorData.data.message);
//         }
//       }
//     }
//   }, [isSuccess, error]);

//   const [isInvaildError, setIsInvaildError] = useState<boolean>(false);
//   const InputRefs = [
//     useRef<HTMLInputElement>(null),
//     useRef<HTMLInputElement>(null),
//     useRef<HTMLInputElement>(null),
//     useRef<HTMLInputElement>(null),
//   ];

//   const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
//     0: "",
//     1: "",
//     2: "",
//     3: "",
//   });

//   const verificationHandler = async () => {
//     const verificationisNumber = Object.values(verifyNumber).join("");
//     if (verificationisNumber.length !== 4) {
//       setIsInvaildError(true);
//       return;
//     }
//     await activation({
//       activation_token: token,
//       activation_code: verificationisNumber,
//     });
  
    
    
//   };

//   const handleInputChange = (index: number, value: string) => {
//     setIsInvaildError(false);

//     const newVerifyNumber = { ...verifyNumber, [index]: value };
//     setVerifyNumber(newVerifyNumber);

//     if (value === "" && index > 0) {
//       InputRefs[index - 1].current?.focus();
//     } else if (value.length === 1 && index < 3) {
//       InputRefs[index + 1].current?.focus();
//     }
//   };

//   return (
//     <>
//       <div className="w-full p-4">
//         <h1 className={`${styles.title}`}>Verification</h1>
//         <p className="text-xl text-gray-600 text-center dark:text-gray-300">
//           Verification Your Account
//         </p>
//         <VscWorkspaceTrusted className="text-[#2190ff] my-4 m-auto" size={100} />
//         <div className="m-auto items-center justify-around flex">
//           {Object.keys(verifyNumber).map((key, index) => (
//             <input
//               type="number"
//               key={key}
//               ref={InputRefs[index]}
//               className={`w-[55px] my-2 h-[55px] bg-transparent border-[3px] rounded-[10px] flex items-center dark:text-white text-black justify-center tex-[18px] font-Poppins outline-none text-center ${
//                 isInvaildError
//                   ? "shake border-red-600"
//                   : "dark:border-white border-[#0000004a]"
//               }`}
//               placeholder=""
//               maxLength={1}
//               value={verifyNumber[key as keyof VerifyNumber]}
//               onChange={(e) => handleInputChange(index, e.target.value)}
//             />
//           ))}
//         </div>
//         <button
//           className="bg-purple-700 mt-3 font-bold py-2 px-4 w-full rounded hover:bg-gray-600 disabled:opacity-50 dark:bg-slate-600 dark:hover:bg-slate-900"
//           onClick={verificationHandler}
//         >
//           Verify OTP
//         </button>
//         <h5
//           className={`text-center pt-4 font-Poppins text-[16px] ${styles.color}`}
//         >
//           {" "}
//           have any account than
//           <span
//             className="text-purple-700 pl-1 cursor-pointer"
//             onClick={() => setRoute("login")}
//           >
//             login
//           </span>
//         </h5>
//       </div>
//     </>
//   );
// };

// export default Verification;
import React from 'react'

const Verification = () => {
  return (
    <div>
      v
    </div>
  )
}

export default Verification
