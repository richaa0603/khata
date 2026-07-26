import {
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

import "./WelcomePage.css";

export default function WelcomePage() {
  const navigate = useNavigate();

  const { user } = useParams();

  const { state } = useLocation();

  const shopkeeper =
    state?.shopkeeper;

  const username =
    user?.charAt(0).toUpperCase() +
    user?.slice(1);

  return (
    <div className="welcome-container">
      <div className="welcome-card">

        <div className="logged-in-user">
          👤 Logged in as{" "}
          <strong>{username}</strong>
        </div>

        <h2>Welcome, {username}</h2>

        <div className="stats-grid">

          <div className="stat-card">
            <h2>₹25,400</h2>
            <p>Today's Revenue</p>
          </div>

          <div className="stat-card">
            <h2>12</h2>
            <p>Bills Generated</p>
          </div>

          <div className="stat-card">
            <h2>20</h2>
            <p>Buyers</p>
          </div>

          <div className="stat-card">
            <h2>8</h2>
            <p>Products</p>
          </div>

        </div>

        <div className="action-buttons">

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/buyers", {
                state: {
                  shopkeeper,
                },
              })
            }
          >
            Start New Bill
          </button>

          <button
            className="secondary-btn"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Dashboard
          </button>

          <button
            className="secondary-btn"
            onClick={() =>
              navigate("/history")
            }
          >
            Invoice History
          </button>

          <button
            className="secondary-btn"
            onClick={() =>
              navigate("/settings")
            }
          >
            Settings
          </button>

        </div>

        <div className="recent-section">
          <h3>Recent Activity</h3>

          <div className="activity-row">
            KH-001 • Gupta Traders • ₹5,200
          </div>

          <div className="activity-row">
            KH-002 • Royal Sanitary • ₹8,700
          </div>

          <div className="activity-row">
            KH-003 • Om Enterprises • ₹3,450
          </div>
        </div>

      </div>
    </div>
  );
}