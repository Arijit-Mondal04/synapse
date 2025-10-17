import React from "react";
import { getAuth, signOut } from "firebase/auth";
import "./FacultyDashboard.css";

const FacultyDashboard: React.FC = () => {
  const auth = getAuth();

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
            <li>Review Documents</li>
            <li>AI Insights</li>
            <li>Delegated Tasks</li>
            <li>Settings</li>
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
          <div className="faculty-card vertical-progress">
            <div className="card-title">Documents to Review</div>
            <div className="progress-bar-bg">
              <div className="progress-bar" style={{ height: "75%" }}></div>
              <div className="progress-label faculty-animate">15 Pending</div>
            </div>
          </div>
          <div className="faculty-card approvals">
            <div className="card-title">Approval Stats</div>
            <div className="stats-flex">
              <div>
                <span className="big-stat green">32</span>
                <div className="stat-label">Approved</div>
              </div>
              <div>
                <span className="big-stat red">4</span>
                <div className="stat-label">Declined</div>
              </div>
              <div>
                <span className="big-stat blue">5</span>
                <div className="stat-label">Flagged</div>
              </div>
            </div>
          </div>
          <div className="faculty-card quick-actions">
            <div className="card-title">Quick Actions</div>
            <div className="actions-col">
              <button className="faculty-btn">Approve Selected</button>
              <button className="faculty-btn">Request Revision</button>
              <button className="faculty-btn">Contact Student</button>
            </div>
          </div>
        </div>
        <div className="faculty-row">
          <div className="faculty-card doc-review-list">
            <div className="card-title">Recent Submissions</div>
            <ul className="doc-list">
              <li>
                <span className="doc-title">Research Report.pdf</span>
                <span className="doc-status pending">Pending</span>
              </li>
              <li>
                <span className="doc-title">Assignment_3.docx</span>
                <span className="doc-status approved">Approved</span>
              </li>
              <li>
                <span className="doc-title">LabResult.xlsx</span>
                <span className="doc-status flagged">Flagged</span>
              </li>
              <li>
                <span className="doc-title">ThesisDraft.pdf</span>
                <span className="doc-status revision">Revision</span>
              </li>
            </ul>
          </div>
          <div className="faculty-card ai-insights">
            <div className="card-title">AI Workflow Tips</div>
            <ul>
              <li>Auto-route urgent documents</li>
              <li>Use batch approval mode</li>
              <li>Try the feedback summary tool</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FacultyDashboard;
