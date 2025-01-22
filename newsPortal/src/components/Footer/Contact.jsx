import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Contact</h2>
      <ul className="text-gray-400">
        <li>Email: <Link to="mailto:info@example.com" className="text-blue-400 hover:underline">info@example.com</Link></li>
        <li>Phone: <Link to="tel:+123456789" className="text-blue-400 hover:underline">+1 234 567 89</Link></li>
        <li>Address: 123 Main Street, City, Country</li>
      </ul>
    </div>
  );
};

export default Contact;