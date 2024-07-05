import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';



const HomeList = () => {
  const [homes, setHomes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHome, setSelectedHome] = useState(null);

 
  useEffect(() => {
    fetchHomes();
  }, []);

  

  const fetchHomes = () => {
    axios.get('http://localhost:8080/api/home')
      .then(response => {
        setHomes(response.data);
      })
      .catch(error => {
        console.error('Error fetching homes:', error);
      });
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
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {homes.map(home => (
          <Card
            key={home.id}
            
          />
        ))}
      </div>
    </div>
  );
}

export default HomeList;
