import React from 'react';

function VaultCard({ vault }) {
  const statusColor = vault.status === 'active' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-red-100 text-red-800';

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg">{vault.title}</h3>
        <span className={`${statusColor} text-xs px-2 py-1 rounded`}>
          {vault.status}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-4">Created: {vault.createdAt}</p>
      <div className="text-sm text-gray-500">
        <div>{vault.shares} shares • {vault.views}/{vault.maxViews} views</div>
      </div>
    </div>
  );
}

export default VaultCard;