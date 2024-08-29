import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface EditLeaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: number, leaderData: { name: string; email: string; phoneNumber: string }) => void;
  leaderData: { id: number; name: string; email: string; phoneNumber: string };
  validationErrors: Record<string, string[]>;
}

const EditLeaderModal: React.FC<EditLeaderModalProps> = ({ isOpen, onClose, onSave, leaderData, validationErrors }) => {
  const [name, setName] = useState(leaderData.name);
  const [email, setEmail] = useState(leaderData.email);
  const [phoneNumber, setPhoneNumber] = useState(leaderData.phoneNumber);

  useEffect(() => {
    setName(leaderData.name);
    setEmail(leaderData.email);
    setPhoneNumber(leaderData.phoneNumber);
  }, [leaderData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(leaderData.id, { name, email, phoneNumber });
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50'>
      <div className='relative p-4 w-full max-w-md max-h-full'>
        <div className='relative bg-white rounded-lg shadow'>
          <div className='flex items-center justify-between p-4 border-b rounded-t'>
            <h3 className="text-xl font-semibold text-gray-900">
              Edit Leader
            </h3>
            <button onClick={onClose} type="button" className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex items-center justify-center">
              <X className='h-5 w-5' />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className='p-4'>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className='block mb-2 text-sm font-medium text-gray-900'>Leader Name</label>
                <input  
                  type="text" 
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)} 
                  className={`bg-gray-50 border ${validationErrors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                  placeholder="John Doe"
                  required 
                />
                {validationErrors.name && (
                  <span className='text-red-500 mt-2 text-xs'>{validationErrors.name[0]}</span>
                )}
              </div>

              <div className='mt-2'>
                <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900'>Email</label>
                <input
                  type="email" 
                  id="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className={`bg-gray-50 border ${validationErrors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                  placeholder="JohnDoe@gmail.com" 
                  required 
                />
                {validationErrors.email && (
                  <span className='text-red-500 mt-2 text-xs'>{validationErrors.email[0]}</span>
                )}
              </div>

              <div className='mt-2'>
                <label htmlFor="phoneNumber" className='block mb-2 text-sm font-medium text-gray-900'>Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={`bg-gray-50 border ${validationErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg block w-full p-2.5`}
                  placeholder="09097878751"
                  required 
                />
                {validationErrors.phoneNumber && (
                  <span className='text-red-500 mt-2 text-xs'>{validationErrors.phoneNumber[0]}</span>
                )}
              </div>

              <div className='flex mt-5 gap-2'>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5">Save Changes</button>
                <button onClick={onClose} type="button" className="w-full text-white bg-red-700 hover:bg-red-800 rounded-lg text-sm px-5 py-2.5">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLeaderModal;
