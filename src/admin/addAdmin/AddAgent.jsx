import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AgentModal from './AgentModal';
import AgentTable from './AgentTable';

const AddAgent = () => {
  const [showModal, setShowModal] = useState(false);
  const [editAgent, setEditAgent] = useState(null);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/agent/get');
      setAgents(response.data.data);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <button
        onClick={() => {
          setShowModal(true);
          setEditAgent(null); 
        }}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Add Agent
      </button>
      <AgentTable setEditAgent={setEditAgent} setShowModal={setShowModal} agents={agents} fetchAgents={fetchAgents} />
      {showModal && (
        <AgentModal
          showModal={showModal}
          setShowModal={setShowModal}
          editAgent={editAgent}
          setEditAgent={setEditAgent}
          fetchAgents={fetchAgents}
        />
      )}
    </div>
  );
};

export default AddAgent;
