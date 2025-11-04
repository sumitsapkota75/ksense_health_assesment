import Image from "next/image";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-3">
          <Image
            src="/ksense_logo.svg"
            alt="Healthcare Logo"
            width={100} 
            height={50}
            className="rounded-full object-contain"
          />
        </div>
        <div className="flex">
            <button className="text-sm text-gray-600 hover:text-gray-900 transition">
            All Patients
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition cursor-pointer">
            Submit Request
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
