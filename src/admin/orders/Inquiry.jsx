import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Inquiry = () => {
  const [inquiry, setInquiry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/inquiry')
      .then(response => {
        setInquiry(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching contact messages');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-6">Contact Messages</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">House Name</th>
                <th className="px-4 py-2 border-b">Agent Name</th>
                <th className="px-4 py-2 border-b">Customer Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Message</th>
              </tr>
            </thead>
            <tbody>
              {inquiry.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{inquiry.home.name}</td>
                  <td className="px-4 py-2 border-b">{inquiry.home.agent.name}</td>
                  <td className="px-4 py-2 border-b">{inquiry.name}</td>
                  <td className="px-4 py-2 border-b">{inquiry.email}</td>
                  <td className="px-4 py-2 border-b">{inquiry.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </>
  );
};

export default Inquiry;
