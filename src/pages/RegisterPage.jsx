import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, UserPlus, Mail, Lock, User } from 'lucide-react';
import useAuth from '../context/useAuth';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      register(form);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-hero">
        <div className="auth-brand">Techlance Solutions</div>
        <h1>Create your account and access the website</h1>
        <p>
          Register once, then log in with the same details whenever you return. The site opens automatically after successful signup.
        </p>
        <div className="auth-points">
          <div><UserPlus size={18} /> One-time registration</div>
          <div><CheckCircle2 size={18} /> Immediate access after sign up</div>
        </div>
      </div>

      <div className="auth-card">
        <div className="auth-card-header">
          <span className="auth-kicker">Get started</span>
          <h2>Register</h2>
          <p>Set up your login details in a few seconds.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span><User size={16} /> Full name</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Your name"
              autoComplete="name"
              required
            />
          </label>

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
              placeholder="Minimum 6 characters"
              autoComplete="new-password"
              required
            />
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Register and open website'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login instead</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

