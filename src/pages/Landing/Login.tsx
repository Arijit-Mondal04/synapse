import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./Login.css";

const SignupModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { signup } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match!');
      return;
    }
    setLoading(true);
    try {
      await signup(email, password, role);
      alert(`Signed up as ${role} successfully!`);
      onClose();
    } catch {
      setError('Signup failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            disabled={loading}
          />
          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            disabled={loading}
          />
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} disabled={loading}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      // Redirect handled in routing
    } catch {
      setError('Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div className="landing-fullscreen-bg">
      <div className="landing-left">
        {/* SVG pattern */}
        <svg className="left-bg-pattern" width="100%" height="100%">
          <defs>
            <linearGradient id="bluegrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2196f3" />
              <stop offset="100%" stopColor="#0A2156" />
            </linearGradient>
          </defs>
          <circle cx="40%" cy="60%" r="260" fill="url(#bluegrad)" opacity="0.25" />
          <circle cx="70%" cy="35%" r="120" fill="url(#bluegrad)" opacity="0.18" />
          <circle cx="23%" cy="15%" r="110" fill="#1e3c72" opacity="0.25" />
        </svg>
        <div className="synapse-title-box">
          <h1 className="synapse-headline">SYNAPSE</h1>
          <div className="synapse-tagline">The smart document workflow platform</div>
        </div>
        <p>
          Effortlessly manage, share, and track your documents.<br />
          AI-driven productivity, seamless collaboration.<br />
          Experience the future of secure academic workflows.
        </p>
      </div>
      <div className="landing-right">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Sign in</h2>
          {error && <p className="error-msg">{error}</p>}
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
        <div className="signup-link">
          Don't have an account? <a href="#" onClick={() => setModalOpen(true)}>Sign up now</a>
        </div>
      </div>
      <SignupModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Login;
