import logo from "./../logo_cusc.png";
import { MdMenuOpen } from "react-icons/md";
import { FaBookBookmark } from "react-icons/fa6";
import { FaUsersRectangle } from "react-icons/fa6";
import { GrAchievement } from "react-icons/gr";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdEventAvailable } from "react-icons/md";

const menuItems = [
  {
    icons: <FaBookBookmark size={20} />,
    label: "Chương trình đào tạo",
    link: "/cirriculum",
  },
  {
    icons: <FaUsersRectangle size={20} />,
    label: "Danh sách sinh viên",
    link: "/student",
  },
  {
    icons: <GrAchievement size={20} />,
    label: "Tổng hợp điểm thi",
    link: "/score",
  },
  {
    icons: <MdEventAvailable size={20} />,
    label: "Điểm rèn luyện",
    link: "/activity",
  },
];
export default function SiderBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const location = useLocation();
  return (
    <nav
      className={`shadow-md h-screen bg-yellow-400 text-gray p-2 transition-all duration-500 ${
        isMenuOpen ? "w-60" : "w-16"
      }`}
    >
      {/* Header Section */}
      <div className="border rounded-md bg-white border-black px-3 py-2 h-20 flex items-center justify-between">
        <img
          src={logo}
          alt="Logo"
          className={`${
            isMenuOpen ? "w-20 opacity-100 scale-100" : "w-0 opacity-0 scale-0"
          } rounded-md`}
        />
        <MdMenuOpen
          className={`text-3xl cursor-pointer duration-500 ${
            !isMenuOpen && "rotate-180"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      {/* Body */}

      <ul>
        {menuItems.map((item, index) => {
          return (
            <Link
              to={item.link}
              key={index}
              className={`relative px-4 py-4 my-2 hover:bg-yellow-500 cursor-pointer flex items-center group
               ${location.pathname === item.link ? "bg-yellow-500 font-semibold text-white" : "hover:bg-yellow-500"}`}
            >
              <div className="flex items-center">
                <span>{item.icons}</span>
                <span
                  className={`ml-3 transition-all duration-500 overflow-hidden whitespace-nowrap ${
                    !isMenuOpen ? "w-0 opacity-0" : "w-auto opacity-100"
                  }`}
                >
                  {item.label}
                </span>
              </div>

              <span
                className={`absolute shadow-md rounded-md bg-white text-black
                whitespace-nowrap
                transition-all duration-300
                overflow-hidden
                left-12
                ${isMenuOpen ? "hidden" : "w-0 p-0 opacity-0"}
                group-hover:w-fit
                group-hover:p-2
                group-hover:opacity-100
                group-hover:left-16
                z-10  
              `}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
