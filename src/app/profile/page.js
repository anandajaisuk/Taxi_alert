"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";  
import { getUserEmail } from "../actions/get_email_token";


const AccountManagement = () => {
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    email2: "",
    email3: "",
    email4: "",
    exp_email: "",
    exp_email2: "",
    exp_email3: "",
    exp_email4: "",
    fname: "",
    lname: "",
    line_id: "",
    tel: "",
    status: "",
  });

  const [rawexp_email, setRawexp_email] = useState("");
  const [rawexp_email2, setRawexp_email2] = useState("");
  const [rawexp_email3, setRawexp_email3] = useState("");
  const [rawexp_email4, setRawexp_email4] = useState("");

  useEffect(() => {
    const postData = async () => {
      try {
        const email = await getUserEmail()
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
          email: email , // Replace with the email in token cookie
        });

        console.log("Data sent successfully:", response.data);

        setRawexp_email(response.data.exp_email);
        setRawexp_email2(response.data.exp_email2);
        setRawexp_email3(response.data.exp_email3);
        setRawexp_email4(response.data.exp_email4);

        const formattedData = {
          ...response.data,
          exp_email: formatDate(response.data.exp_email),
        };

        setUserData(formattedData); // Update userData state with the response data
      } catch (error) {
        console.error("Error sending or fetching data:", error.message);
      }
    };

    postData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-5xl mx-auto">
        <h2 className="text-2xl font-light mb-6">จัดการบัญชีส่วนตัว</h2>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 font-light">อีเมลหลัก</label>
            <input
              type="email"
              value={userData.email}
              disabled
              className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm p-2 font-light"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-light">ไอดีไลน์</label>
            <input
              type="text"
              value={userData.line_id}
              disabled
              className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm p-2 font-light"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-light">ชื่อจริง</label>
            <input
              type="text"
              value={userData.fname}
              disabled
              className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm p-2 font-light"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-light">นามสกุล</label>
            <input
              type="text"
              value={userData.lname}
              disabled
              className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm p-2 font-light"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-light">เบอร์โทร</label>
            <input
              type="text"
              value={userData.tel}
              disabled
              className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm p-2 font-light"
            />
          </div>
        </div>
        <h3 className="text-2xl font-light mb-4">สถานะบัญชี / วันหมดอายุ</h3>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-separate border-spacing-y-3">
            <thead>
              <tr>
                <th className="w-1/3 text-center font-light">อีเมล</th>
                <th className="w-1/3 text-center font-light">สถานะ</th>
                <th className="w-1/3 text-center font-light">วันหมดอายุ</th>
              </tr>
            </thead>
            <tbody>
              {/* 1 */}
              <tr className="bg-[#f3f4f6] ">
                <td className="py-2 px-4 text-center rounded-l-md">
                  {userData.email}
                </td>
                <td className="text-center">
                  <span className="flex items-center justify-center">
                    {new Date(rawexp_email) > new Date() ? (
                      <>
                        <span className="mr-2">ใช้งานปกติ</span>
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      </>
                    ) : (
                      <>
                        <span className="mr-2">ค้างชำระ</span>
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      </>
                    )}
                  </span>
                </td>
                <td className="text-center px-4 rounded-r-md">
                  {userData.exp_email}
                </td>
              </tr>
              {/* 2 */}

              <tr className="bg-[#f3f4f6] ">
                <td className="py-2 px-4 text-center rounded-l-md">
                  {userData.email2}
                </td>
                <td className="text-center">
                  <span className="flex items-center justify-center">
                    {rawexp_email2 && rawexp_email2 !== "" ? (
                      new Date(rawexp_email2) > new Date() ? (
                        <>
                          <span className="mr-2">ใช้งานปกติ</span>
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        </>
                      ) : (
                        <>
                          <span className="mr-2">ค้างชำระ</span>
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        </>
                      )
                    ) : (
                      <span className="mr-2 py-2">
                        เพิ่มอีเมลสำหรับแจ้งเตือน ติดต่อแอดมิน +
                      </span>
                    )}
                  </span>
                </td>
                <td className="text-center px-4 rounded-r-md">
                  {userData.exp_email2}
                </td>
              </tr>

              {/* 3 */}
              <tr className="bg-[#f3f4f6] ">
                <td className="py-2 px-4 text-center rounded-l-md">
                  {userData.email3}
                </td>
                <td className="text-center">
                  <span className="flex items-center justify-center">
                    {rawexp_email3 && rawexp_email3 !== "" ? (
                      new Date(rawexp_email3) > new Date() ? (
                        <>
                          <span className="mr-2">ใช้งานปกติ</span>
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        </>
                      ) : (
                        <>
                          <span className="mr-2">ค้างชำระ</span>
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        </>
                      )
                    ) : (
                      <span className="mr-2 py-2">
                        เพิ่มอีเมลสำหรับแจ้งเตือน ติดต่อแอดมิน +
                      </span>
                    )}
                  </span>
                </td>
                <td className="text-center px-4 rounded-r-md">
                  {userData.exp_email3}
                </td>
              </tr>

              {/* 4 */}
              <tr className="bg-[#f3f4f6] ">
                <td className="py-2 px-4 text-center rounded-l-md">
                  {userData.email4}
                </td>
                <td className="text-center">
                  <span className="flex items-center justify-center">
                    {rawexp_email4 && rawexp_email4 !== "" ? (
                      new Date(rawexp_email4) > new Date() ? (
                        <>
                          <span className="mr-2">ใช้งานปกติ</span>
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        </>
                      ) : (
                        <>
                          <span className="mr-2">ค้างชำระ</span>
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        </>
                      )
                    ) : (
                      <span className="mr-2 py-2">
                        เพิ่มอีเมลสำหรับแจ้งเตือน ติดต่อแอดมิน +  
                      </span>
                    )}
                  </span>
                </td>
                <td className="text-center px-4 rounded-r-md">
                  {userData.exp_email4}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
