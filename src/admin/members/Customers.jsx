import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Customers = () => {
  const [homeData, setHomeData] = useState({
    name: '',
    address: '',
    price: '',
    bathrooms: '',
    bedrooms: '',
    surface: '',
    city: '',
    description: '',
    type: '',
    agent: { agentId: '' }
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [homes, setHomes] = useState([]);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    async function fetchAgents() {
      try {
        const response = await axios.get('http://localhost:8080/agent/get');
        if (response.data.statusCode === 200) {
          setAgents(response.data.data);
        } else {
          throw new Error('Failed to fetch agents');
        }
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    }

    fetchAgents();
  }, []);

  useEffect(() => {
    fetchHomes();
  }, []);

  const fetchHomes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/home/get');
      setHomes(response.data.data);
    } catch (error) {
      console.error('Failed to fetch homes:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHomeData({ ...homeData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAgentSelect = (event) => {
    const agentId = event.target.value;
    setHomeData(prev => ({
      ...prev,
      agent: { agentId: agentId }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedHomeData = {
      ...homeData,
      price: Number(homeData.price),
      bathrooms: Number(homeData.bathrooms),
      bedrooms: Number(homeData.bedrooms),
      surface: Number(homeData.surface),
      agent: { agentId: Number(homeData.agent.agentId) }
    };

    const formData = new FormData();
    formData.append('home', new Blob([JSON.stringify(formattedHomeData)], { type: 'application/json' }));
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8080/home/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Home created successfully!');
      fetchHomes();
    } catch (error) {
      console.error('Error creating home:', error);
      setMessage('Failed to create home. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-5">Add New Home</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={homeData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={homeData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={homeData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              value={homeData.bathrooms}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              value={homeData.bedrooms}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Surface</label>
            <input
              type="number"
              name="surface"
              value={homeData.surface}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">City</label>
            <input
              type="text"
              name="city"
              value={homeData.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Type</label>
            <input
              type="text"
              name="type"
              value={homeData.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Agent</label>
            <select
              value={homeData.agent.agentId}
              onChange={handleAgentSelect}
              className="bg-blue-500 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            >
              <option value="">Select an agent</option>
              {agents.map(agent => (
                <option key={agent.agentId} value={agent.agentId}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 col-span-2">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={homeData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4 col-span-2">
            <label className="block text-gray-700 mb-2">Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Add Home
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default Customers;