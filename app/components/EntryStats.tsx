const EntryStats = () => {
  return (
    <div className="stats stats-vertical bg-primary text-primary-content shadow sm:stats-horizontal">
      <div className="stat">
        <div className="stat-title">Total entries</div>
        <div className="stat-value">0</div>
        <div className="stat-desc">Add some thoughts!</div>
      </div>
      <div className="stat">
        <div className="stat-title">Weekly entries</div>
        <div className="stat-value">0</div>
        <div className="stat-desc">Add some thoughts!</div>
      </div>
      <div className="stat">
        <div className="stat-title">Monthly entries</div>
        <div className="stat-value">0</div>
        <div className="stat-desc">Add some thoughts!</div>
      </div>
    </div>
  );
};

export default EntryStats;
