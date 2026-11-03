import React, { useState, useEffect, createContext } from "react";
import axios from 'axios';
import { API_BASE_URL } from '../config';

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState([]);
  const [city, setCity] = useState('Location (any)');
  const [cities, setCities] = useState([]);
  const [property, setProperty] = useState('Property type (any)');
  const [properties, setProperties] = useState([]);
  const [priceRange, setPriceRange] = useState('Price range (any)');
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
      const response = await axios.get(`${API_BASE_URL}/home/get`);
      setHouses(response.data.data);
    } catch (error) {
      console.error('Error fetching homes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/home/cities`);
      const cities = ['Location (any)', ...response.data.data];
      setCities(cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/home/properties`);
      const properties = ['Property type (any)', ...response.data.data];
      setProperties(properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleClick = async () => {
    setLoading(true);
  
    try {
      const params = {};
  
      if (city !== 'Location (any)') {
        params.city = city;
      }
  
      if (property !== 'Property type (any)') {
        params.propertyType = property;
      }
  
      if (!isDefault(priceRange)) {
        const [minStr, maxStr] = priceRange.split('-').map(str => str.trim());
  
        if (minStr) {
          const min = parseInt(minStr.replace(/\D/g, ''));
          if (!isNaN(min)) {
            params.minPrice = min;
          }
        }
  
        if (maxStr) {
          const max = parseInt(maxStr.replace(/\D/g, ''));
          if (!isNaN(max)) {
            params.maxPrice = max;
          }
        }
      }
  
      console.log('Filtering with params:', params);
  
      const response = await axios.get(`${API_BASE_URL}/home/filter`, {
        params: params
      });
      setHouses(response.data.data);
    } catch (error) {
      console.error('Error filtering homes:', error);
    } finally {
      setLoading(false);
    }
  };
  const isDefault = (str) => {
    return str.toLowerCase().includes('any');
  };

  return (
    <HouseContext.Provider
      value={{
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
        isModalOpen,
        setIsModalOpen,
        handleClick,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
