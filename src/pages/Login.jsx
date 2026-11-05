import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  AlertCircle, ArrowRight, Eye, EyeOff, GraduationCap, KeyRound,
  Loader2, ShieldCheck, UserRound, ChevronDown,
} from 'lucide-react';
import HeroIllustration from '../components/HeroIllustration.jsx';
import { ROLES, getUser, login } from '../auth.js';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState(false);

  if (getUser()) return <Navigate to="/dashboard" replace />;

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!role) return setError('Please select your role.');
    if (!username.trim()) return setError('Please enter your username.');
    if (password.length < 3) return setError('Please enter your password.');
    setLoading(true);
    // Demo only: no database. Any credentials are accepted.
    setTimeout(() => {
      login({ username: username.trim(), role });
      navigate('/dashboard');
    }, 700);
  };

  return (
    <div className="login-page">
      <span className="blob b1" />
      <span className="blob b2" />
      <span className="blob b3" />

      <div className="login-card">
        <aside className="login-hero">
          <HeroIllustration />
          <div className="hero-overlay">
            <span className="hero-chip"><ShieldCheck size={14} /> Secure school portal</span>
            <h2>Learning that takes your school <em>higher</em>.</h2>
            <p>Admissions, attendance, exams, library and accounts — all in one place.</p>
          </div>
        </aside>

        <main className="login-form-wrap">
          <div className="brand">
            <span className="brand-mark"><GraduationCap size={26} /></span>
            <span className="brand-name">Edu<b>Sphere</b></span>
          </div>

          <h1>Welcome back</h1>
          <p className="sub">Sign in to continue to your dashboard</p>

          {forgot ? (
            <div className="forgot-box">
              <KeyRound size={22} />
              <p>Password reset is not connected yet (no database in this build). Contact your school admin.</p>
              <button type="button" className="btn ghost" onClick={() => setForgot(false)}>Back to login</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <label className="field">
                <span>Login as</span>
                <div className="control select">
                  <ShieldCheck size={18} />
                  <select value={role} onChange={(e) => setRole(e.target.value)} aria-label="Select role">
                    <option value="" disabled>Select role…</option>
                    {ROLES.map((r) => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="chev" />
                </div>
              </label>

              <label className="field">
                <span>Username</span>
                <div className="control">
                  <UserRound size={18} />
                  <input
                    type="text" value={username} autoComplete="username"
                    onChange={(e) => setUsername(e.target.value)} placeholder="Enter username"
                  />
                </div>
              </label>

              <label className="field">
                <span>Password</span>
                <div className="control">
                  <KeyRound size={18} />
                  <input
                    type={showPw ? 'text' : 'password'} value={password} autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)} placeholder="Password here…"
                  />
                  <button type="button" className="eye" onClick={() => setShowPw((s) => !s)} aria-label="Toggle password">
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>

              {error && <div className="form-error" role="alert"><AlertCircle size={16} /> {error}</div>}

              <div className="actions">
                <button type="button" className="btn ghost" onClick={() => setForgot(true)}>Forgot Password</button>
                <button type="submit" className="btn primary" disabled={loading}>
                  {loading ? <><Loader2 size={18} className="spin" /> Signing in…</> : <>Login to Dashboard <ArrowRight size={18} /></>}
                </button>
              </div>
            </form>
          )}

          <footer className="login-foot">
            <span>© 2026 EduSphere</span>
            <span>Need help? support@edusphere.example</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
