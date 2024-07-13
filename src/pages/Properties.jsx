import React from 'react';
import HouseList from '../website/HouseList';
import Search from '../website/Search';


const Properties = () => {


  return (
    <>
    
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
    
    </>
  );
};

export default Properties;
