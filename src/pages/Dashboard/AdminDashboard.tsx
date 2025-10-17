import React from "react";
import { getAuth, signOut } from "firebase/auth";
import "./AdminDashboard.css";

const AdminDashboard: React.FC = () => {
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
    <div className="admin-dashboard-bg">
      <aside className="admin-sidebar">
        <div className="admin-pic"></div>
        <div className="admin-name">Admin: Jordan Lee</div>
        <nav>
          <ul>
            <li className="active">Control Center</li>
            <li>User Management</li>
            <li>Analytics</li>
            <li>Audit Logs</li>
            <li>Settings</li>
            <li>
              <button onClick={handleLogout} className="admin-btn">
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="admin-main">
        <div className="admin-row">
          <div className="admin-card admin-stats">
            <div className="card-title">Active Users</div>
            <div className="big-stat admin-animate">249</div>
            <div className="stat-label">Logged In Today</div>
          </div>
          <div className="admin-card admin-usage">
            <div className="card-title">System Usage</div>
            <div className="usage-bar-bg">
              <div className="usage-bar" style={{ width: "78%" }}></div>
              <div className="usage-label admin-animate">78% usage</div>
            </div>
            <div className="stat-label">Document Activity</div>
          </div>
          <div className="admin-card admin-quicktools">
            <div className="card-title">Admin Quick Tools</div>
            <div className="tools-grid">
              <button className="admin-btn">New Announcement</button>
              <button className="admin-btn">Manage Roles</button>
              <button className="admin-btn">Run Audit</button>
            </div>
          </div>
        </div>
        <div className="admin-row">
          <div className="admin-card user-overview">
            <div className="card-title">User Overview</div>
            <div className="overview-flex">
              <div>
                <span className="overview-num">163</span>
                <div className="overview-label">Students</div>
              </div>
              <div>
                <span className="overview-num">61</span>
                <div className="overview-label">Faculty</div>
              </div>
              <div>
                <span className="overview-num green">25</span>
                <div className="overview-label">Staff</div>
              </div>
            </div>
          </div>
          <div className="admin-card admin-activity">
            <div className="card-title">Recent System Events</div>
            <ul className="event-list">
              <li>
                <span className="event-title">User Role Changed</span>
                <span className="event-type blue">Critical</span>
              </li>
              <li>
                <span className="event-title">System Backup Completed</span>
                <span className="event-type green">Success</span>
              </li>
              <li>
                <span className="event-title">Password Reset Requested</span>
                <span className="event-type yellow">Notification</span>
              </li>
              <li>
                <span className="event-title">File Removed</span>
                <span className="event-type red">Warning</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
