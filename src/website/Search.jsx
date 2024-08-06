import React from 'react';
import { useContext } from 'react';
import CityDropdown from './CityDropdown';
import PriceRangeDropdown from './PriceRangeDropdown';
import PropertyDropdown from './PropertyDropdown';
import { RiSearch2Line } from 'react-icons/ri';
import { HouseContext } from './HouseContext';

const Search = () => {
  const { handleClick } = useContext(HouseContext);

  return (
    <div className='px-[30px] py-6 max-w-[1170px] mx-auto flex flex-col justify-between
     lg:flex-row  items-center gap-4 lg:gap-x-3 relative lg:-top-9 lg:shadow-lg
      bg-white lg:background-blur-sm rounded-lg'>
      
        <CityDropdown />
        <PropertyDropdown />
        <PriceRangeDropdown />
      
      <button 
      onClick={handleClick}
      className='flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-4 lg:mt-0 lg:self-start '>
        <RiSearch2Line className='text-2xl' />
        <span className='ml-2 hidden lg:inline-block'>Search</span>
      </button>
    </div>
  );
};

export default Search;
