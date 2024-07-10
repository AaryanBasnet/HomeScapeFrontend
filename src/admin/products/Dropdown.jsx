import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dropdown({ onSelect, selectedOption }) {
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

  const handleSelectChange = (event) => {
    const selectedAgentId = parseInt(event.target.value);
    const selectedAgentObj = agents.find(agent => agent.agentId === selectedAgentId);
    onSelect(selectedAgentObj); // Pass selected agent object to parent component
  };

  return (
    <div className="relative inline-block text-left">
      <label htmlFor="agentDropdown" className="block">Agent</label>
      <select
        id="agentDropdown"
        value={selectedOption ? selectedOption.agentId : ''}
        onChange={handleSelectChange}
        className="bg-blue-500 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option value="" disabled hidden>Select an agent</option>
        {agents.map(agent => (
          <option key={agent.agentId} value={agent.agentId}>
            {agent.name}
          </option>
        ))}
      </select>
    </div>
  );
}
