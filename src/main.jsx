import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ExportData from './pages/ExportData.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* App handles dark mode logic via class strategy */}
    <Router>
      <Routes>
        {/* App acts as a layout with sidebar and routing */}
        <Route path="/" element={<App />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="export-data" element={<ExportData />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
