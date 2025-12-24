export default function ProgressBar({ percentage }) {
  return (
    <div className="mb-2">
      <div className="progress" style={{ height: "10px" }}>
        <div
          className="progress-bar bg-primary"
          role="progressbar"
          style={{ width: `${percentage}%` }}
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
      <small className="text-muted">
        {percentage}% completed
      </small>
    </div>
  );
}
