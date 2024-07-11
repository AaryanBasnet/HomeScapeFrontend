import React, { useState, useEffect, createContext } from "react";
import axios from 'axios';

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState([]);
  const [city, setCity] = useState('Location (any)');
  const [cities, setCities] = useState([]);
  const [property, setProperty] = useState('Property type (any)');
  const [properties, setProperties] = useState([]);
  const [priceRange, setPriceRange] = useState('price range (any)');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchHouses();
    fetchCities();
    fetchProperties();
  }, []);

  const fetchHouses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/home/get');
      setHouses(response.data.data);
    } catch (error) {
      console.error('Error fetching homes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get('http://localhost:8080/home/cities');
      const cities = ['Location (any)', ...response.data.data];
      setCities(cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:8080/home/properties');
      const properties = ['Property type (any)', ...response.data.data];
      setProperties(properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleClick = async () => {
    setLoading(true);

    const isDefault = (str) => {
      return str.toLowerCase().includes('any');
    };

    const minPrice = isDefault(priceRange) ? 0 : parseInt(priceRange.split(' ')[0]);
    const maxPrice = isDefault(priceRange) ? Infinity : parseInt(priceRange.split(' ')[2]);

    try {
      const response = await axios.get('http://localhost:8080/home/filter', {
        params: {
          city: city === 'Location (any)' ? '' : city,
          propertyType: property === 'Property type (any)' ? '' : property,
          minPrice,
          maxPrice,
        }
      });
      setHouses(response.data.data);
    } catch (error) {
      console.error('Error filtering homes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HouseContext.Provider value={{
      houses,
      city,
      setCity,
      cities,
      property,
      setProperty,
      properties,
      priceRange,
      setPriceRange,
      loading,
      handleClick,
      isModalOpen,
      setIsModalOpen,
    }}>
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
