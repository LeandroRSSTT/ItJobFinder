import React from 'react';

const Stats = ({ totalJobs, newJobs }) => {
  return (
    <div className="stats shadow flex justify-center mx-auto w-full md:w-1/3">
      <div className="stat bg-primary text-primary-content">
        <div className="stat-figure">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h4v10H3V7zm5 12h4V7h-4v12zm5 0h4V7h-4v12z"></path>
          </svg>
        </div>
        <div className="stat-title">Total Jobs</div>
        <div className="stat-value">{totalJobs}</div>
      </div>

    
      <div className="stat bg-primary text-primary-content">
        <div className="stat-figure">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zm3 2v4h4V6H8zm6 0v4h4V6h-4z"></path>
          </svg>
        </div>
        <div className="stat-title">Jobs This Week</div>
        <div className="stat-value">{newJobs}</div>
      </div>
    </div>
  );
};

export default Stats;
