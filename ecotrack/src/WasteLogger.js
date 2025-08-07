import React, { useState, useEffect } from 'react';
import CategoryChart from './components/CategoryChart';
import ProgressTracker from './components/ProgressTracker';
import ChallengeBanner from './components/ChallengeBanner';

export default function WasteLogger() {
  const [habit, setHabit] = useState('');
  const [category, setCategory] = useState('recyclable');
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('all');

  // ✅ Safe loading from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('wasteLogs');
      const saved = raw ? JSON.parse(raw) : [];
      setLogs(Array.isArray(saved) ? saved : []);
    } catch (error) {
      console.error('Failed to parse logs from localStorage:', error);
      setLogs([]);
    }
  }, []);

  // ✅ Safe saving to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wasteLogs', JSON.stringify(logs));
    } catch (error) {
      console.error('Failed to save logs:', error);
    }
  }, [logs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!habit.trim()) return;

    const newLog = {
      habit,
      category,
      timestamp: new Date().toISOString()
    };

    setLogs((prev) => [newLog, ...prev]);
    setHabit('');
    setCategory('recyclable');
  };

  const handleClearLogs = () => {
    if (window.confirm('Clear all logs?')) {
      setLogs([]);
      localStorage.removeItem('wasteLogs');
    }
  };

  const filteredLogs = filter === 'all'
    ? logs
    : logs.filter((entry) => entry.category === filter);

  return (
    <div>
      <ChallengeBanner />

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

      <button onClick={handleClearLogs} style={{ marginTop: '1rem' }}>
        🧼 Clear All Logs
      </button>

      <ul>
        {filteredLogs.map((entry, idx) => (
          <li key={idx}>
            <strong>{entry.habit}</strong> — {entry.category}
            <br />
            <small>{new Date(entry.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>

      <CategoryChart logs={filteredLogs} />
      <ProgressTracker logs={filteredLogs} />
    </div>
  );
}
