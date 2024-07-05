import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import backgroundImage from "../assets/img/houses/Object.png";
import NavBar from './NavBar';
import Search from './Search';

const actions = ["Find", "Buy", ];

function LandingPage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((state) => {
        if (state >= actions.length - 1) return 0;
        return state + 1;
      });
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <div
        className="relative bg-cover bg-center h-screen sm:bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <NavBar />
        <div className="flex flex-col justify-center md:justify-start h-full items-center md:items-start px-5 md:px-10 vsm:py-20 sm:py-24">
          <h1 className="text-3xl vsm:text-4xl sm:text-4xl md:text-4xl pt-10 lg:text-6xl  font-dosis text-white text-center md:text-left">
            <div className="flex">
            <AnimatePresence initial={false}>
              <motion.span
                key={actions[index]}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ ease: "easeInOut" }}
                style={{ position: "absolute",color:"#0041c2" }}
                
              >
                {actions[index]}
              </motion.span>
            </AnimatePresence>
            <motion.span
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ease: "easeInOut" }}
              style={{ position: "relative", display: "inline-block" }}
            >
              </motion.span>
              
              
            </div>
            <span className="pl-16 sm:-ml md:pl-25 lg:pl-28">a House,</span>
            <br />
            Make a Home
          </h1>
        </div>
      </div>
      <div className="bg-white">
        <Search />
      </div>
    </div>
  );
}

export default LandingPage;
