import React, { useState, useContext } from "react";
import { RiHomeLine, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Menu } from '@headlessui/react';
import { HouseContext } from "./HouseContext";

const PropertyDropdown = () => {
  const { property, setProperty, properties } = useContext(HouseContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          <div className="flex items-center">
            <RiHomeLine className="dropdown-icon-primary" />
            <span>{property}</span>
          </div>
          {isOpen ? <RiArrowUpSLine className="mt-1" /> : <RiArrowDownSLine className="mt-1" />}
        </Menu.Button>
      </div>

      <Menu.Items className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
        <div className="py-1">
          {properties.map((propertyItem) => (
            <Menu.Item key={propertyItem}>
              {({ active }) => (
                <button
                  onClick={() => {
                    setProperty(propertyItem);
                    setIsOpen(false);
                  }}
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } block px-4 py-2 text-sm w-full text-left`}
                >
                  {propertyItem}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default PropertyDropdown;
