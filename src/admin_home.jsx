import { useNavigate } from 'react-router-dom';


export default function AdminHome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4">
      <h1 className="text-4xl font-bold mb-8">Welcome Admin!</h1>
      <div className="space-y-4 space-x-10">
        <button 
          onClick={() => navigate('/create-regulation')} 
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
          Create Regulation
        </button>
        <button 
          onClick={() => navigate('/edit-regulation')} 
          className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600">
          Edit Regulation
        </button>
        <button 
          onClick={() => navigate('/delete-regulation')} 
          className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600">
          Delete Regulation
        </button>
      </div>
    </div>
  );
}
