import { useEffect, useRef, useState } from 'react';
import { Bell, LogOut, Menu, Moon, Sun } from 'lucide-react';
import { roleLabel } from '../auth.js';

export default function Topbar({ user, theme, onTheme, onMenu, onLogout }) {
  const [openMenu, setOpenMenu] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpenMenu(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const initials = user.username.slice(0, 2).toUpperCase();

  return (
    <header className="topbar">
      <button className="icon-btn menu-btn" onClick={onMenu} aria-label="Open menu"><Menu size={22} /></button>
      <div className="school">
        <span className="school-crest">E</span>
        <div>
          <h1>Our School</h1>
          <small>{roleLabel(user.role)} portal</small>
        </div>
      </div>

      <div className="top-actions">
        <button className="icon-btn" onClick={onTheme} aria-label="Toggle theme">
          {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
        </button>
        <button className="icon-btn bell" aria-label="Notifications"><Bell size={19} /><i /></button>
        <div className="user" ref={ref}>
          <button className="avatar" onClick={() => setOpenMenu((o) => !o)} aria-label="User menu">{initials}</button>
          {openMenu && (
            <div className="user-pop">
              <strong>{user.username}</strong>
              <small>{roleLabel(user.role)}</small>
              <button onClick={onLogout}><LogOut size={16} /> Log out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
