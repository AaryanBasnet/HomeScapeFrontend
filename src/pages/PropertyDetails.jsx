import React from "react";
import { housesData } from "../data";
import { useParams } from "react-router-dom";
import { BiBed, BiBath, BiArea } from "react-icons/bi";
import Navbar from "../website/NavBar";

const PropertyDetails = () => {
  const { id } = useParams();

  const house = housesData.find((house) => house.id === parseInt(id));

  console.log(house);

  if (!house) {
    return (
      <section>
        <div className="container mx-auto min-h-[800px] flex justify-center items-center">
          <p>House not found</p>
        </div>
      </section>
    );
  }

  return (
    <section className="">
      <div 
      >
        <Navbar />
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{house.name}</h2>
            <p className="text-lg font-semibold text-gray-800">
              ${house.price}
            </p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-600">{house.address}</p>
            <div className="mb-4 flex gap-x-2 text-sm">
              <div className="bg-green-500 rounded-full text-white px-3">
                {house.type}
              </div>
              <div className="bg-violet-500 rounded-full text-white px-3">
                {house.city}
              </div>
            </div>
          </div>
          <div className="w-full ">
            <img
              src={house.imageLg}
              alt={house.name}
              className="rounded-lg w-full object-cover mb-4"
            />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <BiBed className="text-gray-600" />
              <span>{house.bedrooms}</span>
            </div>
            <div className="flex items-center gap-2">
              <BiBath className="text-gray-600" />
              <span>{house.bathrooms}</span>
            </div>
            <div className="flex items-center gap-2">
              <BiArea className="text-gray-600" />
              <span>{house.surface} </span>
            </div>
          </div>
          <p className="text-gray-700 mb-6">{house.description}</p>
        </div>
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={house.agent.image}
              alt={house.agent.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                {house.agent.name}
              </h3>
              <p className="text-sm text-gray-600">Real Estate Agent</p>
            </div>
          </div>
          <p className="text-gray-700 mb-6">{house.agent.description}</p>
          <div className="flex flex-col gap-4 mb-6">
            <input
              type="text"
              placeholder="Name"
              className="border rounded-lg px-4 py-2"
            />
            <input
              type="email"
              placeholder="Email"
              className="border rounded-lg px-4 py-2"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="border rounded-lg px-4 py-2"
            />
                      <textarea placeholder="Your Message" className="border rounded-lg px-4 py-2 w-full" rows="4"></textarea>


            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Contact Agent
            </button>
            <button className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">
              Schedule a Visit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
