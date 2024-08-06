import React, { useEffect, useState } from 'react';
import axios from 'axios';


import Sabin from '../assets/img/sabin.png';
import Krishna from '../assets/img/krishna.png';
import Saugat from '../assets/img/saugat.png';
import Akash from '../assets/img/akash.jpg';
import Aryan from '../assets/img/aaryan.jpeg';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/about');
        if (response.data && response.data.data && response.data.data.length > 0) {
          setAboutData(response.data.data[0]);
        } else {
          setError(new Error('No about data found'));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error) return <p className="text-center py-8 text-red-500">Error fetching data: {error.message}</p>;
  if (!aboutData) return <p className="text-center py-8">No about data available</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-6 text-center">About Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[Sabin, Krishna, Akash, Saugat].map((house, index) => (
          <div key={index} className="overflow-hidden w-[70%] rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <img src={house} alt={`House ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="mb-12 text-center">
        <p className="text-lg text-gray-700">{aboutData.ourVision}</p>
      </div>
      <h2 className="text-4xl font-bold mb-6 text-center">Our Mission</h2>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-6">
        <div className="mb-6 lg:mb-0 lg:w-1/2">
          <p className="text-lg text-gray-700">{aboutData.ourMission}</p>
        </div>
        <div className="overflow-hidden rounded-lg w-[70%] shadow-lg transform transition duration-500 hover:scale-105 lg:w-1/2">
          <img src={Aryan} alt="Mission Image" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default About;