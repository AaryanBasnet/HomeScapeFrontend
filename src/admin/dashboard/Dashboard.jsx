import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
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
    agentId: ''
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [homes, setHomes] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('home', new Blob([JSON.stringify(homeData)], { type: 'application/json' }));
    formData.append('image', image);

    try {
      await axios.post('http://localhost:8080/home/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Home created successfully!');
      fetchHomes();
    } catch (error) {
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
            <label className="block text-gray-700 mb-2">Agent ID</label>
            <input
              type="text"
              name="agentId"
              value={homeData.agentId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
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

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-5">All Homes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {homes.map((home) => (
            <div key={home.homeId} className="border border-gray-300 p-4 rounded-lg">
              <h3 className="text-xl font-bold mb-2">{home.name}</h3>
              <p className="mb-2">{home.address}</p>
              <p className="mb-2">Price: ${home.price}</p>
              <p className="mb-2">Bedrooms: {home.bedrooms}</p>
              <p className="mb-2">Bathrooms: {home.bathrooms}</p>
              <p className="mb-2">Surface: {home.surface} sq ft</p>
              <p className="mb-2">City: {home.city}</p>
              <p className="mb-4">{home.description}</p>
              {home.imageData && (
                <img
                  src={`http://localhost:8080/home/image/${home.homeId}`}
                  alt={home.name}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                  onError={(e) => {
                    console.error(`Error loading image for home ${home.homeId}`);
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                  }}
                />
              )}
              <p className="text-sm text-gray-500">Agent ID: {home.agent ? home.agent.id : 'N/A'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;