import { useEffect, useState } from "react";
import api from "../api/axios";
import TaskCard from "../components/TaskCard";
import ProgressBar from "../components/ProgressBar";
import TaskModal from "../components/TaskModal";
import ThemeToggle from "../components/ThemeToggle";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";

  /* ================= FETCH TASKS ================= */
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);

        const url =
          filter === "ALL" ? "tasks/" : `tasks/?status=${filter}`;

        const res = await api.get(url);
        setTasks(res.data.results || res.data);
        setError("");
      } catch {
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [filter]);

  /* ================= CALCULATE PROGRESS ================= */
  useEffect(() => {
    const total = tasks.length;
    const completed = tasks.filter(
      (t) => t.status === "COMPLETED"
    ).length;

    setProgress(
      total ? Math.round((completed / total) * 100) : 0
    );
  }, [tasks]);

  /* ================= FILTER + SEARCH ================= */
  const filteredTasks = tasks.filter((task) => {
    const text = `${task.title} ${task.description || ""}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const remaining = filteredTasks.filter(
    (t) => t.status !== "COMPLETED"
  ).length;

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container py-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-0">Hi, {username} </h4>
          <small className="text-muted">
            {remaining} tasks remaining
          </small>
        </div>

        <div className="d-flex gap-2">
          <ThemeToggle />
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="card shadow-sm mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div className="w-100 me-3">
            <h5 className="text-primary">Today Task Summary</h5>
            <p className="mb-2">Progress {progress}%</p>
            <ProgressBar percentage={progress} />
          </div>

          <button
            className="btn btn-primary btn-lg rounded-circle"
            onClick={() => setIsModalOpen(true)}
          >
            +
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FILTER TABS */}
      <div className="btn-group mb-4">
        {["ALL", "PENDING", "COMPLETED"].map((f) => (
          <button
            key={f}
            className={`btn ${
              filter === f
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setFilter(f)}
          >
            {f === "ALL" ? "All" : f === "PENDING" ? "Pending" : "Done"}
          </button>
        ))}
      </div>

      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" />
        </div>
      )}

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {/* TASK GRID */}
      <div className="row">
        {filteredTasks.map((task) => (
          <div key={task.id} className="col-md-4 mb-3">
            <TaskCard
              task={task}

              onToggle={async (t) => {
                const newStatus =
                  t.status === "COMPLETED"
                    ? "PENDING"
                    : "COMPLETED";

                await api.patch(`tasks/${t.id}/`, {
                  status: newStatus,
                });

                setTasks((prev) =>
                  prev.map((x) =>
                    x.id === t.id
                      ? { ...x, status: newStatus }
                      : x
                  )
                );
              }}

              onDelete={async (id) => {
                await api.delete(`tasks/${id}/`);
                setTasks((prev) =>
                  prev.filter((t) => t.id !== id)
                );
              }}

              onEdit={() => {
                setEditingTask(task);
                setIsModalOpen(true);
              }}
            />
          </div>
        ))}
      </div>

      {/* MODAL */}
      <TaskModal
        isOpen={isModalOpen}
        task={editingTask}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={async (data) => {
          if (editingTask) {
            const res = await api.patch(
              `tasks/${editingTask.id}/`,
              data
            );

            setTasks((prev) =>
              prev.map((t) =>
                t.id === editingTask.id ? res.data : t
              )
            );
          } else {
            const res = await api.post("tasks/", data);
            setTasks((prev) => [res.data, ...prev]);
          }

          setIsModalOpen(false);
          setEditingTask(null);
        }}
      />
    </div>
  );
}
