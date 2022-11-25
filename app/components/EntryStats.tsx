interface Props {
  weekly: number;
  monthly: number;
  total: number;
}

const EntryStats = ({ weekly, monthly, total }: Props) => {
  return (
    <div className="stats stats-vertical bg-primary text-primary-content shadow sm:stats-horizontal">
      <div className="stat">
        <div className="stat-title">Weekly entries</div>
        <div className="stat-value">{weekly}</div>
      </div>
      <div className="stat">
        <div className="stat-title">Monthly entries</div>
        <div className="stat-value">{monthly}</div>
      </div>
      <div className="stat">
        <div className="stat-title">Total entries</div>
        <div className="stat-value">{total}</div>
      </div>
    </div>
  );
};

export default EntryStats;
