import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AgentModal = ({ editAgent, setEditAgent, fetchAgents, setShowModal }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (editAgent) {
      setName(editAgent.name);
      setPhone(editAgent.phone);
      setImage(editAgent.image);
    }
  }, [editAgent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const agentData = { name, phone, image };
    const url = editAgent ? `http://localhost:8080/agent/update/${editAgent.agentId}` : 'http://localhost:8080/agent/save';

    try {
      const response = await axios.post(url, agentData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201 || response.status === 200) {
        toast.success(`Agent ${editAgent ? 'updated' : 'added'} successfully!`);
        setEditAgent(null);
        setName('');
        setPhone('');
        setImage('');
        setShowModal(false);
        fetchAgents();
      } else {
        toast.error(`Failed to ${editAgent ? 'update' : 'add'} agent. Please try again.`);
      }
    } catch (error) {
      console.error(`Error ${editAgent ? 'updating' : 'adding'} agent:`, error);
      toast.error(`Failed to ${editAgent ? 'update' : 'add'} agent. Please try again.`);
    }
  };

  const handleCancel = () => {
    setEditAgent(null);
    setName('');
    setPhone('');
    setImage('');
    setShowModal(false);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <h2 className="text-2xl font-bold mb-5">{editAgent ? 'Edit Agent' : 'Add Agent'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL:</label>
              <input
                type="text"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {editAgent ? 'Update' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgentModal;
