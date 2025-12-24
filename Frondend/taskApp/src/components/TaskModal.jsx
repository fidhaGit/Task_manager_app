import { useState, useEffect } from "react";

export default function TaskModal({ isOpen, onClose, onSave, task }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
  });

  // ✅ Sync form ONLY when modal opens or task changes
  useEffect(() => {
    if (!isOpen) return;

    if (task) {
      setForm({
        title: task.title ?? "",
        description: task.description ?? "",
        priority: task.priority ?? "MEDIUM",
      });
    } else {
      // reset when adding new task
      setForm({
        title: "",
        description: "",
        priority: "MEDIUM",
      });
    }
  }, [isOpen, task]);

  if (!isOpen) return null;

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>{task ? "Edit Task" : "Add Task"}</h3>

        <form onSubmit={submit}>
          <input
            className="form-control mb-2"
            placeholder="Task title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
          />

          <textarea
            className="form-control mb-2"
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <select
            className="form-select mb-3"
            value={form.priority}
            onChange={(e) =>
              setForm({ ...form, priority: e.target.value })
            }
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {task ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
