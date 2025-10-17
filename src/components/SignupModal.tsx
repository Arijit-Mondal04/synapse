import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignupSuccess?: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, onSignupSuccess }) => {
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
      setLoading(false);
      if (onSignupSuccess) onSignupSuccess();
      onClose();
    } catch (err: any) {
        console.error("Signup error:", err);
      if (err.code) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            setError('Email already in use.');
            break;
          case 'auth/invalid-email':
            setError('Invalid email address.');
            break;
          case 'auth/weak-password':
            setError('Password is too weak.');
            break;
          default:
            setError(err.message || 'Signup failed. Please try again.');
        }
      } else {
        setError('Signup failed. Please try again.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoFocus
            disabled={loading}
          />
          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            required
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            disabled={loading}
          />
          <label>Role</label>
          <select value={role} onChange={e => setRole(e.target.value)} disabled={loading}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
          <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>Cancel</button>
        </form>
      </div>
    </div>
  );
}; 

export default SignupModal;
