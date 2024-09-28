import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// import { Link } from 'react-router-dom';
export default function CreateRegulation() {
  const navigate = useNavigate();
  const location=useLocation();

  // State variables to manage form input values
  const [regulation, setRegulation] = useState('');
  const [level, setLevel] = useState('');
  const [degree, setDegree] = useState('');
  const [department, setDepartment] = useState('');
  const [creditRange, setCreditRange] = useState({ min: 0, max: 0 });

  // Function to check if credit range is valid (both values should be greater than 0)
  const isCreditRangeValid = creditRange.min > 0 && creditRange.max > creditRange.min;

  // Inside CreateRegulation component
const handleCreateRegulation = async () => {
  if (isCreditRangeValid) {
    try {
      const regulationData = {
        year: regulation,
        level,
        degree,
        department,
        min_credits: creditRange.min,
        max_credits: creditRange.max,
      };
      
      // Send regulation data to Django backend
      const response = await axios.post('http://localhost:8000/api/regulations/', regulationData);
      const regulationId = response.data.id; // Get the ID of the created regulation

      // Navigate to AddStream with regulationId
      navigate('/add-stream', { state: { degree, level, regulationId } });
    } catch (error) {
      console.error('Error creating regulation:', error);
    }
  }
};

  // Function to handle valid year input and reset the dependent fields when year changes
  const handleYearChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d{0,4}$/.test(value)) { // Regex to allow 0 to 4 digits
      setRegulation(value); // Set the year to a valid number or reset if it's not valid
      resetForm(); // Reset the form when year changes
    }
  };

  // Reset form fields when higher-level input changes (e.g., year changes)
  const resetForm = () => {
    setLevel('');
    setDegree('');
    setDepartment('');
    setCreditRange({ min: 0, max: 0 });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-semibold">University Management System</h1>
        </div>
      </header>


      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-gray-700 text-center">Create Regulation</h2>

          {/* Regulation Year Input */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Enter Regulation Year:</label>
            <input
              type="text"
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 2023"
              value={regulation}
              onChange={handleYearChange} // Year validation
              maxLength={4} // Limit input to 4 characters
            />
            {/* Error message if the year is invalid */}
            {regulation && regulation.length !== 4 && (
              <p className="text-red-500 text-sm">Please enter a valid 4-digit year.</p>
            )}
          </div>

          {/* Level of Program */}
          {regulation.length === 4 && (
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Level of Program:</label>
              <select
                className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={level}
                onChange={(e) => {
                  setLevel(e.target.value); // Reset level and dependent fields
                  setDegree('');
                  setDepartment('');
                  setCreditRange({ min: 0, max: 0 });
                }}
              >
                <option value="">Select Level</option>
                <option value="UG">Undergraduate (UG)</option>
                <option value="PG">Postgraduate (PG)</option>
              </select>
            </div>
          )}

          {/* Degree Selection */}
          {level && (
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Degree:</label>
              <select
                className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={degree}
                onChange={(e) => {
                  setDegree(e.target.value);
                  setDepartment('');
                  setCreditRange({ min: 0, max: 0 });
                }}
              >
                <option value="">
                  {level === "PG" ? "ME" : "Select Degree"}
                </option>
                {level === "UG" && (
                  <>
                    <option value="BE">B.E</option>
                    <option value="BTech">B.Tech</option>
                    <option value="M.Tech">M.Tech</option>
                  </>
                )}
                {level === "PG" && <option value="ME">M.E</option>}
              </select>
            </div>
          )}

          {/* Department Selection */}
          {degree && (
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Department:</label>
              <select
                className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setCreditRange({ min: 0, max: 0 });
                }}
              >
                <option value="">Select Department</option>
                <option value="CSE">Computer Science (CSE)</option>
                <option value="IT">Information Technology (IT)</option>
                <option value="ECE">Electronics and Communication (ECE)</option>
              </select>
            </div>
          )}

          {/* Credit Range Selection */}
          {department && (
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">Credit Range:</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-1/2 border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={creditRange.min}
                  onChange={(e) => setCreditRange({ ...creditRange, min: parseInt(e.target.value, 10) || 0 })}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-1/2 border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={creditRange.max}
                  onChange={(e) => setCreditRange({ ...creditRange, max: parseInt(e.target.value, 10) || 0 })}
                />
              </div>
              {!isCreditRangeValid && (
                <p className="text-red-500 text-sm">Please enter valid credit ranges for both fields.</p>
              )}
            </div>
          )}

          {/* Button to Create Stream */}
          {isCreditRangeValid && (
            <button
              className="bg-blue-600 text-white w-full p-3 rounded-md mt-4 hover:bg-blue-700 transition"
              onClick={() => navigate('/add-stream',{state:{degree,level}})}
            >
              Create Stream
            </button>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} University Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}