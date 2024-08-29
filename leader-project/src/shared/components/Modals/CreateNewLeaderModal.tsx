import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateNewLeaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (leaderData: { name: string; email: string; phoneNumber: string }) => void;
  validationErrors: Record<string, string[]> | null;
}

const CreateNewLeaderModal: React.FC<CreateNewLeaderModalProps> = ({ isOpen, onClose, onSave, validationErrors }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, email, phoneNumber });
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50'>
      <div className='relative p-4 w-full max-w-md max-h-full'>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add New Leader
            </h3>

            <button onClick={onClose} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
              <X className='h-5 w-5' />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className='p-4 md:p-5'>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Leader Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`bg-gray-50 border ${validationErrors?.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                  placeholder="John Doe"
                  required
                />
                {validationErrors?.name && (
                  <span className='text-red-500 mt-2 text-xs'>
                    {validationErrors.name[0]}
                  </span>
                )}
              </div>

              <div className='mt-2'>
                <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`bg-gray-50 border ${validationErrors?.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                  placeholder="JohnDoe@gmail.com"
                  required
                />
                {validationErrors?.email && (
                  <span className='text-red-500 mt-2 text-xs'>
                    {validationErrors.email[0]}
                  </span>
                )}
              </div>

              <div className='mt-2'>
                <label htmlFor="phoneNumber" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                  className={`bg-gray-50 border ${validationErrors?.phoneNumber ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                  placeholder="09097878751"
                  required
                />
                {validationErrors?.phoneNumber && (
                  <span className='text-red-500 mt-2 text-xs'>
                    {validationErrors.phoneNumber[0]}
                  </span>
                )}
              </div>

              <div className='flex mt-5 gap-2'>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Leader</button>
                <button onClick={onClose} type="button" className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNewLeaderModal;
