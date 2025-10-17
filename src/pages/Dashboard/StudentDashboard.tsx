import React from "react";
import "./StudentDashboard.css";

const StudentDashboard: React.FC = () => {
  return (
    <div className="student-dashboard-bg">
      <aside className="student-sidebar">
        <div className="profile-pic"></div>
        <div className="student-name">Kim Paul</div>
        <nav>
          <ul>
            <li className="active">Dashboard</li>
            <li>My Documents</li>
            <li>Assigned Tasks</li>
            <li>AI Suggestions</li>
            <li>Settings</li>
            <li>Logout</li>
          </ul>
        </nav>
      </aside>
      <main className="student-main">
        <div className="dashboard-row">
          <div className="dashboard-card dashboard-circle">
            <div className="card-title">Personal Progress</div>
            <div className="fake-pie animate">
              {/* Simulated donut chart */}
              <div className="pie-inner">
                <span>82%</span>
              </div>
            </div>
            <div className="progress-label">Synapse Document Completion</div>
          </div>

          <div className="dashboard-card dashboard-actions">
            <div className="card-title">Quick Actions</div>
            <div className="actions-grid">
              <button className="action-btn">Upload Doc</button>
              <button className="action-btn">Track Status</button>
              <button className="action-btn">Ask AI</button>
              <button className="action-btn">Share</button>
            </div>
          </div>

          <div className="dashboard-card dashboard-chart">
            <div className="card-title">Monthly Documents</div>
            <div className="bar-chart animate">
              {/* Simulated bar chart */}
              {[60, 80, 40, 90, 55, 70, 68].map((val, i) => (
                <div className="bar" key={i} style={{height: `${val}%`}}>
                  <span className="bar-label">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="dashboard-row">
          <div className="dashboard-card dashboard-status">
            <div className="card-title">Pending Docs</div>
            <div className="big-num animate">5</div>
            <div className="progress-label">Awaiting Approval</div>
          </div>
          <div className="dashboard-card dashboard-status">
            <div className="card-title">Completed Docs</div>
            <div className="big-num animate green">27</div>
            <div className="progress-label">Approved This Month</div>
          </div>
          <div className="dashboard-card dashboard-status">
            <div className="card-title">AI Suggestions</div>
            <ul className="suggest-list">
              <li>Optimize Document Workflow</li>
              <li>Try Smart Tagging</li>
              <li>Bulk Upload Option</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
