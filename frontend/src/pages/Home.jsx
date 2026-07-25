import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getShopkeepers } from "../services/shopkeeperService";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const [shopkeepers, setShopkeepers] = useState([]);

  useEffect(() => {
    loadShopkeepers();
  }, []);

  const loadShopkeepers = async () => {
    try {
      const data = await getShopkeepers();
      setShopkeepers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAvatar = (name) => {
    switch (name.toLowerCase()) {
      case "arsh":
        return "/arsh.jpg";
      case "sonali":
        return "/sonali.jpg";
      default:
        return "/default-user.png";
    }
  };

  return (
    <div className="landing-page">
      <div className="overlay">
        <h1>Choose Your Profile</h1>

        <div className="profile-grid">
          {shopkeepers.map((shopkeeper) => (
            <div
              key={shopkeeper.id}
              className="profile-card"
            >
              <img
                src={getAvatar(shopkeeper.name)}
                alt={shopkeeper.name}
                className="profile-avatar"
              />

              <h2 className="profile-name">
                {shopkeeper.name}
              </h2>

              <button
                className="continue-btn"
                onClick={() =>
                  navigate(
                    `/${shopkeeper.name.toLowerCase()}`
                  )
                }
              >
                Continue
              </button>

              <div className="quick-links">
                <button
                  className="link-btn"
                  onClick={() =>
                    navigate(
                      `/${shopkeeper.name.toLowerCase()}/history`
                    )
                  }
                >
                  History
                </button>

                <button
                  className="link-btn"
                  onClick={() =>
                    navigate(
                      `/${shopkeeper.name.toLowerCase()}/manage`
                    )
                  }
                >
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="manage-profile-link">
  <button
    onClick={() =>
      navigate("/manage-shopkeepers")
    }
  >
    ⚙ Manage Profiles
  </button>
</div>
    </div>
  );
}