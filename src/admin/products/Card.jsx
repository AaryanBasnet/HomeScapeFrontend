import React from "react";
import { PiBathtubBold } from "react-icons/pi";
import { IoBed } from "react-icons/io5";
import { BiArea } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";

function Card({ home, onEdit, onDelete }) {
  

  return (
    <div className="m-4 flex justify-center items-center">
      <div className="card card-compact border rounded-md w-64 bg-base-100 shadow-xl">
        <figure>
        {home.imageData && (
                <img
                  src={`http://localhost:8080/home/image/${home.homeId}`}
                  alt={home.name}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                  onError={(e) => {
                    console.error(`Error loading image for home ${home.homeId}`);
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                  }}
                />
              )}
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
              <span className="text-sm font-dosis ml-1">{home.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <PiBathtubBold className="text-black" />
              <span className="text-sm font-dosis ml-1">{home.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <BiArea className="text-black" />
              <span className="text-sm font-dosis ml-1">{home.surface} sq ft</span>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={onEdit}
              className="text-blue-500 hover:text-blue-700 mr-2"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
