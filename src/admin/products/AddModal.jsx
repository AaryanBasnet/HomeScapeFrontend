import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddModal = ({ isOpen, setIsOpen, selectedHome, fetchHomes }) => {
  const [homeData, setHomeData] = useState({
    name: "",
    address: "",
    price: "",
    bathrooms: "",
    bedrooms: "",
    surface: "",
    city: "",
    description: "",
    type: "",
    agent: { agentId: "" },
  });
  const [image, setImage] = useState(null);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    if (selectedHome) {
      setHomeData(selectedHome);
    }
  }, [selectedHome]);

  useEffect(() => {
    async function fetchAgents() {
      try {
        const response = await axios.get("http://localhost:8080/agent/get");
        if (response.data.statusCode === 200) {
          setAgents(response.data.data);
        } else {
          throw new Error("Failed to fetch agents");
        }
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    }

    fetchAgents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHomeData({ ...homeData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAgentSelect = (event) => {
    const agentId = event.target.value;
    setHomeData((prev) => ({
      ...prev,
      agent: { agentId: agentId },
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
      agent: { agentId: Number(homeData.agent.agentId) },
    };
  
    const formData = new FormData();
    formData.append(
      "home",
      new Blob([JSON.stringify(formattedHomeData)], {
        type: "application/json",
      })
    );
    formData.append("image", image);
  
    try {
      let response;
      if (selectedHome) {
        response = await axios.put(
          `http://localhost:8080/home/update/${selectedHome.homeId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Home updated successfully");
      } else {
        response = await axios.post(
          "http://localhost:8080/home/save",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Home added successfully");
      }
      console.log("Response:", response.data);
  
      // Reset form fields
      setHomeData({
        name: "",
        address: "",
        price: "",
        bathrooms: "",
        bedrooms: "",
        surface: "",
        city: "",
        description: "",
        type: "",
        agent: { agentId: "" },
      });
      setImage(null);
  
      closeModal();
      fetchHomes();
    } catch (error) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
        toast.error("Failed to save home");
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("Failed to save home");
      } else {
        console.error("Error:", error.message);
        toast.error("Failed to save home");
      }
    }
  };
  
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed inset-0 overflow-y-auto ${isOpen ? "block" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={homeData.name}
                    onChange={handleInputChange}
                    className="mt-1 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={homeData.price}
                    onChange={handleInputChange}
                    className="mt-1 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="bedrooms"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bedrooms
                  </label>
                  <input
                    type="text"
                    name="bedrooms"
                    id="bedrooms"
                    value={homeData.bedrooms}
                    onChange={handleInputChange}
                    className="mt-1 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="bathrooms"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bathrooms
                  </label>
                  <input
                    type="text"
                    name="bathrooms"
                    id="bathrooms"
                    value={homeData.bathrooms}
                    onChange={handleInputChange}
                    className="mt-1 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="surface"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Surface (sq ft)
                  </label>
                  <input
                    type="text"
                    name="surface"
                    id="surface"
                    value={homeData.surface}
                    onChange={handleInputChange}
                    className="mt-1 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-2 sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={homeData.address}
                    onChange={handleInputChange}
                    className="mt-1 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={homeData.city}
                    onChange={handleInputChange}
                    className="mt-1 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    id="type"
                    value={homeData.type}
                    onChange={handleInputChange}
                    className="mt-1 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-2 sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    value={homeData.description}
                    onChange={handleInputChange}
                    className="mt-1 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-2 sm:col-span-2">
                  <label
                    htmlFor="agent"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Agent
                  </label>
                  <select
                    name="agent"
                    id="agent"
                    value={homeData.agent.agentId}
                    onChange={handleAgentSelect}
                    className="mt-1 border-2 block w-full pl-3 pr-10 py-2 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="">Select an agent</option>
                    {agents.map((agent) => (
                      <option key={agent.agentId} value={agent.agentId}>
                        {agent.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-2">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleImageChange}
                    className="mt-1 border-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {selectedHome ? "Update" : "Add"}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
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

export default AddModal;
