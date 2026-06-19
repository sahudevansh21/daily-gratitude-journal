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

function formatDate(date) {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

export default function CalendarViewPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [entries, setEntries] = useState({});
  const [selectedDayEntry, setSelectedDayEntry] = useState(null);

  useEffect(() => {
    setEntries(getGratitudeEntries());
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const todayFormatted = formatDate(new Date());

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const numDaysInMonth = lastDayOfMonth.getDate();
  const startDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday

  const days = [];
  // Add leading empty days
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null);
  }

  // Add days of the month
  for (let i = 1; i <= numDaysInMonth; i++) {
    const dayDate = new Date(year, month, i);
    days.push(dayDate);
  }

  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setSelectedDayEntry(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setSelectedDayEntry(null);
  };

  const handleDayClick = (day) => {
    if (day) {
      const formattedDay = formatDate(day);
      setSelectedDayEntry({ date: formattedDay, text: entries[formattedDay] || 'No entry for this day.' });
    }
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="glass-card">
      <h1>Calendar View</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Browse your past gratitude entries by date.
      </p>

      <div className="calendar-header">
        <button className="button-secondary" onClick={goToPreviousMonth}>&lt; Previous</button>
        <h2>{monthNames[month]} {year}</h2>
        <button className="button-secondary" onClick={goToNextMonth}>Next &gt;</button>
      </div>

      <div className="calendar-grid">
        {dayNames.map(name => (
          <div key={name} className="calendar-day-name">{name}</div>
        ))}
        {days.map((day, index) => {
          const formattedDay = day ? formatDate(day) : null;
          const hasEntry = formattedDay && entries[formattedDay];
          const isCurrentDay = formattedDay === todayFormatted;
          const dayClasses = [
            'calendar-day',
            !day ? 'inactive' : '',
            hasEntry ? 'has-entry' : '',
            isCurrentDay ? 'current-day' : ''
          ].filter(Boolean).join(' ');

          return (
            <div
              key={index}
              className={dayClasses}
              onClick={() => handleDayClick(day)}
            >
              {day ? day.getDate() : ''}
            </div>
          );
        })}
      </div>

      {selectedDayEntry && (
        <div className="calendar-entry-display glass-card" style={{ marginTop: '2rem' }}>
          <h3>Entry for {selectedDayEntry.date}</h3>
          <p className="entry-text">{selectedDayEntry.text}</p>
        </div>
      )}
    </div>
  );
}
