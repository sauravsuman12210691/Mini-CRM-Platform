import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // for redirecting

// ... Rule and RuleGroup components unchanged ...

export default function SegmentBuilder() {
  const [segment, setSegment] = useState({
    combinator: 'and',
    rules: [{ field: '', operator: '', value: '' }]
  });
  const [audienceSize, setAudienceSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSegmentChange = (newSegment) => {
    setSegment(newSegment);
    setAudienceSize(null); // reset preview on change
    setError(null);
  };

  // Call preview API to get audience size
  const previewAudienceSize = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/segments/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(segment),
      });

      if (!response.ok) throw new Error('Failed to preview audience');

      const data = await response.json();
      setAudienceSize(data.audienceSize);
    } catch (err) {
      setError(err.message);
      setAudienceSize(null);
    } finally {
      setLoading(false);
    }
  };

  // Save segment API call and redirect
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/segments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'My Segment', rules: segment }),
      });

      if (!response.ok) throw new Error('Failed to save segment');

      const savedSegment = await response.json();
      // Redirect to campaign history page (e.g., /campaigns)
      navigate('/campaigns');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="max-w-3xl mx-auto p-6" onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold mb-6">Create Audience Segment</h1>
      <RuleGroup group={segment} onChange={handleSegmentChange} />

      <div className="mb-4">
        <button
          type="button"
          onClick={previewAudienceSize}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mr-4"
          disabled={loading}
        >
          Preview Audience Size
        </button>

        {loading && <span className="text-gray-600">Loading...</span>}
        {error && <span className="text-red-600 ml-4">{error}</span>}
        {audienceSize !== null && (
          <span className="ml-4 font-semibold">Audience Size: {audienceSize}</span>
        )}
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        disabled={loading}
      >
        Save Segment & Create Campaign
      </button>
    </form>
  );
}
