import React, { useState, useEffect } from 'react';

function WasteLogger() {
  const [habit, setHabit] = useState('');
  const [category, setCategory] = useState('recyclable');
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedLogs = JSON.parse(localStorage.getItem('wasteLogs')) || [];
    setLogs(savedLogs);
  }, []);

  useEffect(() => {
    localStorage.setItem('wasteLogs', JSON.stringify(logs));
  }, [logs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (habit.trim()) {
      const newLog = {
        habit,
        category,
        timestamp: new Date().toLocaleString(),
      };
      setLogs([newLog, ...logs]);
      setHabit('');
      setCategory('recyclable');
    }
  };

  const filteredLogs =
    filter === 'all' ? logs : logs.filter((log) => log.category === filter);

  return (
    <div>
      <h2>Log Your Eco-Friendly Habit</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
          placeholder="e.g., Composted food scraps"
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="recyclable">♻️ Recyclable</option>
          <option value="compostable">🌿 Compostable</option>
          <option value="landfill">🗑️ Landfill</option>
        </select>
        <button type="submit">Log Habit</button>
      </form>

      <h3>Filter by Category</h3>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">🌍 All</option>
        <option value="recyclable">♻️ Recyclable</option>
        <option value="compostable">🌿 Compostable</option>
        <option value="landfill">🗑️ Landfill</option>
      </select>

      <ul>
        {filteredLogs.map((entry, index) => (
          <li key={index}>
            <strong>{entry.habit}</strong> — {entry.category} <br />
            <small>{entry.timestamp}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WasteLogger;
