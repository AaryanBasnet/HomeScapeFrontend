import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddModal from './AddModal';
import HomeList from './HomeList';

function Products() {
  const [homes, setHomes] = useState([]);
  const [selectedHome, setSelectedHome] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHomes();
  }, []);

  const fetchHomes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/home/get');
      setHomes(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching homes:', error);
      setError('Failed to fetch homes. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (newHome) => {
    try {
      const response = await axios.post('http://localhost:8080/home/save', newHome);
      setHomes((prevHomes) => [...prevHomes, response.data]);
      setIsAdding(false); // Close AddModal after adding a new home
    } catch (error) {
      console.error('Error adding home:', error);
      // Handle error adding home
    }
  };

  const handleEdit = (home) => {
    setSelectedHome(home);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/home/delete/${id}`);
      setHomes((prevHomes) => prevHomes.filter((home) => home.id !== id));
      // No need to call fetchHomes() again since setHomes already updates the list
    } catch (error) {
      console.error('Error deleting home:', error);
      // Handle error deleting home
    }
  };

  const openAddModal = () => {
    setSelectedHome(null); // Ensure selectedHome is reset when opening the modal for adding
    setIsAdding(true);
  };

  const closeModal = () => {
    setSelectedHome(null);
    setIsEditing(false);
    setIsAdding(false);
  };

  return (
    <div className="p-6 bg-gray-100">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Products</h1>
      </div>
      <div className="mb-6">
        <button
          onClick={openAddModal}
          className="block text-white border-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Add New Home
        </button>
        <AddModal isOpen={isAdding || isEditing} setIsOpen={closeModal} selectedHome={selectedHome} fetchHomes={fetchHomes} />
      </div>
      {isLoading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <HomeList homes={homes} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default Products;
