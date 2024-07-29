import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AgentTable = ({ setEditAgent, setShowModal }) => {
  const [agents, setAgents] = useState([]);

  const fetchAgents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/agent/get');
      setAgents(response.data.data);
    } catch (error) {
      console.error('Error fetching agents:', error);
      toast.error('Failed to fetch agents. Please try again.');
    }
  };

  const handleDelete = async (agentId) => {
    if (!agentId) {
      toast.error('Agent ID is undefined. Unable to delete.');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/agent/delete/${agentId}`);
      toast.success('Agent deleted successfully!');
      fetchAgents(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting agent:', error);
      toast.error('Failed to delete agent. Please try again.');
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-5">Agents</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Phone</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent.agentId}>
              <td className="border px-4 py-2">{agent.name}</td>
              <td className="border px-4 py-2">{agent.phone}</td>
              
              <td className="border px-4 py-2">
                <button
                  onClick={() => {
                    setEditAgent(agent);
                    setShowModal(true);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(agent.agentId)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentTable;
