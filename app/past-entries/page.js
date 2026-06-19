"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

export default function PastEntriesPage() {
  const [allEntries, setAllEntries] = useState([]);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    const storedEntries = getGratitudeEntries();
    const sortedEntries = Object.entries(storedEntries)
      .map(([date, text]) => ({ date, text }))
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first
    setAllEntries(sortedEntries);
  };

  const handleDelete = (dateToDelete) => {
    if (confirm(`Are you sure you want to delete the entry for ${dateToDelete}?`)) {
      const storedEntries = getGratitudeEntries();
      const newEntries = { ...storedEntries };
      delete newEntries[dateToDelete];
      saveGratitudeEntries(newEntries);
      loadEntries(); // Reload entries after deletion
    }
  };

  const handleEdit = (dateToEdit) => {
    // For a simple app, we'll redirect to the 'today' page with the date.
    // In a more complex app, we might have an in-place editor or a dedicated edit page.
    // Since we only have 'today', we'll just log and suggest editing there.
    alert(
      `To edit the entry for ${dateToEdit}, please go to the "Today's Entry" page ` +
      `and select or manually enter that date (if implemented, for now only today's entry is easily editable).`
    );
    // A more advanced approach would be to navigate to /today?date=YYYY-MM-DD and pre-fill
    // But given the scope, this alert is acceptable for "simple".
  };

  return (
    <div className="glass-card">
      <h1>Past Entries</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        All your gratitude entries, from newest to oldest.
      </p>

      {allEntries.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>No entries yet. Start journaling on <Link href="/today">Today's Entry</Link>!</p>
      ) : (
        <div className="entry-list">
          {allEntries.map((entry) => (
            <div key={entry.date} className="entry-item">
              <div className="entry-header">
                <span className="entry-date">{entry.date}</span>
                <div className="entry-actions">
                  {/* <button onClick={() => handleEdit(entry.date)} className="button-secondary">Edit</button> */}
                  <button onClick={() => handleDelete(entry.date)} className="button-danger">Delete</button>
                </div>
              </div>
              <p className="entry-text">{entry.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
