"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

const Registerform = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [lineId, setLineId] = useState("");
  const [tel, setTel] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expDate = new Date();
    expDate. setDate(expDate.getDate() + 3);
    const expEmail = expDate.toISOString(); // Format date to ISO 8601 format

    const registerPromise = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register/api`, {
      email,
      password,
      fname,
      lname,
      line_id: lineId,
      tel,
      exp_email: expEmail
    });

    toast.promise(
      registerPromise,
      {
        pending: 'กำลังสมัครสมาชิก...',
        success: {
          render() {
            setTimeout(() => router.push("/login"), 1000);
            return 'สมัครสมาชิกสำเร็จ';
          },
          icon: "🚕",
        },
        error: {
          render({data}) {
            console.error("Error registering:", data);
            return 'เกิดข้อผิดพลาดในการสมัครสมาชิก';
          }
        }
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
      <div className="w-full max-w-md p-8 bg-yellow-light  rounded-xl shadow-md">
        <div className="flex flex-col items-cent  er space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <div className="font-bold text-3xl text-white">TAXI</div>
            <div className="font-bold text-black">สมัครสมาชิก</div>
            <div className="flex gap-2">
              <div className="text-white">มีบัญชีอยู่แล้ว?</div>
              <Link href="login">
              <div className="text-black hover:underline cursor-pointer">
                เข้าสู่ระบบ
              </div>
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-2">
              <label htmlFor="email" className="block mb-1">อีเมล</label>
              <input
                id="email"
                className="rounded-md h-8 w-full px-2 focus:outline-none text-sm"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="กรอกอีเมล"
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="block mb-1">รหัสผ่าน</label>
              <input
                id="password"
                className="rounded-md h-8 w-full px-2 focus:outline-none text-sm"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="กรอกรหัสผ่าน"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <label htmlFor="fname" className="block mb-1">ชื่อจริง</label>
                <input
                  id="fname"
                  className="rounded-md h-8 w-full px-2 focus:outline-none text-sm"
                  type="text"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  placeholder="กรอกชื่อจริง"
                  required
                />
              </div>
              <div>
                <label htmlFor="lname" className="block mb-1">นามสกุล</label>
                <input
                  id="lname"
                  className="rounded-md h-8 w-full px-2 focus:outline-none text-sm"
                  type="text"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  placeholder="กรอกนามสกุล"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <label htmlFor="lineId" className="block mb-1">Line ID</label>
                <input
                  id="lineId"
                  className="rounded-md h-8 w-full px-2 focus:outline-none text-sm"
                  type="text"
                  value={lineId}
                  onChange={(e) => setLineId(e.target.value)}
                  placeholder="กรอก id line"
                  required
                />
              </div>
              <div>
                <label htmlFor="tel" className="block mb-1">เบอร์โทรศัพท์</label>
                <input
                  id="tel"
                  className="rounded-md h-8 w-full px-2 focus:outline-none text-sm"
                  type="tel"
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
                  placeholder="กรอกเบอร์โทรศัพท์"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="rounded-md h-8 w-full bg-black text-white hover:bg-gray-800 mt-2"
            >
              สมัครสมาชิก
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registerform;