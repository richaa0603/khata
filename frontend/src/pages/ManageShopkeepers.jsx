import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ManageShopkeepers.css";

export default function ManageShopkeepers() {
  const navigate = useNavigate();

  const [shopkeepers, setShopkeepers] = useState([]);
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    loadShopkeepers();
  }, []);

  const loadShopkeepers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5228/api/shopkeepers"
      );

      setShopkeepers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addShopkeeper = async () => {
    if (!name.trim()) return;

    try {
      await axios.post(
        "http://localhost:5228/api/shopkeepers",
        {
          name,
          photoUrl,
        }
      );

      setName("");
      setPhotoUrl("");

      loadShopkeepers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="manage-page">
      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>

      <div className="page-header">
        <h1>Profile Settings</h1>

        <p>
          Manage who can access Khata Billing
        </p>
      </div>

      <div className="manage-content">

        <div className="profiles-panel">

          <div className="panel-header">
            <h2>Current Profiles</h2>

            <div className="stats-card">
              {shopkeepers.length} Active
            </div>
          </div>

          <div className="profiles-grid">
            {shopkeepers.map((shopkeeper) => (
              <div
                key={shopkeeper.id}
                className="profile-item"
              >
                <div className="profile-avatar">
                  {shopkeeper.name.charAt(0)}
                </div>

                <div className="profile-info">
                  <span>
                    {shopkeeper.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className="add-card">

          <h2>Add New Profile</h2>

          <label>Profile Name</label>

          <input
            placeholder="e.g. Arsh"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <label>Photo URL (Optional)</label>

          <input
            placeholder="Paste image URL"
            value={photoUrl}
            onChange={(e) =>
              setPhotoUrl(e.target.value)
            }
          />

          <button
            className="add-btn"
            onClick={addShopkeeper}
          >
            + Add Profile
          </button>

        </div>

      </div>
    </div>
  );
}
