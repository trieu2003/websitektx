// src/components/ui/card.jsx
import React from 'react';

export const Card = ({ children, className = '' }) => (
  <div className={`bg-white shadow-md rounded-xl p-4 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ children }) => (
  <div className="text-gray-800">{children}</div>
);
