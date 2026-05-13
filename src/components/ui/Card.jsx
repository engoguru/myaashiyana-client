import React from 'react';

export function Card({ children, className = '' }) {
    return (
      <div className={`bg-white shadow-md rounded-xl p-4 mb-4 ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardContent({ children, className = '' }) {
    return (
      <div className={`p-2 ${className}`}>
        {children}
      </div>
    );
  }
  