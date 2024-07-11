import React, { useState } from 'react';
import axios from 'axios';

const ContactAgent = ({ homeId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to contact the agent.');
        return;
      }

      const response = await axios.post(
        'http://localhost:8080/api/inquiry',
        { ...formData, homeId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 201) {
        alert('Inquiry sent successfully');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        alert('Failed to send inquiry');
      }
    } catch (error) {
      console.error('Error sending inquiry:', error);
      alert('Failed to send inquiry');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="border rounded-lg px-4 py-2"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border rounded-lg px-4 py-2"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="border rounded-lg px-4 py-2"
      />
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      <textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        className="border rounded-lg px-4 py-2 w-full"
        rows="4"
      ></textarea>
      {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
        Contact Agent
      </button>
    </form>
  );
};

export default ContactAgent;
