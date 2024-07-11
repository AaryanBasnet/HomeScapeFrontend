import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BiBed, BiBath, BiArea } from "react-icons/bi";
import Navbar from "../website/NavBar";
import ContactAgent from "../website/ContactAgent";
import axios from 'axios';

const PropertyDetails = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8080/home/get/${id}`);
          setHouse(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching house details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHouseDetails();
  }, [id]);

  if (loading) {
    return (
      <section>
        <div className="container mx-auto min-h-[800px] flex justify-center items-center">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

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
      <div>
        <Navbar />
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{house.name}</h2>
            <p className="text-lg font-semibold text-gray-800">
              NRs. {house.price}
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
              src={`http://localhost:8080/home/image/${house.homeId}`}
              alt={house.name}
              className="rounded-lg w-full object-cover mb-4"
              onError={(e) => {
                console.error(`Error loading image for home ${house.homeId}`);
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
              }}
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
              <span>{house.surface} sq ft</span>
            </div>
          </div>
          <p className="text-gray-700 mb-6">{house.description}</p>
        </div>
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-lg">
          <div className="">
            <h1 className="text-xl font-semibold">{house.agent.name}</h1>
            <h1>Real estate agent</h1>
          </div>
          <div className="my-4">
            <ContactAgent homeId={house.homeId} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
