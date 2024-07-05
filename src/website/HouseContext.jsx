import React, { useState, useEffect, createContext } from "react";
import { housesData } from "../data";

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [city, setCity] = useState('Location (any)');
  const [cities, setCities] = useState([]);
  const [property, setProperty] = useState('Property type (any)');
  const [properties, setProperties] = useState([]);
  const [priceRange, setPriceRange] = useState('price range (any)');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const cities = ['Location (any)', ...new Set(housesData.map((house) => house.city))];
    setCities(cities);

    const properties = ['Property type (any)', ...new Set(housesData.map((house) => house.type))];
    setProperties(properties);
  }, []);

  const handleClick = () => {
    setLoading(true);

    const isDefault = (str) => {
      return str.toLowerCase().includes('any');
    };

    const minPrice = isDefault(priceRange) ? 0 : parseInt(priceRange.split(' ')[0]);
    const maxPrice = isDefault(priceRange) ? Infinity : parseInt(priceRange.split(' ')[2]);

    const filteredHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);
      const matchesCity = house.city === city || isDefault(city);
      const matchesProperty = house.type === property || isDefault(property);
      const matchesPrice = housePrice >= minPrice && housePrice <= maxPrice;

      return matchesCity && matchesProperty && matchesPrice;
    });

    
    

    setTimeout(() => {
      return filteredHouses.length < 1 ? setHouses([]) : setHouses(filteredHouses),
      setLoading(false);
      
    }, 1000);
  };

  return (
    <HouseContext.Provider value={{
      houses, // Include houses data in the context provider value
      city,
      setCity,
      cities,
      setCities,
      property,
      setProperty,
      properties,
      setProperties,
      priceRange,
      setPriceRange,
      loading,
      setLoading,
      handleClick,
      isModalOpen,
      setIsModalOpen,
    }}>
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
