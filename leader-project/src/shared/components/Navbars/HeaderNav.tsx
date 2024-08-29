import {useState} from 'react'
import { Link } from 'react-router-dom';
function HeaderNav() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side links */}
        <div className="flex space-x-4">
          <Link to='/' className="hover:bg-gray-700 px-3 py-2 rounded">Home</Link>
          <Link to='/' className="hover:bg-gray-700 px-3 py-2 rounded">List of Leaders</Link>
          <Link to='/fetchdata' className="hover:bg-gray-700 px-3 py-2 rounded">Fetch Data</Link>
        </div>

        {/* Right side profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center focus:outline-none"
          >
            <span className="mr-2">Profile</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black border border-gray-300 rounded shadow-lg">
              <a href="#profile" className="block px-4 py-2 hover:bg-gray-200">Profile</a>
              <a href="#settings" className="block px-4 py-2 hover:bg-gray-200">Settings</a>
              <a href="#logout" className="block px-4 py-2 hover:bg-gray-200">Logout</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default HeaderNav