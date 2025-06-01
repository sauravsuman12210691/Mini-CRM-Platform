import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CreateCampaign from './pages/CreateCampaign';
import CampaignHistoryPage from './pages/CampaignList';

function App() {
  return (
    <>
      <nav className="p-4 bg-gray-200 flex gap-4">
        <Link to="/">Create Campaign</Link>
        <Link to="/history">Campaign History</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CreateCampaign />} />
        <Route path="/history" element={<CampaignHistoryPage />} />
      </Routes>
    </>
  );
}

export default App;
