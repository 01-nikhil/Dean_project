import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  const blocks = [
    { title: 'Regulation', description: 'Manage academic regulations and policies', path: '/regulation' },
    { title: 'Faculty', description: 'Oversee faculty information and assignments', path: '/faculty' },
    { title: 'LTP', description: 'Handle Lecture, Tutorial, and Practical schedules', path: '/ltp' },
    { title: 'Edit Category', description: 'Modify and update various categories', path: '/edit-category' },
  ];

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('https://skcet.ac.in/images/gallery/campus.jpg')"}}>
      <nav className="bg-gradient-to-r from-gray-100 to-blue-100 shadow-lg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-20">
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-6">
                {blocks.map((block, index) => (
                  <Link
                    key={index}
                    to={block.path}
                    className="text-blue-800 hover:bg-blue-200 hover:text-blue-900 px-4 py-2 rounded-md text-lg font-medium transition duration-300 transform hover:scale-105"
                  >
                    {block.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-100 to-blue-200 flex items-center justify-center">
        <div className="container mx-auto px-8 sm:px-12 lg:px-16 ">
          <h1 className="text-6xl font-extrabold text-blue-800 text-center mb-10 tracking-wide">Admin Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {blocks.map((block, index) => (
              <Link key={index} to={block.path} className="group">
                <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-md rounded-xl overflow-hidden shadow-lg transform transition duration-300 group-hover:scale-105 group-hover:rotate-1 group-hover:shadow-2xl">
                  <div className="h-full flex flex-col justify-between p-8">
                    <h2 className="text-3xl font-semibold text-blue-700 mb-6 group-hover:text-blue-900 transition duration-300">{block.title}</h2>
                    <p className="text-gray-700 mb-6 group-hover:text-blue-800 transition duration-300">{block.description}</p>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transform transition duration-300 group-hover:w-full"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
