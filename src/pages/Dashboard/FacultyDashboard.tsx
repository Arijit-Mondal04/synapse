import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./FacultyDashboard.css";

const analyticsData = [
  { label: "Jan", value: 58 },
  { label: "Feb", value: 85 },
  { label: "Mar", value: 42 },
  { label: "Apr", value: 73 },
  { label: "May", value: 90 },
];

const FacultyDashboard: React.FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <div className="faculty-dashboard-bg">
      <aside className="faculty-sidebar">
        <div className="faculty-pic"></div>
        <div className="faculty-name">Dr. Maya Verma</div>
        <nav>
          <ul>
            <li className="active">Overview</li>
            <li>Upload Materials</li>
            <li>Student Submissions</li>
            <li>Documents Approval</li>
            <li>Analytics</li>
            <li>
              <button className="faculty-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="faculty-main">
        <div className="faculty-row">
          <div className="faculty-card">
            <div className="card-title">📚 Upload Course Materials</div>
            <button
              className="faculty-btn accent-btn"
              onClick={() => navigate("/upload-document")}
            >
              Upload Materials
            </button>
            <div className="stat-label">
              Share syllabus, notes, lecture slides
            </div>
          </div>
          <div className="faculty-card">
            <div className="card-title">🧾 View Student Submissions</div>
            <button className="faculty-btn">View Submissions</button>
            <div className="stat-label">
              Access projects, reports, assignments
            </div>
          </div>
          <div className="faculty-card">
            <div className="card-title">🗃 Approve / Comment</div>
            <button className="faculty-btn">Approve/Comment</button>
            <div className="stat-label">
              Research or academic forms
            </div>
          </div>
        </div>
        <div className="faculty-row">
          <div className="faculty-card">
            <div className="card-title">🔍 Search &amp; Filter</div>
            <button className="faculty-btn secondary-btn">Search</button>
            <div className="stat-label">
              By student, subject or semester
            </div>
          </div>
          <div className="faculty-card analytics-card">
            <div className="card-title">📈 Analytics Overview</div>
            <div className="analytics-preview">
              <div className="analytics-chart-bg">
                {analyticsData.map((bar, idx) => (
                  <div
                    key={bar.label}
                    className="analytics-bar"
                    style={{
                      height: `${bar.value + 22}px`,
                      background:
                        idx === analyticsData.length - 1
                          ? "linear-gradient(120deg, #6dd5ed 50%, #2980b9 100%)"
                          : "linear-gradient(120deg, #2980b9 70%, #6dd5ed 100%)",
                    }}
                  >
                    <div className="analytics-bar-inner">
                      <span className="analytics-bar-value">{bar.value}</span>
                    </div>
                    <span className="analytics-bar-label">{bar.label}</span>
                  </div>
                ))}
              </div>
              <div className="stat-label">Monthly Submissions</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FacultyDashboard;
