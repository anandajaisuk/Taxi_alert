import Link from "next/link";

const Navbarhome = () => {
  const menu = [
    { name: "หน้าหลัก", href: "/" },
    { name: "ติดต่อเรา", href: "/about" },
    { name: "เข้าสู่ระบบ", href: "/login" },
  ];

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <div className="text-center">
              <span className="text-3xl text-yellow-400">TA</span>
              <span className="text-3xl">XI</span>
            </div>
          </Link>
          <ul className="flex gap-4">
            {menu.map((item, index) => (
              <li key={index} className="relative">
                <Link
                  href={item.href}
                  className="relative inline-block group cursor-pointer"
                >
                  {item.name}
                  <span className="absolute inset-x-0 -bottom-2 h-[4px] rounded-xl group-hover:bg-green-500 duration-300"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbarhome;
