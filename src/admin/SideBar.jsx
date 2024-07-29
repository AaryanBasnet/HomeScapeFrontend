import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftRightIcon,
  PackageOpen,
  User,
  LayoutDashboard,
  HelpCircleIcon,
  House,
  PlusCircleIcon,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";

const variants = {
  expanded: { width: "220px" },
  nonexpanded: { width: "60px" },
};

const navLinks = [
  {
    link: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },

  {
    link: "/admin/products",
    label: "Products",
    icon: House,
  },
  {
    link: "/admin/inquiry",
    label: "Inquiry",
    icon: PackageOpen,
  },

  {
    link: "/admin/support",
    label: "Support",
    icon: HelpCircleIcon,
  },
  {
    link: "/admin/addadmin",
    label: "AddAdmin",
    icon: PlusCircleIcon,
  },
  {
    link: "/admin/addagent",
    label: "AddAgent",
    icon: Plus,
  },
];

function SideBar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true); 

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (windowWidth < 768) {
        setIsExpanded(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
    console.log("User logged out");
  };

  return (
    <motion.div
      animate={isExpanded ? "expanded" : "nonexpanded"}
      variants={variants}
      className={
        "py-10 h-screen flex flex-col border border-r-1 bg-[#FDFDFD] relative" +
        (isExpanded ? " px-10" : " px-2 duration-500")
      }
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer absolute -right-3 top-10 rounded-full w-6 h-6 bg-[#FF8C8C] md:flex hidden justify-center items-center"
      >
        <FaArrowRight className="text-white" />
      </div>

      <div className="logo-div flex space-x-4 items-center">
        <FaHouseChimney className="text-red-900 sm:text-2xl md:w-6 w-4 ml-2" />
        <span className={!isExpanded ? "hidden" : "block"}>
          <span className="text-black text-md">Home</span>
          <span className="text-blue-600 text-md">Scape</span>
        </span>
      </div>

      <div className="flex flex-col space-y-8 mt-12 flex-grow">
        {navLinks.map((item, index) => (
          <div className="nav-links w-full" key={index}>
            <Link to={item.link} className="flex items-center gap-3">
              <div
                onClick={() => setActiveIndex(index)}
                className={
                  "flex space-x-3 w-full p-2 rounded " +
                  (activeIndex === index
                    ? "bg-[#FF8C8C] text-white"
                    : "text-black") +
                  (!isExpanded ? " pl-3" : "")
                }
              >
                <item.icon className="md:w-6 w-4" />
                <span className={!isExpanded ? "hidden" : "block"}>
                  {item.label}
                </span>
              </div>
            </Link>
          </div>
        ))}
        <div
          onClick={handleLogout}
          className={
            "flex space-x-3 w-full p-2 rounded cursor-pointer text-black" +
            (!isExpanded ? " pl-3" : "")
          }
        >
          <BiLogOut className="md:w-6 w-4" />
          <button
            className={!isExpanded ? "hidden" : "block"}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default SideBar;
