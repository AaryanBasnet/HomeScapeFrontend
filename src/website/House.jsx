import React from 'react';
import {  BiArea } from 'react-icons/bi';
import { PiBathtubBold } from "react-icons/pi";
import { IoBed } from "react-icons/io5";
import { Link } from 'react-router-dom';

const House = ({ house }) => {
  const { homeId, name, type, city, address, price, bedrooms, bathrooms, surface, imageData } = house;

  return (
    <div className='bg-slate-50 max-w-[352px] mx-auto font-dosis card card-compact border rounded-md w-64 bg-base-100 shadow-xl hover:shadow-2xl transition'>
      <Link to={`/property/${homeId}`} className='block'>
        <figure>
          {imageData && (
            <img
              src={`http://localhost:8080/home/image/${homeId}`}
              alt={name}
              className="w-full h-48 object-cover mb-4 rounded-md"
              onError={(e) => {
                console.error(`Error loading image for home ${homeId}`);
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
              }}
            />
          )}
        </figure>
        
        <div className="card-body p-4">
          <div className="flex justify-between items-center">
            <h2 className="card-title font-dosis font-medium text-lg text-orange-500">
              NRs.{price}
            </h2>
            <div className='flex flex-col gap-y-2 text-sm'>
              <div className='bg-green-500 rounded-full text-white px-3'>{type}</div>
              <div className='bg-violet-500 rounded-full text-white px-3'>{city}</div>
            </div>
          </div>
          <h3 className="font-dosis font-bold mt-1">{name}</h3>
          <p className="text-sm font-dosis font-light mt-1">{address}</p>
          <div className="flex justify-between mt-2">
            <div className="flex items-center">
              <IoBed className="text-black" />
              <span className="text-sm font-dosis ml-1">{bedrooms}</span>
            </div>
            <div className="flex items-center">
              <PiBathtubBold className="text-black" />
              <span className="text-sm font-dosis ml-1">{bathrooms}</span>
            </div>
            <div className="flex items-center">
              <BiArea className="text-black" />
              <span className="text-sm font-dosis ml-1">{surface} sq ft</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default House;
