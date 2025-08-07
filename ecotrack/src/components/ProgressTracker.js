import React from 'react';

function ProgressTracker({ logs }) {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const weeklyLogs = logs.filter((log) => {
    const logDate = new Date(log.timestamp);
    return logDate >= oneWeekAgo;
  });

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>🧭 Weekly Progress</h3>
      <p>You’ve logged <strong>{weeklyLogs.length}</strong> eco-friendly habits this week!</p>
    </div>
  );
}

export default ProgressTracker;
