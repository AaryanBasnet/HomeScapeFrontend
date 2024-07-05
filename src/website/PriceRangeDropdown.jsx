import React, { useState, useContext } from "react";
import { RiMoneyDollarCircleLine, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Menu } from '@headlessui/react';
import { HouseContext } from "./HouseContext";

const PriceRangeDropdown = () => {
  const { priceRange, setPriceRange } = useContext(HouseContext);
  const [isOpen, setIsOpen] = useState(false);

  const priceRanges = [
    'Price Range (any)',
    '100000 - 200000',
    '200000 - 300000',
    '300000 - 400000',
    '400000 - 500000',
    '500000+',
  ];

  return (
    <Menu as="div" className="relative inline-block text-left  ">
      <div>
        <Menu.Button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-5 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <RiMoneyDollarCircleLine className="dropdown-icon-primary" />
            <span>{priceRange}</span>
          </div>
          {isOpen ? <RiArrowUpSLine className="mt-1" /> : <RiArrowDownSLine className="mt-1" />}
        </Menu.Button>
      </div>

      <Menu.Items className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
        <div className="py-1">
          {priceRanges.map((range) => (
            <Menu.Item key={range}>
              {({ active }) => (
                <button
                  onClick={() => {
                    setPriceRange(range);
                    setIsOpen(false);
                  }}
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } block px-4 py-2 text-sm w-full text-left`}
                >
                  {range}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default PriceRangeDropdown;
