import React, { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import Backdrop from "../Backdrop";
import { ModalContext } from "../../utils/ModalContext";
import LoginImage from "../../assets/images/LoginImage.png";
import Password from "../../assets/images/Password.png";
import UserName from "../../assets/images/UserName.png";
import cross from "../../assets/images/cross.png";
import Register from "./Register";
import { useFormik } from "formik";
import errorImg from "../../assets/images/errorImg.png"
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

const Modal = () => {
  const { setIsModalOpen } = useContext(ModalContext);
  const [isRegister,setIsRegister] = useState(false)

  const handleClose = () => {
    setIsModalOpen(false);
  };
  const toggleRegister = () => {
    setIsRegister((prev) => !prev);
  };

  const formState = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: values=>{
        console.log(values)
    },
    validate: values=>{
      let error = {}
      if(!values.username){
        error.username = <img className="lg:w-[50%] vsm:w-[100%] smd:w-[70%] bg-fit bg-center" src ={errorImg} alt="Error message"/>
      }
      if(!values.password){
        error.password =<img className="lg:w-[50%] vsm:w-[100%] smd:w-[70%] bg-fit bg-center" src ={errorImg} alt="Error message"/>
      }
      return error;
    }
  });

  return createPortal(
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="max-w-[90%] max-h-[85%] md:h-[70%] md:w-[95%] ssmd:max-h-[90%] lg:h-[80%] lg:w-[90%] xl:w-[80%] m-auto py-2rem rounded-xl flex flex-col items-center z-[100] bg-white absolute"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {isRegister ? (
          <Register toggleRegister={toggleRegister} />
        ):(
        <div className="flex flex-col gap-3 md:flex-row-reverse md:items-center my-auto md:w-[100%] md:p-[6px] md:justify-between mmd:justify-center lg:gap-4 llg:gap-20">
          <div className="w-[100%] max-w-[310px] smd:max-w-[335px] ssmd:max-w-[355px] md:w-[55%] lg:w-[65%] lg:max-w-[450px] xl:max-w-[515px]">
          <img
            className="bg-center bg-cover"
            src={LoginImage}
            alt="Login Image"
          />
          </div>
          <form className="w-[100%] text-center flex flex-col gap-3 md:w-[45%] md:gap-8 lg:max-w-[400px] llg:max-w-[450px]" onSubmit={formState.handleSubmit}>
            <label className="text-xl font-Montserrat font-medium md:w-[75%] md:mx-auto md:text-start">
              Welcome Back,
            </label>
            <div className="flex flex-col gap-3 w-[80%] mx-auto md:gap-6" >
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
                  placeholder="Username"
                  id="username"
                  name="username"
                  onChange={formState.handleChange}
                  value={formState.values.name}
                />
              {formState.errors.username?<div className="error width-[25px] flex items-center justify-center">{formState.errors.username}</div>:null} 
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
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  onChange={formState.handleChange}
                  value={formState.values.name}
                />
               {formState.errors.password?<div className="error width-[25px] flex items-center justify-center">{formState.errors.password}</div>:null} 
              </div>
              <div className="flex flex-col gap-2 md:gap-4">
              <label className="text-right font-Montserrat text-blue">Forgot Password?</label>
              <button type="submit" className="w-[50%] mx-auto px-[25px] py-[6.5px] text-xl font-display bg-orange-project text-white rounded-2xl tracking-wider">Login</button>
              <div className="flex mb-2 pt-2 gap-2 mx-auto">
              <h5>Don’t have a account?</h5>
              <button className=" text-orange-project" onClick={toggleRegister}>Sign up</button>
              </div>
          </div>
            </div>
          </form>
        </div>
        )}
        <img  className="absolute left-[89%] h-[30px] md:left-[95%] cursor-pointer" src={cross} alt="Cross Image" onClick={handleClose}/>
      </motion.div>
    </Backdrop>,
    document.body
  );
};

export default Modal;
