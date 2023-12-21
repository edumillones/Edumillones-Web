// FeatureCard.jsx
import React from 'react';

const FeatureCard = ({ title, description, gradientFrom, gradientTo }) => {
  const gradientStyle = {
    background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
  };

  return (
    <div style={gradientStyle} className="p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-100">{description}</p>
    </div>
  );
};

export default FeatureCard;
