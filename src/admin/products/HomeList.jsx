 import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import AddModal from './AddModal';

const HomeList = () => {
  const [homes, setHomes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHome, setSelectedHome] = useState(null);

  useEffect(() => {
    fetchHomes();
  }, []);

  const fetchHomes = () => {
    axios.get('http://localhost:8080/home/get')
      .then(response => {
        setHomes(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching homes:', error);
      });
  };

  const handleEdit = (home) => {
    setSelectedHome(home);
    setIsModalOpen(true);
  };

  const handleDelete = (homeId) => {
    axios.delete(`http://localhost:8080/home/delete/${homeId}`)
      .then(response => {
        if (response.status === 200) {
          fetchHomes(); // Refresh the list after deletion
        }
        console.log('Home deleted successfully:', response);
      })
      .catch(error => {
        console.error('Error deleting home:', error);
      });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedHome(null);
    fetchHomes(); // Refresh the list after saving or updating
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center my-8">House List</h1>

      {isModalOpen && (
        <AddModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          selectedHome={selectedHome}
          fetchHomes={fetchHomes}
          onClose={handleModalClose}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {homes.map((home) => (
          <Card
            key={home.homeId}
            home={home}
            onEdit={() => handleEdit(home)}
            onDelete={() => handleDelete(home.homeId)}
          />
        ))}
      </div>
    </div>
  );
}

export default HomeList;

