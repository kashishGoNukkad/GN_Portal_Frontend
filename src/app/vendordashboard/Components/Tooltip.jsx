// components/Tooltip.js
import React from 'react';

const Tooltip = ({ text, children }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full mb-2 hidden group-hover:flex items-center justify-center bg-red-500 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
