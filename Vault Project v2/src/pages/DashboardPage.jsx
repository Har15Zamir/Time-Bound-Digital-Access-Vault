import React from 'react';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import VaultCard from '../components/VaultCard';

function DashboardPage({ onLogout, onNavigate }) {
  const vaults = [
    {
      id: 1,
      title: 'API Keys',
      status: 'active',
      createdAt: 'Jan 15, 2025',
      shares: 2,
      views: 5,
      maxViews: 10
    },
    {
      id: 2,
      title: 'Database Info',
      status: 'active',
      createdAt: 'Jan 14, 2025',
      shares: 1,
      views: 3,
      maxViews: 5
    },
    {
      id: 3,
      title: 'SSL Certificates',
      status: 'expired',
      createdAt: 'Jan 10, 2025',
      shares: 1,
      views: 8,
      maxViews: 8
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onLogout={onLogout} />

      <div className="max-w-6xl mx-auto p-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard number="12" label="Total Vaults" color="purple" />
          <StatsCard number="8" label="Active Links" color="blue" />
          <StatsCard number="156" label="Total Views" color="green" />
          <StatsCard number="3" label="Expiring Soon" color="orange" />
        </div>

        {/* Create Button */}
        <div className="mb-6">
          <button 
            onClick={() => onNavigate('create')}
            className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700"
          >
            + Create New Vault
          </button>
        </div>

        {/* Vault List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vaults.map((vault) => (
            <VaultCard key={vault.id} vault={vault} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;