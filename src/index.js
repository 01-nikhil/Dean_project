import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CreateRegulation from './create-regulation';  // <-- Ensure this path is correct
import AddStream from './add-stream';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminHome from './admin_home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Router>
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/create-regulation" element={<CreateRegulation />} />
        <Route path="/add-stream" element={<AddStream />} />
        {/* You can add more routes for edit and delete pages here */}
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
