import React from 'react';

interface ScrollAreaProps {
  children: React.ReactNode;
  maxHeight?: string;
  className?: string;
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({ 
  children, 
  maxHeight = '400px',
  className = ''
}) => {
  return (
    <div 
      className={`
        overflow-y-auto
        scrollbar-thin
        scrollbar-thumb-gray-400
        scrollbar-track-gray-100
        hover:scrollbar-thumb-gray-500
        pr-2
        ${className}
      `}
      style={{ maxHeight }}
    >
      {children}
    </div>
  );
};