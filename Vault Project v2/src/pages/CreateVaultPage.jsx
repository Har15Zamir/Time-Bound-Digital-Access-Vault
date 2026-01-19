import React from 'react';
import Header from '../components/Header';

function CreateVaultPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        title="Create New Vault"
        showBackButton={true}
        onBack={() => onNavigate('dashboard')}
      />

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded shadow p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Vault Title
              </label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="e.g., Production API Keys"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Sensitive Content
              </label>
              <textarea 
                rows="6"
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter your sensitive data here..."
              />
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-bold mb-4">Access Rules</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">
                    Expiration Date
                  </label>
                  <input 
                    type="datetime-local" 
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Maximum Views
                  </label>
                  <input 
                    type="number" 
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="e.g., 10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Access Password (Optional)
                </label>
                <input 
                  type="password" 
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Set a password"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => onNavigate('dashboard')}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button 
                onClick={() => onNavigate('success')}
                className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
              >
                Create Vault
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateVaultPage;