import React from 'react';

function ChallengeBanner() {
  const challenges = [
    '🚫 Avoid plastic for 3 days',
    '🌱 Plant something this weekend',
    '♻️ Recycle 5 items today',
    '🚶 Walk instead of drive for short trips',
  ];

  const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];

  return (
    <div style={{
      backgroundColor: '#e0f7fa',
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1rem',
      textAlign: 'center'
    }}>
      <h3>🏆 Community Challenge</h3>
      <p>{randomChallenge}</p>
      <button>Join Challenge</button>
    </div>
  );
}

export default ChallengeBanner;
