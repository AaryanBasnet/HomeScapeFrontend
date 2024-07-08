import React from 'react';
import Navbar from '../website/NavBar'
import Footer from '../website/Footer';


import house1 from '../assets/img/houses/house1lg.png';
import house2 from '../assets/img/houses/house2lg.png';
import house3 from '../assets/img/houses/house3lg.png';
import house4 from '../assets/img/houses/house4lg.png';
import house5 from '../assets/img/houses/house5lg.png';
import house6 from '../assets/img/houses/house6lg.png';

const About = () => {
  return (
    <>
    <Navbar />

    <div className="container mx-auto px-4 py-8">

      <h2 className="text-4xl font-bold mb-6 text-center">About Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
          <img src={house1} alt="Person 1" className="w-full h-full object-cover" />
        </div>
        <div className="overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
          <img src={house2} alt="Person 2" className="w-full h-full object-cover" />
        </div>
        <div className="overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
          <img src={house3} alt="Person 3" className="w-full h-full object-cover" />
        </div>
        <div className="overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
          <img src={house4} alt="Person 4" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="mb-12 text-center">
        <p className="text-lg text-gray-700">
          We are a passionate team dedicated to innovation and excellence. Our journey began with a simple idea: to make a positive impact on the world through technology. Over the years, we've grown into a diverse group of professionals committed to delivering high-quality solutions that meet our clients' needs. We believe in the power of creativity, hard work, and collaboration, and we strive to push the boundaries of what's possible.
        </p>
      </div>
      <h2 className="text-4xl font-bold mb-6 text-center">Our Mission</h2>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-6">
        <div className="mb-6 lg:mb-0 lg:w-1/2">
          <p className="text-lg text-gray-700">
            Our mission is to empower businesses and individuals with cutting-edge technology solutions that drive growth and innovation. We are committed to fostering a culture of continuous improvement, where creativity and excellence thrive. By staying at the forefront of industry trends and embracing new challenges, we aim to deliver exceptional value and make a lasting impact on the communities we serve.
          </p>
        </div>
        <div className="overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105 lg:w-1/2">
          <img src={house5} alt="Mission Image" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
    <div className=''>
        <Footer />
      </div>
    </>
  );
};

export default About;
