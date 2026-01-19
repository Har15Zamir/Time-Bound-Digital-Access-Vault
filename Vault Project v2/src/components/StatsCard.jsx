import React from 'react';

function StatsCard({ number, label, color = 'purple' }) {
  const colorClasses = {
    purple: 'text-purple-600',
    blue: 'text-blue-600',
    green: 'text-green-600',
    orange: 'text-orange-600'
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className={`text-3xl font-bold ${colorClasses[color]}`}>
        {number}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}

export default StatsCard;