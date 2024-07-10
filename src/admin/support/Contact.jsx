import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/contact')
      .then(response => {
        setContacts(response.data.data);
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
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Message</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{contact.name}</td>
                  <td className="px-4 py-2 border-b">{contact.email}</td>
                  <td className="px-4 py-2 border-b">{contact.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </>
  );
};

export default Contact;
