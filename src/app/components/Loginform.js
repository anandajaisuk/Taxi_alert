"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Loginform = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginPromise = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login/api`, {
      email,
      password,
    });

    toast.promise(
      loginPromise,
      {
        pending: "กำลังเข้าสู่ระบบ...",
        success: {
          render() {
            setTimeout(() => router.push("/alerts"), 1000);
            return "เข้าสู่ระบบสำเร็จ";
          },
          icon: "🚕",
        },
        error: {
          render({ data }) {
            console.error("Error logging in:", data);
            return "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
          },
        },
      },
      {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />
      <div className="w-full max-w-md p-8 bg-green rounded-xl shadow-md">
        <div className="flex flex-col items-center space-y-8">
          <div className="flex flex-col items-center space-y-2">
            <div className="font-bold text-3xl text-white">TAXI</div>
            <div className="font-bold text-black">เข้าสู่ระบบ</div>
            <div className="flex gap-2">
              <div className="text-white">ยังไม่มีสมาชิกใช่ไหม?</div>
              <Link href="register">
                <div className="text-black hover:underline cursor-pointer">
                  สมัครสมาชิก
                </div>
              </Link>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full max-w-xs"
          >
            <label htmlFor="email" className="mb-1">
              อีเมล
            </label>
            <input
              id="email"
              className="rounded-md h-8 w-full px-2 mb-2 focus:outline-none text-sm"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="กรอกอีเมล"
              required
            />
            <label htmlFor="password" className="mb-1">
              รหัสผ่าน
            </label>
            <input
              id="password"
              className="rounded-md h-8 w-full px-2 mb-4 focus:outline-none text-sm"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="กรอกรหัสผ่าน"
              required
            />
            <button
              type="submit"
              className="rounded-md h-8 w-full bg-black text-white hover:bg-gray-800 mt-2 mb-2"
            >
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Loginform;
