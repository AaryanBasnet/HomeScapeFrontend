import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Logo from "../assets/gymkhanalogo.png";
import { GiMeat } from "react-icons/gi";
import {
  ArrowLeftRightIcon,
  PackageOpen,
  User,
  LayoutDashboard,
  HelpCircleIcon,
  House,
  PlusCircleIcon,
} from "lucide-react";
import { motion } from "framer-motion";
// import ArrowRight from "../assets/right-arrow.png";
import { FaArrowRight } from "react-icons/fa";

const variants = {
  expanded: { width: "220px" },
  nonexpanded: { width: "60px" },
};
import { FaHouseChimney } from "react-icons/fa6";


const navLinks = [
  {
    link: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    link: "/admin/customers",
    label: "Customers",
    icon: User,
  },
  {
    link: "/admin/products",
    label: "Products",
    icon: House,
  },
  {
    link: "/admin/orders",
    label: "Orders",
    icon: PackageOpen,
  },
  {
    link: "/admin/payment",
    label: "Payment",
    icon: ArrowLeftRightIcon,
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
];

function SideBar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
        {/* <img src={ArrowRight} className="w-2" alt="Toggle Sidebar" /> */}
        <FaArrowRight className="text-white" />
      </div>

      <div className="logo-div flex space-x-4 items-center">
        {/* <img src={Logo} className="md:w-6 w-4 ml-2" alt="Logo" /> */}
        <FaHouseChimney className="text-red-900  sm:text-2xl md:w-6 w-4 ml-2 " />
        <span className={!isExpanded ? "hidden" : "block"}>
          <span className="text-black text-md">Home</span>
          <span className="text-blue-600 text-md">Scape</span>
        </span>{" "}
      </div>

      <div className="flex flex-col space-y-8 mt-12">
        {navLinks.map((item, index) => (
          <div className="nav-links w-full" key={index}>
            <Link to={item.link} className="flex items-center gap-3">
              <div
                onClick={() => setActiveIndex(index)}
                className={
                  "flex space-x-3 w-full p-2 rounded " +
                  (activeIndex === index
                    ? "bg-[#FF8C8C] text-white"
                    : " text-black") +
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
      </div>
    </motion.div>
  );
}

export default SideBar;
