import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdDashboard } from "react-icons/md";
import { MdCategory } from "react-icons/md";

import { IoAddCircleSharp, IoSettings } from "react-icons/io5";

const Sidebar = () => {
  const router = useRouter();
  const menuItems = [
    { path: "/", name: "Dashboard", icon: <MdDashboard size={20} /> },
    {
      path: "/categories",
      name: "Categories",
      icon: <MdCategory size={20} />,
    },
    {
      path: "/create",
      name: "Add Expense",
      icon: <IoAddCircleSharp size={20} />,
    },
    {
      path: "/settings",
      name: "Settings",
      icon: <IoSettings size={20} />,
    },
  ];
  return (
    <>
      <aside className="md:w-[15%] hidden md:block fixed h-screen p-5 bg-white">
        <div className="flex flex-col gap-6">
          <p className="text-3xl font-bold text-slate-600">Expense Tracker</p>
          <Divider />
          <div className="flex flex-col gap-3">
            {menuItems.map((item) => (
              <Button
                key={item.name}
                href={item.path}
                as={Link}
                className={`${
                  item.path === router.pathname
                    ? "bg-primary font-bold text-base text-white tracking-widest"
                    : "bg-transparent hover:bg-primary-200 text-base tracking-widest hover:text-white"
                } flex items-center justify-start gap-2`}
                variant="flat"
              >
                {item.icon}
                {item.name}
              </Button>
            ))}
          </div>
        </div>
      </aside>
      <div className="fixed z-50 w-full bg-white p-3 bottom-0 md:hidden flex justify-between items-center">
        {menuItems.map((item) => (
          <Button
            isIconOnly
            key={item.name}
            href={item.path}
            as={Link}
            className={`${
              item.path === router.pathname
                ? "bg-primary font-bold text-base text-white tracking-widest"
                : "bg-transparent hover:bg-primary-200 text-base tracking-widest hover:text-white"
            } flex items-center justify-center gap-2 `}
            variant="flat"
          >
            {item.icon}
          </Button>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
