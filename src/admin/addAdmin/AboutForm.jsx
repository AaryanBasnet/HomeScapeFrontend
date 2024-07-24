import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AboutForm = () => {
  const [about, setAbout] = useState({ ourMission: '', ourVision: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/about');
      if (response.data.data.length > 0) {
        setAbout(response.data.data[0]);
      }
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch About data');
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAbout({ ...about, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (about.aboutId) {
        await axios.put(`http://localhost:8080/api/about/${about.aboutId}`, about);
      } else {
        await axios.post('http://localhost:8080/api/about', about);
      }
      alert('About information saved successfully');
      fetchAbout();
    } catch (err) {
      setError('Failed to save About information');
    }
  };

  if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded">
        <h2 className="text-xl font-bold  text-center">About Us</h2>
      <div className="mb-6">
        <label htmlFor="ourMission" className="block text-gray-700 text-sm font-medium mb-2">Our Mission:</label>
        <textarea
          id="ourMission"
          name="ourMission"
          value={about.ourMission}
          onChange={handleInputChange}
          className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows="4"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="ourVision" className="block text-gray-700 text-sm font-medium mb-2">Our Vision:</label>
        <textarea
          id="ourVision"
          name="ourVision"
          value={about.ourVision}
          onChange={handleInputChange}
          className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows="4"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {about.aboutId ? 'Update' : 'Create'} About
        </button>
      </div>
    </form>
  );
};

export default AboutForm;
