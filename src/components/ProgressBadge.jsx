import React from 'react';

const ProgressBadge = ({ total, completed }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  const getColor = () => {
    if (percentage < 30) return 'bg-red-600';
    if (percentage < 70) return 'bg-yellow-600';
    return 'bg-green-600';
  };

  return (
    <div className="relative flex items-center">
      <div className={`rounded-full ${getColor()} text-white w-14 h-14 font-bold flex items-center justify-center`}>
        {completed}/{total}
      </div>
      <div className="absolute -bottom-1 -right-1 bg-gray-800 text-xs rounded-full px-1 py-0.5 border border-gray-600">
        {percentage}%
      </div>
    </div>
  );
};

export default ProgressBadge;