"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { logout } from "../actions/delete_token";

const Sidenavbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      router.push("/");
    }
  };

  const isActive = (path) => {
    return pathname === path ? "bg-green-400 text-black" : "text-white";
  };

  return (
    <nav className="bg-gray-900 text-white w-64 min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-light">TAXI ALERT</h1>
      </div>
      <ul className="flex-grow">
        <li className="mb-4">
          <Link
            href="/alerts"
            className={`flex items-center hover:bg-green-400 hover:text-black duration-100
               p-2 rounded ${isActive(
              "/alerts"
            )}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <div>แจ้งเตือน</div>
          </Link>
        </li>
        <li className="mb-4">
          <Link
            href="/profile"
            className={`flex items-center hover:bg-green-400 hover:text-black duration-100 p-2 rounded ${isActive(
              "/profile"
            )}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <div>บัญชีส่วนตัว</div>
          </Link>
        </li>
      </ul>
      <div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full"
        >
        
            ออกจากระบบ
          
        </button>
      </div>
    </nav>
  );
};

export default Sidenavbar;