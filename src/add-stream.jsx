import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function AddStream() {
  const location = useLocation();
  const degree = location.state?.degree || ' ';
  const [streamName, setStreamName] = useState('');
  const [streams, setStreams] = useState([]);

  const handleAddStream = () => {
    const semesterCount = degree === 'M.Tech' ? 10 : 8;
    const newStream = { name: streamName, semesterCount, credits: Array(semesterCount).fill('') };
    setStreams([...streams, newStream]);
    setStreamName(''); // Clear the stream input after adding
  };

  const handleRemoveStream = (indexToRemove) => {
    const updatedStreams = streams.filter((_, index) => index !== indexToRemove);
    setStreams(updatedStreams);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Add Stream</h1>

      <div className="mb-4 flex space-x-4">
        <input 
          type="text" 
          placeholder="Stream Name" 
          className="border p-2 rounded-md" 
          value={streamName} 
          onChange={(e) => setStreamName(e.target.value)} 
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleAddStream}
        >
          + Add Stream
        </button>
      </div>

      <table className="table-auto border-collapse w-full bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">S. No</th>
            <th className="border px-4 py-2">Stream</th>
            {Array.from({ length: degree === 'M.Tech' ? 10 : 8 }, (_, i) => (
              <th key={i} className="border px-4 py-2">Sem {i + 1}</th>
            ))}
            <th className="border px-4 py-2">Credits</th> {/* Credits column header */}
            <th className="border px-4 py-2">Actions</th> {/* Actions column header */}
          </tr>
        </thead>
        <tbody>
          {streams.map((stream, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2">{stream.name}</td>
              {Array.from({ length: stream.semesterCount }, (_, i) => (
                <td key={i} className="border px-2 py-1 text-center">
                  <input 
                    type="text" 
                    className="border p-1 rounded w-full text-center"
                    placeholder={`Sem ${i + 1}`}
                    value={stream.credits[i]} 
                    onChange={(e) => {
                      const newCredits = [...stream.credits];
                      newCredits[i] = e.target.value;
                      const updatedStreams = [...streams];
                      updatedStreams[index].credits = newCredits;
                      setStreams(updatedStreams);
                    }} 
                  />
                </td>
              ))}

              {/* Credits column */}
              <td className="border px-4 py-2 text-center">
                {/* {stream.credits.reduce((total, credit) => total + (parseFloat(credit) || 0), 0)}
                 */}
                  {(() => {
                  let total = 0;
                  for (let i = 0; i < stream.credits.length; i++) {
                    total += Number(stream.credits[i]) || 0;
                  }
                  return total;
                })()}
              </td>

              {/* "Remove" button column */}
              <td className="border px-4 py-2 text-center">
                <button 
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                  onClick={() => handleRemoveStream(index)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}