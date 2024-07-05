import React, { useState, useContext } from "react";
import { RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Menu } from '@headlessui/react';
import { HouseContext } from "./HouseContext";

const CityDropdown = () => {
  const { city, setCity, cities } = useContext(HouseContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu as="div" className="relative inline-block text-left  ">
      <div>
        <Menu.Button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-7 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <RiMapPinLine className="dropdown-icon-primary " />
            <span>{city}</span>
          </div>
          {isOpen ? <RiArrowUpSLine className="mt-1"/> : <RiArrowDownSLine className="mt-1" />}
        </Menu.Button>
      </div>

      <Menu.Items className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
        <div className="py-1">
          {cities.map((city) => (
            <Menu.Item key={city}>
              {({ active }) => (
                <button
                  onClick={() => {
                    setCity(city);
                    setIsOpen(false);
                  }}
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } block px-4 py-2 text-sm w-full text-left`}
                >
                  {city}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default CityDropdown;
