import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import this for navigation!
import "./StudentDashboard.css";

const uploadActivityData = {
  labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  data: [8, 12, 5, 15, 9, 11],
};
const maxUploads = Math.max(...uploadActivityData.data);

const mainFeatures = [
  { icon: "📤", title: "Upload Documents", description: "Submit your Marksheets, Certificates, and Leave forms." },
  { icon: "📑", title: "My Documents", description: "View, download, or delete your previously uploaded files." },
  { icon: "🔍", title: "Search Documents", description: "Find files by title, tags, or content using OCR search." },
  { icon: "🧾", title: "Request Forms", description: "Apply for a Transcript, Bonafide Certificate, or Leave approval." },
  { icon: "📬", title: "Request Status", description: "Track the approval progress of your submitted requests." },
  { icon: "🔔", title: "Notifications", description: "Get alerts when your documents are approved or rejected." },
];

const StudentDashboard: React.FC = () => {
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

  // Only new: handler for grid feature card!
  const handleFeatureCardClick = (featureTitle: string) => {
    if (featureTitle === "Upload Documents") {
      navigate("/upload-document-students");
    }
  };

  return (
    <div className="student-dashboard-bg">
      <aside className="student-sidebar">
        <div className="profile-pic"></div>
        <div className="student-name">Kim Paul</div>
        <nav>
          <ul>
            <li className="active">Dashboard</li>
            <li>My Documents</li>
            <li>Request Status</li>
            <li>Notifications</li>
            <li>Profile</li>
            <li>Settings</li>
            <li onClick={handleLogout} style={{ cursor: "pointer", color: "#e53935" }}>
              Logout
            </li>
          </ul>
        </nav>
      </aside>

      <main className="student-main">
        {/* --- ANALYTICS BANNER --- */}
        <div className="analytics-banner">
          <div className="analytic-module">
            <div className="donut-chart-container">
              <div className="donut-chart">
                <div className="donut-center">
                  <span className="donut-pending-count">3</span>
                  <span className="donut-pending-label">Pending</span>
                </div>
              </div>
            </div>
            <div className="analytic-text">
              <h3 className="analytic-title">Request Status</h3>
              <p className="analytic-description">75% Approved</p>
            </div>
          </div>
          <div className="analytic-divider"></div>
          <div className="analytic-module">
            <div className="mini-bar-chart">
              {uploadActivityData.data.map((value, index) => (
                <div className="bar-group" key={index}>
                  <div className="bar" style={{ height: `${(value / maxUploads) * 100}%` }}></div>
                </div>
              ))}
            </div>
            <div className="analytic-text">
              <h3 className="analytic-title">Upload Activity</h3>
              <p className="analytic-description">Last 6 Months</p>
            </div>
          </div>
          <div className="analytic-divider"></div>
          <div className="analytic-module">
            <div className="kpi-content">
              <span className="kpi-number">3.5</span>
              <span className="kpi-label">Days</span>
            </div>
            <div className="analytic-text">
              <h3 className="analytic-title">Avg. Approval</h3>
              <p className="analytic-description">Business Days</p>
            </div>
          </div>
        </div>
        {/* --- END OF ANALYTICS BANNER --- */}

        <div className="features-grid">
          {mainFeatures.map((feature, index) => (
            <div
              className="feature-card"
              key={index}
              style={{ animationDelay: `${index * 0.07}s`, cursor: feature.title === "Upload Documents" ? "pointer" : "default" }}
              onClick={() => handleFeatureCardClick(feature.title)}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
