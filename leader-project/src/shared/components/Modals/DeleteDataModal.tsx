import React from 'react';
import { X } from 'lucide-react';

interface DeleteLeaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteLeaderModal: React.FC<DeleteLeaderModalProps> = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50'>
      <div className='relative p-4 w-full max-w-sm max-h-full'>
        <div className='relative bg-white rounded-lg shadow'>
          <div className='flex items-center justify-between p-4 border-b rounded-t'>
            <h3 className="text-xl font-semibold text-gray-900">
              Delete Leader
            </h3>
            <button onClick={onClose} type="button" className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex items-center justify-center">
              <X className='h-5 w-5' />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className='p-4'>
            <p className="text-gray-800">Are you sure you want to delete this leader? This action cannot be undone.</p>
            <div className='flex mt-5 gap-2'>
              <button onClick={onDelete} className="w-full text-white bg-red-700 hover:bg-red-800 rounded-lg text-sm px-5 py-2.5">Delete</button>
              <button onClick={onClose} type="button" className="w-full text-white bg-gray-500 hover:bg-gray-600 rounded-lg text-sm px-5 py-2.5">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteLeaderModal;
