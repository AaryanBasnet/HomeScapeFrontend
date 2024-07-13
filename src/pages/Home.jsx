import React from 'react';
import { Link } from 'react-router-dom';
import HouseList from '../website/HouseList';
import LandingPage from '../website/LandingPage';
import Footer from '../website/Footer';

const Home = () => {
  return (
    <>
    <div className="">
      <LandingPage />
      <div className="container mx-auto py-8">
        <HouseList limit={8} />
        <div className="flex justify-center mt-8">
          <Link to="/properties" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Show More
          </Link>
        </div>
      </div>
      
    </div>
    <Footer />
    </>
  );
};

export default Home;
