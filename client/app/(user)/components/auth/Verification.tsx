"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { styles } from "../../styles/styles";

interface RootState {
  auth: {
    token: string | null;
  };
}

interface VerificationProps {
  setRoute: (route: "login" | "register" | string) => void;
}

const Verification: FC<VerificationProps> = ({ setRoute }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [activate, { isSuccess, error, data }] = useActivationMutation();
  const [isInvalidError, setIsInvalidError] = useState(false);
  const [code, setCode] = useState<string[]>(["", "", "", ""]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ] as const;

  const handleInputChange = (index: number, value: string) => {
    setIsInvalidError(false);
    if (!/^\d?$/.test(value)) return;
    const next = [...code];
    next[index] = value;
    setCode(next);
    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleVerify = async () => {
    const concatenated = code.join("");
    if (concatenated.length !== 4 || !token) {
      setIsInvalidError(true);
      return;
    }
    await activate({
      activation_token: token,
      activation_code: concatenated,
    });
  };

  useEffect(() => {
    if (!token) return;
    if (isSuccess) {
      toast.success(data?.message ?? "Account activated successfully");
      setRoute("login");
    }
    if (error && "data" in error) {
      setIsInvalidError(true);
      toast.error((error as any).data.message);
    }
  }, [isSuccess, error, data, token, setRoute]);

  return (
    <div className="w-full p-4">
      <h1 className={styles.title}>Verification</h1>
      <p className="text-xl text-gray-600 text-center dark:text-gray-300">
        Verify Your Account
      </p>
      <VscWorkspaceTrusted className="text-[#2190ff] my-4 m-auto" size={100} />
      <div className="flex items-center justify-around m-auto max-w-xs">
        {code.map((digit, idx) => (
          <input
            key={idx}
            ref={inputRefs[idx]}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(idx, e.target.value)}
            className={`w-[55px] h-[55px] bg-transparent border-[3px] rounded-[10px] text-center text-[18px] font-Poppins outline-none ${
              isInvalidError
                ? "shake border-red-600"
                : "dark:border-white border-[#0000004a]"
            } dark:text-white text-black`}
          />
        ))}
      </div>
      <button
        onClick={handleVerify}
        className="bg-purple-700 dark:bg-slate-600 mt-3 font-bold py-2 px-4 w-full rounded hover:bg-gray-600 dark:hover:bg-slate-900 disabled:opacity-50"
      >
        Verify OTP
      </button>
      <h5 className="text-center pt-4 font-Poppins text-[16px]">
        Have an account?
        <span
          className="text-purple-700 pl-1 cursor-pointer"
          onClick={() => setRoute("login")}
        >
          Login
        </span>
      </h5>
    </div>
  );
};

export default Verification;
