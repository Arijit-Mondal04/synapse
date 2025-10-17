import React from "react";
import "./StaffDashboard.css";

const StaffDashboard: React.FC = () => {
  return (
    <div className="staff-dashboard-bg">
      <aside className="staff-sidebar">
        <div className="staff-pic"></div>
        <div className="staff-name">Alex Taylor</div>
        <nav>
          <ul>
            <li className="active">System Panel</li>
            <li>Support Tickets</li>
            <li>User Requests</li>
            <li>Maintenance</li>
            <li>Settings</li>
            <li>Logout</li>
          </ul>
        </nav>
      </aside>
      <main className="staff-main">
        <div className="staff-row">
          <div className="staff-card system-status">
            <div className="card-title">System Status</div>
            <div className="status-group">
              <div>
                <span className="stat-icon online"></span>
                <span className="stat-label">Online</span>
              </div>
              <div>
                <span className="stat-icon maintenance"></span>
                <span className="stat-label">Maintenance: 2</span>
              </div>
              <div>
                <span className="stat-icon warning"></span>
                <span className="stat-label">Warnings: 1</span>
              </div>
            </div>
          </div>
          <div className="staff-card support-overview">
            <div className="card-title">Support Overview</div>
            <div className="overview-flex">
              <div>
                <span className="big-num blue">12</span>
                <div className="overview-label">Active Tickets</div>
              </div>
              <div>
                <span className="big-num green">34</span>
                <div className="overview-label">Resolved Today</div>
              </div>
            </div>
          </div>
          <div className="staff-card staff-quicklinks">
            <div className="card-title">Quick Links</div>
            <div className="links-col">
              <button className="staff-btn">Add User</button>
              <button className="staff-btn">Schedule Maintenance</button>
              <button className="staff-btn">View System Log</button>
            </div>
          </div>
        </div>
        <div className="staff-row">
          <div className="staff-card support-list">
            <div className="card-title">Recent Support Requests</div>
            <ul className="ticket-list">
              <li>
                <span className="ticket-title">Password Reset</span>
                <span className="ticket-status open">Open</span>
              </li>
              <li>
                <span className="ticket-title">Access Issue</span>
                <span className="ticket-status closed">Closed</span>
              </li>
              <li>
                <span className="ticket-title">System Bug Report</span>
                <span className="ticket-status inprogress">In Progress</span>
              </li>
              <li>
                <span className="ticket-title">Account Approval</span>
                <span className="ticket-status resolved">Resolved</span>
              </li>
            </ul>
          </div>
          <div className="staff-card admin-tips">
            <div className="card-title">Admin Tips</div>
            <ul>
              <li>Monitor scheduled tasks daily</li>
              <li>Check user feedback dashboard</li>
              <li>Enable automated backup</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
