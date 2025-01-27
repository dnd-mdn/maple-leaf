import React, { useState } from 'react';
import { isDWAN, isGCNet } from './util/detect';

export const DWANTester = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const reachable = await isDWAN();
      setStatus(reachable ? 'Reachable' : 'Not Reachable');
    } catch (error) {
      setStatus('Error occurred');
    }

    setLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">DWAN Tester</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleCheck}
        disabled={loading}
      >
        {loading ? 'Checking...' : 'Check DWAN'}
      </button>
      {status && (
        <div
          className={`mt-4 p-2 text-center rounded ${
            status === 'Reachable' ? 'bg-green-200' : 'bg-red-200'
          }`}
        >
          {status}
        </div>
      )}
    </div>
  );
};

export const GCNETTester = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const handleCheck = async () => {
      setLoading(true);
      setStatus(null);
  
      try {
        const reachable = await isGCNet();
        setStatus(reachable ? 'Reachable' : 'Not Reachable');
      } catch (error) {
        setStatus('Error occurred');
      }
  
      setLoading(false);
    };
  
    return (
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">GCNet Tester</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCheck}
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Check GCNet'}
        </button>
        {status && (
          <div
            className={`mt-4 p-2 text-center rounded ${
              status === 'Reachable' ? 'bg-green-200' : 'bg-red-200'
            }`}
          >
            {status}
          </div>
        )}
      </div>
    );
  };

export default DWANTester;