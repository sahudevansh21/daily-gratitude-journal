"use client";

import { useState, useEffect } from 'react';

function getTodayDateString() {
  const today = new Date();
  return today.toISOString().slice(0, 10); // YYYY-MM-DD
}

function getGratitudeEntries() {
  if (typeof window !== 'undefined') {
    const entries = localStorage.getItem('gratitudeEntries');
    return entries ? JSON.parse(entries) : {};
  }
  return {};
}

function saveGratitudeEntries(entries) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('gratitudeEntries', JSON.stringify(entries));
  }
}

export default function TodayEntryPage() {
  const todayDate = getTodayDateString();
  const [entryText, setEntryText] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  useEffect(() => {
    const entries = getGratitudeEntries();
    setEntryText(entries[todayDate] || '');
  }, [todayDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const entries = getGratitudeEntries();
    const newEntries = { ...entries, [todayDate]: entryText.trim() };
    saveGratitudeEntries(newEntries);
    setMessage('Gratitude entry saved successfully!');
    setMessageType('success');
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="glass-card">
      <h1>Today's Entry</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        What are you grateful for today ({todayDate})?
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="gratitude-entry">Your gratitude thoughts:</label>
          <textarea
            id="gratitude-entry"
            value={entryText}
            onChange={(e) => setEntryText(e.target.value)}
            placeholder="I am grateful for..."
            required
          />
        </div>
        <button type="submit">Save Entry</button>
      </form>

      {message && <p className={`message ${messageType}`}>{message}</p>}
    </div>
  );
}
