import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { fetchData } from '../utils/services/apiServices';

const FetchData: React.FC = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetching, setFetching] = useState<boolean>(false); // State to manage fetching message

  // Function to fetch and update the table data
  const loadLeaders = async () => {
    setFetching(true); // Set fetching to true when starting the fetch
    setIsLoading(true);
    try {
      const data = await fetchData();
      setLeaders(data);
    } catch (error) {
      console.error('Failed to load leaders:', error);
    } finally {
      setIsLoading(false);
      setFetching(false); // Reset fetching to false after data is loaded
    }
  };

  useEffect(() => {
    // Optionally, you can call loadLeaders here if you want to load data initially
    // loadLeaders();
  }, []);

  return (
    <div className='overflow-x-auto bg-white shadow-md rounded-lg p-5'>
      <div className='flex mb-5 justify-between'>
        <h1 className='text-lg font-semibold'>Leader's Data</h1>
        <button onClick={loadLeaders} className='flex items-center space-x-2 bg-blue-500 p-2 text-sm font-semibold text-white'>
          <Plus className='h-5 w-5' /> Fetch Data
        </button>
      </div>

      {/* Fetching message */}
      {fetching && (
        <div className="mb-4 p-4 text-blue-800 bg-blue-200 rounded-lg">
          Fetching data, please wait...
        </div>
      )}

      <table className='min-w-full table-auto'>
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-center">Email</th>
            <th className="py-3 px-6 text-center">Phone Number</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {isLoading && !fetching ? (
            <tr>
              <td colSpan={3} className="py-3 px-6 text-center text-2xl">
                Fetch data now...
              </td>
            </tr>
          ) : leaders.length === 0 ? (
            <tr>
              <td colSpan={3} className="py-3 px-6 text-center">
                No data available
              </td>
            </tr>
          ) : (
            leaders.map((leader) => (
              <tr key={leader.id} className="border-b border-gray-200 text-lg hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <span>{leader.name}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <span>{leader.email}</span>
                </td>
                <td className="py-3 px-6 text-center">
                  <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-lg">
                    {leader.phoneNumber}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FetchData;
