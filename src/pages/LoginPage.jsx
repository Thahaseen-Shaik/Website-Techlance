import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Mail, Lock } from 'lucide-react';
import useAuth from '../context/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      login(form);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-hero">
        <div className="auth-brand">Techlance Solutions</div>
        <h1>Sign in to continue into the website</h1>
        <p>
          Use your registered email and password to access the full site. Your session stays on this device until you log out.
        </p>
        <div className="auth-points">
          <div><ShieldCheck size={18} /> Simple local authentication</div>
          <div><ArrowRight size={18} /> Redirects into the website after success</div>
        </div>
      </div>

      <div className="auth-card">
        <div className="auth-card-header">
          <span className="auth-kicker">Welcome back</span>
          <h2>Login</h2>
          <p>Enter your credentials to open the site.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span><Mail size={16} /> Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label>
            <span><Lock size={16} /> Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Login and open website'}
          </button>
        </form>

        <p className="auth-switch">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

