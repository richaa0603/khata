import { useState } from "react";

export default function Dashboard() {
  const [message, setMessage] = useState("Frontend Connected");

  const testApi = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/health");
      const data = await res.json();

      setMessage(data.message);
    } catch (err) {
      setMessage("Backend not running");
    }
  };

  return (
    <div className="dashboard">
      <h1>Project Dashboard</h1>

      <div className="card">
        <p>{message}</p>

        <button onClick={testApi}>
          Test Backend Connection
        </button>
      </div>
    </div>
  );
}