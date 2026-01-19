import React from 'react';

function Header({ title = 'Digital Vault', onLogout, showBackButton, onBack }) {
  return (
    <div className="bg-purple-600 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {showBackButton ? (
          <button 
            onClick={onBack}
            className="bg-purple-700 px-4 py-2 rounded hover:bg-purple-800"
          >
            ← Back
          </button>
        ) : (
          <h1 className="text-2xl font-bold">{title}</h1>
        )}
        
        {onLogout && (
          <button 
            onClick={onLogout}
            className="bg-purple-700 px-4 py-2 rounded hover:bg-purple-800"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;