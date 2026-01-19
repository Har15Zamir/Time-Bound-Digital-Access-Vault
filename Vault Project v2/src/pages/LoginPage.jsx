import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-purple-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-purple-900 mb-6 text-center">
          Digital Vault
        </h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
          
          <button 
            onClick={onLogin}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;