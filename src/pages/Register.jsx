import { useContext, useState } from "react"
import { HouseContext } from "../website/HouseContext"
import { createPortal } from "react-dom";
import Backdrop from "../website/Backdrop";
import {motion} from "framer-motion"
import LoginImage from "../assets/img/LoginImage.png"
import Password from "../assets/img/Password.png"
import UserName from "../assets/img/UserName.png"
import cross from "../assets/img/cross.png"
import contact from "../assets/img/contact.png"
import pan from "../assets/img/pan.png"
import date from "../assets/img/date.png"
// import Modal from ".";
const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
      
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };
  
const Register=({toggleRegister})=>{
    const {setIsModalOpen}= useContext(HouseContext)
    const handleSubmit =()=>{
        setIsModalOpen(false)
    }
    return createPortal(
        <Backdrop onClick={handleSubmit}>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="max-w-[90%] max-h-[90%] smd:max-h-[95%] md:h-[70%] md:w-[95%] lg:h-[80%] lg:w-[90%] xl:w-[80%] m-auto py-2rem rounded-xl flex flex-col items-center z-[100] bg-white absolute"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex flex-col gap-3 md:gap-0 md:flex-row-reverse md:items-center my-auto md:w-[100%] md:p-[6px] md:justify-center mmd:justify-center lg:gap-4 llg:gap-20">
            <div className="w-[100%] max-w-[310px] smd:max-w-[335px] ssmd:max-w-[355px] md:w-[60%] mmd:max-w-[370px] lg:w-[65%] lg:max-w-[450px] xl:max-w-[515px] flex justify-center">
            <img
              className="bg-center bg-cover w-[100%]"
              src={LoginImage}
              alt="Login Image"
            />
            </div>
            <form className="w-[100%] md:h-[100%] md:justify-end xl:justify-center text-center flex flex-col gap-3 md:w-[45%] md:gap-8 lg:max-w-[400px] llg:max-w-[450px]">
              <div className="flex flex-col md:gap-[6px] gap-3 lg:gap-4 w-[80%] mx-auto" >
                <div className="flex justify-center gap-3 rounded-3xl w-[100%] mx-auto p-[6px] bg-inputColor">
                  <div className="flex items-center">
                    <img
                      className="w-[100%] h-[20px]"
                      src={UserName}
                      alt="UserName Image"
                    />
                  </div>
                  <input
                    className="outline-none p-1 bg-inputColor"
                    type="text"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="flex justify-center gap-3 rounded-3xl w-[100%] mx-auto p-[6px] bg-inputColor">
                  <div className="flex items-center">
                    <img
                      className="w-[100%] h-[20px]"
                      src={Password}
                      alt="Password Image"
                    />
                  </div>
                  <input
                    className="outline-none p-1 bg-inputColor"
                    type="text"
                    placeholder="Restaurant Name"
                    required
                  />
                </div>
                <div className="flex justify-center gap-3 rounded-3xl w-[100%] mx-auto p-[6px] bg-inputColor">
                  <div className="flex items-center">
                    <img
                      className="w-[100%] h-[20px]"
                      src={pan}
                      alt="PanNo. Image"
                    />
                  </div>
                  <input
                    className="outline-none p-1 bg-inputColor"
                    type="text"
                    placeholder="Restaurant Pan No."
                    required
                  />
                </div>
                <div className="flex justify-center gap-3 rounded-3xl w-[100%] mx-auto p-[6px] bg-inputColor">
                  <div className="flex items-center">
                    <img
                      className="w-[100%] h-[20px]"
                      src={date}
                      alt="Established Date Image"
                    />
                  </div>
                  <input
                    className="outline-none p-1 bg-inputColor"
                    type="text"
                    placeholder="Established Date"
                    required
                  />
                </div>
                <div className="flex justify-center gap-3 rounded-3xl w-[100%] mx-auto p-[6px] bg-inputColor">
                  <div className="flex items-center">
                    <img
                      className="w-[100%] h-[20px]"
                      src={contact}
                      alt="Contact Image"
                    />
                  </div>
                  <input
                    className="outline-none p-1 bg-inputColor"
                    type="text"
                    placeholder="Phone no."
                    required
                  />
                </div>
                <div className="flex md:gap-4 mb-2 lg:mb-0 w-[100%] justify-around">
                <button className=" text-orange-project" onClick={toggleRegister}>{`< Back`}</button>
                <div className="flex"><button className="w-[85%] mx-auto pl-[15px] pr-[28px] py-[6.5px] text-xl font-display bg-orange-project text-white rounded-2xl tracking-wider">Register</button></div>
            </div>
              </div>
            </form>
          </div>
          <img  className="absolute left-[89%] h-[30px] md:left-[95%] cursor-pointer" src={cross} alt="Cross Image" onClick={handleSubmit}/>
        </motion.div>
      </Backdrop>,
      document.body
    );
}
export default Register