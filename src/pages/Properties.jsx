import React from 'react';
import HouseList from '../website/HouseList';
import HomeList from '../website/HomeList';
import Search from '../website/Search';
import Navbar from '../website/NavBar'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Footer from '../website/Footer';


const Properties = () => {
  // const [homes, setHomes] = useState([]);
  // useEffect(() => {
  //   fetchHomes();
  // }, []);

  // const fetchHomes = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8080/api/home');
  //     setHomes(response.data);
  //   } catch (error) {
  //     console.error('Error fetching homes:', error);
  //   }
  // };

  return (
    <>
    <Navbar />
    <section className="py-8">
        
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Our Properties</h1>
          <p className="text-lg text-gray-700 mb-6 text-center">
            Browse our collection of available properties. Find your perfect home from our range of listings.
          </p>
        </div>
        <div className="mb-8">
          <Search />
        </div>
        <div className='m-20'>
        <HouseList />
        </div>
        
      </div>
    </section>
    <div className=''>
        <Footer />
      </div>
    </>
  );
};

export default Properties;
