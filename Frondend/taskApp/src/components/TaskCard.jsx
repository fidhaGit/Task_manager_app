export default function TaskCard({ task, onToggle, onDelete, onEdit }) {
  const priorityColor =
    task.priority === "HIGH"
      ? "bg-danger"
      : task.priority === "MEDIUM"
      ? "bg-primary"
      : "bg-secondary";

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">

        <h6
          className={`card-title ${
            task.status === "COMPLETED"
              ? "text-decoration-line-through text-muted"
              : ""
          }`}
        >
          {task.title}
        </h6>

        {task.description && (
          <p className="card-text text-muted small">
            {task.description}
          </p>
        )}

        {/* STATUS + PRIORITY */}
        <div className="mb-3 d-flex gap-2">
          <span
            className={`badge ${
              task.status === "COMPLETED"
                ? "bg-success"
                : "bg-warning text-dark"
            }`}
          >
            {task.status}
          </span>

          <span className={`badge ${priorityColor}`}>
            {task.priority}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="d-flex gap-2 mt-2">
          <button
            className="btn btn-sm btn-outline-success"
            onClick={() => onToggle(task)}
          >
            {task.status === "COMPLETED" ? "Undo" : "Complete"}
          </button>

          <button
            className="btn btn-sm btn-outline-primary"
            onClick={onEdit}
          >
            Edit
          </button>

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}
