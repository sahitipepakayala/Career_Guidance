import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '12px',
  padding: '16px',
  marginBottom: '16px',
  boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
  backgroundColor: '#fff',
};

const titleStyle = {
  color: '#2c3e50',
  marginBottom: '8px',
};

const descriptionStyle = {
  marginBottom: '8px',
  color: '#555',
};

const buttonStyle = {
  padding: '8px 16px',
  backgroundColor: '#2980b9',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'inline-block',
  marginTop: '12px',
};

const searchBarStyle = {
  width: '100%',
  padding: '12px 16px',
  marginBottom: '24px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '16px',
  boxSizing: 'border-box',
};

// Helper to truncate text to maxWords (100 here)
const truncateWords = (text, maxWords = 20) => {
  if (!text) return "";
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + " ...";
};

const CareerList = () => {
  const [careers, setCareers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    api.get('/careers/')
      .then(response => {
        setCareers(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch careers', error);
      });
  }, []);

  const normalize = (text) => text.toLowerCase().replace(/\s+/g, '');

  const filteredCareers = careers.filter(career => {
    const normalizedTitle = normalize(career.title);
    const keywords = searchTerm.toLowerCase().trim().split(/\s+/);
    return keywords.every(keyword => normalizedTitle.includes(keyword));
  });

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Career List</h2>

      <input
        type="text"
        placeholder="Search careers by title..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={searchBarStyle}
      />

      {filteredCareers.length > 0 ? (
        filteredCareers.map(career => (
          <div key={career.id} style={cardStyle}>
            <h3 style={titleStyle}>{career.title}</h3>
            <p style={descriptionStyle}><strong>Id:</strong> {career.id}</p>
            <p style={descriptionStyle}><strong>Description:</strong> {truncateWords(career.description)}</p>
            <p style={descriptionStyle}><strong>Qualifications:</strong> {truncateWords(career.qualifications)}</p>
            <p style={descriptionStyle}><strong>Job Outlook:</strong> {truncateWords(career.job_outlook)}</p>
            <p style={descriptionStyle}><strong>Pathways:</strong> {truncateWords(career.pathways)}</p>
            <Link to={`/careers/${career.id}`} style={buttonStyle}>
              View
            </Link>
          </div>
        ))
      ) : (
        <p>No careers found matching "{searchTerm}".</p>
      )}
    </div>
  );
};

export default CareerList;
