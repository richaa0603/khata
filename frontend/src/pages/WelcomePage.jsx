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

  const shopkeeper = state?.shopkeeper;

  const username =
    user?.charAt(0).toUpperCase() +
    user?.slice(1);

  return (
    <div className="welcome-container">

      <h1 className="welcome-title">
        Welcome, {username}
      </h1>

      <div className="welcome-content">

        <img
  src="/welcome.jpg"
  alt="Welcome"
  className="welcome-image"
/>
        <div className="button-section">

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/buyers", {
                state: { shopkeeper },
              })
            }
          >
            Start New Bill
          </button>

          <button
            className="secondary-btn"
            onClick={() =>
              navigate(
                `/shopkeeper/${shopkeeper?.id}/history`
              )
            }
          >
            Invoice History
          </button>

        </div>

      </div>

    </div>
  );
}