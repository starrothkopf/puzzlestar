import React from 'react';

const RankProgressBar = ({ rank, score, maxScore }) => {
  const calculateWidth = (score, maxScore) => {

    const scaleFactor = 2; // logarithmic scale factor
    
    score = Math.max(0, Math.min(score, maxScore));
    
    const normalizedScore = score / maxScore;
    const logWidth = Math.log10(normalizedScore * scaleFactor + 1) / Math.log10(scaleFactor + 1);
    
    return `${logWidth * 100}%`;
  };

  return (
    <div className="rank-section">
      <p>{rank}</p>
      <div className="rankbar" style={{ width: calculateWidth(score, maxScore) }}></div>
    </div>
  );
};

export default RankProgressBar;