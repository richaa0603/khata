import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const cards = [
    {
      name: "Arsh",
      avatar: "/arsh.jpg",
      route: "/arsh",
    },
    {
      name: "Sonali",
      avatar: "/sonali.jpg",
      route: "/sonali",
    },
  ];

  return (
    <div className="landing-page">
      <div className="overlay">
        <h1>Choose Your Profile</h1>

        <div className="profile-grid">
          {cards.map((user) => (
            <div key={user.name} className="profile-card">
              <img
                src={user.avatar}
                alt={user.name}
                className="profile-avatar"
              />

              <button
                className="continue-btn"
                onClick={() => navigate(user.route)}
              >
                Continue
              </button>

              <div className="quick-links">
                <button
                  className="link-btn"
                  onClick={() => navigate(`${user.route}/history`)}
                >
                  History
                </button>

                <button
                  className="link-btn"
                  onClick={() => navigate(`${user.route}/manage`)}
                >
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}