import React from "react";
import { PiBathtubBold } from "react-icons/pi";
import { IoBed } from "react-icons/io5";
import { BiArea } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";

function Card({ home}) {
  

  return (
    <div className="m-4 flex justify-center items-center">
      <div className="card card-compact border rounded-md w-64 bg-base-100 shadow-xl">
        <figure>
          <img
            className="rounded-t-md w-full h-40 object-cover"
            // src={home.imageUrl}
            // alt={home.name}
          />
        </figure>
        <div className="card-body p-4">
          <div className="flex justify-between items-center">
            <h2 className="card-title font-dosis font-medium text-lg text-orange-500">
              NRs.{home.price}
            </h2>
            <motion.button
              whileHover={{
                scale: 1.2,
              }}
            >
              <FaRegHeart className="text-red-500" />
            </motion.button>
          </div>
          <h3 className="font-dosis font-bold mt-1">{home.name}</h3>
          <p className="text-sm font-dosis font-light mt-1">{home.address}</p>
          <div className="flex justify-between mt-2">
            <div className="flex items-center">
              <IoBed className="text-black" />
              <span className="text-sm font-dosis ml-1">{home.bedNo}</span>
            </div>
            <div className="flex items-center">
              <PiBathtubBold className="text-black" />
              <span className="text-sm font-dosis ml-1">{home.bathNo}</span>
            </div>
            <div className="flex items-center">
              <BiArea className="text-black" />
              <span className="text-sm font-dosis ml-1">{home.area} sq ft</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Card;
