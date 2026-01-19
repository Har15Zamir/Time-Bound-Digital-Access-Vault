import React from 'react';
import Header from '../components/Header';

function SuccessPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Vault Created!" />

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded shadow p-8">
          <div className="text-center mb-8">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-2">Success!</h2>
            <p className="text-gray-600">Your vault has been created</p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Share Link
            </label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value="https://vault.app/share/abc123xyz"
                readOnly
                className="flex-1 border border-gray-300 rounded px-3 py-2 bg-gray-50"
              />
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                Copy
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="border rounded p-4">
              <div className="text-gray-600 text-sm">Expires</div>
              <div className="font-bold">Jan 25, 2026</div>
            </div>
            <div className="border rounded p-4">
              <div className="text-gray-600 text-sm">Max Views</div>
              <div className="font-bold">10 views</div>
            </div>
            <div className="border rounded p-4">
              <div className="text-gray-600 text-sm">Current Views</div>
              <div className="font-bold">0 / 10</div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
            <div className="font-bold text-yellow-800 mb-2">⚠️ Important:</div>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Link expires after the set date or max views</li>
              <li>• Share only with trusted people</li>
              <li>• All access is logged</li>
            </ul>
          </div>

          <button 
            onClick={() => onNavigate('dashboard')}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;