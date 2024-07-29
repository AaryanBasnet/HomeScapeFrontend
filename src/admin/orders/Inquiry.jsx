import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Inquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/inquiry')
      .then(response => {
        setInquiries(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching inquiries');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="m-4">
      <h1 className="text-3xl font-semibold mb-6">Inquiries</h1>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              House Name
            </th>
            <th scope="col" className="px-6 py-3">
              Agent Name
            </th>
            <th scope="col" className="px-6 py-3">
              Customer Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Message
            </th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => (
            <tr key={inquiry.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {inquiry.home.name}
              </td>
              <td className="px-6 py-4">
                {inquiry.home.agent.name}
              </td>
              <td className="px-6 py-4">
                {inquiry.name}
              </td>
              <td className="px-6 py-4">
                {inquiry.email}
              </td>
              <td className="px-6 py-4">
                {inquiry.message}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inquiry;
