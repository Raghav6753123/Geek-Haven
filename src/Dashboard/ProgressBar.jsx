import React from 'react';
import "./Dashboard.css"
const ProgressBar = ({ percent = 0, small }) => (
  <div className={`progress-bar${small ? ' progress-bar-small' : ''}`}>
    <div
      className="progress-bar-fill"
      style={{ width: `${percent}%` }}
    />
  </div>
);

export default ProgressBar;
