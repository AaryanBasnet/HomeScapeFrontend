import React, { useContext } from 'react';
import { HouseContext } from './HouseContext';
import House from './House';
import { ImSpinner2 } from 'react-icons/im';
import { Link } from 'react-router-dom';

const HouseList = ({ limit }) => {
  const { houses, loading } = useContext(HouseContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ImSpinner2 className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  if (houses.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl text-red-500">No Houses Found</h1>
      </div>
    );
  }

  const displayedHouses = limit ? houses.slice(0, limit) : houses;

  return (
    <section className="mb-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {displayedHouses.map((house) => (
            <House key={house.homeId} house={house} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HouseList;
