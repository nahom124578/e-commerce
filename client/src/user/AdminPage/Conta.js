import React, { useEffect, useState } from 'react';

const ContactDetails = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:3001/Contacts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setContacts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Contacts:', error);
        setError('Error fetching Contacts. Please try again later.');
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4 mt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome, Admin!</h1>
          <p className="text-lg">Here are some important Asked Questions</p>
        </div>

        {/* Fixed header row for Name, Email, Message, and Answer */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Number Header */}
          <div className="bg-blue-200 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-blue-800">No.</h2>
          </div>

          {/* Name Header */}
          <div className="bg-blue-200 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-blue-800">Name</h2>
          </div>

          {/* Email Header */}
          <div className="bg-green-200 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-green-800">Email</h2>
          </div>

          {/* Message Header */}
          <div className="bg-purple-200 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-purple-800">Message</h2>
          </div>

          {/* Answer Header */}
          <div className="bg-purple-200 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-purple-800">Answer</h2>
          </div>
        </div>

        {/* Display loading indicator if data is being fetched */}
        {loading && (
          <div className="text-center mt-4">
            <p>Loading...</p>
          </div>
        )}

        {/* Display error message if there's an error */}
        {error && (
          <div className="text-red-600 text-center mt-4">
            <p>{error}</p>
          </div>
        )}

        {/* Display contacts data below the headers */}
        {!loading && contacts.map((contact, index) => (
          <div key={contact.id} className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg shadow text-center">{index + 1}</div>
            <div className="bg-blue-100 p-4 rounded-lg shadow text-center">{contact.name}</div>
            <div className="bg-green-100 p-4 rounded-lg shadow text-center">{contact.email}</div>
            <div className="bg-purple-100 p-4 rounded-lg shadow text-center">{contact.message}</div>
            <div className="bg-purple-100 p-4 rounded-lg shadow text-center">
              <a href={`mailto:${contact.email}`} className="text-blue-600 underline">Reply via Gmail</a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ContactDetails;
