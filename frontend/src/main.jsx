import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SegmentBuilder from './components/SegmentBuilder';
import CampaignHistory from './pages/CampaignHistory';  // create this page

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SegmentBuilder />} />
      <Route path="/campaigns" element={<CampaignHistory />} />
    </Routes>
  </BrowserRouter>
);
