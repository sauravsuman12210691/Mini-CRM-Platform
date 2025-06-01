import React, { useEffect, useState } from 'react';

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    // TODO: Fetch campaigns from backend API
    setCampaigns([
      { id: 1, name: 'Welcome Campaign', audienceSize: 1500, sent: 1400, failed: 100 },
      { id: 2, name: 'Reactivation Campaign', audienceSize: 800, sent: 720, failed: 80 },
    ]);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Campaign History</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Campaign Name</th>
            <th className="border border-gray-300 px-4 py-2">Audience Size</th>
            <th className="border border-gray-300 px-4 py-2">Sent</th>
            <th className="border border-gray-300 px-4 py-2">Failed</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map(c => (
            <tr key={c.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{c.name}</td>
              <td className="border border-gray-300 px-4 py-2">{c.audienceSize}</td>
              <td className="border border-gray-300 px-4 py-2">{c.sent}</td>
              <td className="border border-gray-300 px-4 py-2">{c.failed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
