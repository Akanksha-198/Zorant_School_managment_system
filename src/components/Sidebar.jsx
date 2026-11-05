import { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, GraduationCap, Heart, LayoutDashboard, PanelLeftClose, Search, X } from 'lucide-react';
import { menuForRole } from '../data/menu.js';

const readFavs = () => {
  try { return JSON.parse(localStorage.getItem('sms_favs')) || []; } catch { return []; }
};

export default function Sidebar({ role, open, collapsed, onClose, onToggleCollapse }) {
  const { pathname } = useLocation();
  const groups = useMemo(() => menuForRole(role), [role]);
  const activeGroup = pathname.split('/')[2];
  const [openId, setOpenId] = useState(activeGroup || null);
  const [query, setQuery] = useState('');
  const [favs, setFavs] = useState(readFavs);

  useEffect(() => { if (activeGroup) setOpenId(activeGroup); }, [activeGroup]);
  useEffect(() => { localStorage.setItem('sms_favs', JSON.stringify(favs)); }, [favs]);

  const toggleFav = (key) =>
    setFavs((f) => (f.includes(key) ? f.filter((k) => k !== key) : [...f, key]));

  const q = query.trim().toLowerCase();
  const visible = groups
    .map((g) => ({
      ...g,
      children: q && !g.label.toLowerCase().includes(q)
        ? g.children.filter((c) => c.label.toLowerCase().includes(q))
        : g.children,
    }))
    .filter((g) => !q || g.children.length);

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`} aria-label="Main navigation">
      <div className="side-head">
        <span className="side-logo"><GraduationCap size={20} /></span>
        <span className="side-brand">Edu<b>Sphere</b></span>
        <button className="icon-btn side-close" onClick={onClose} aria-label="Close menu"><X size={20} /></button>
        <button className="icon-btn side-collapse" onClick={onToggleCollapse} aria-label="Collapse sidebar"><PanelLeftClose size={18} /></button>
      </div>

      <div className="side-search">
        <Search size={16} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search menu…" aria-label="Search menu" />
      </div>

      <nav className="side-nav">
        <NavLink end to="/dashboard" className="nav-top" title="Dashboard">
          <LayoutDashboard size={17} /><span className="lbl">Dashboard</span>
        </NavLink>

        {visible.map((g) => {
          const Icon = g.icon;
          const isOpen = q ? true : openId === g.id;
          return (
            <div key={g.id} className={`nav-group ${isOpen ? 'open' : ''} ${activeGroup === g.id ? 'active' : ''}`}>
              <button
                className="nav-head" title={g.label}
                onClick={() => setOpenId(isOpen ? null : g.id)}
                aria-expanded={isOpen}
              >
                <Icon size={17} />
                <span className="lbl">{g.label}</span>
                {g.isNew && <span className="new-tag">NEW</span>}
                <ChevronDown size={15} className="chev" />
              </button>
              <div className="nav-children" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                <ul>
                  {g.children.map((c) => {
                    const key = `${g.id}/${c.slug}`;
                    return (
                      <li key={key}>
                        <NavLink to={`/dashboard/${key}`} className="nav-link">{c.label}</NavLink>
                        <button
                          className={`fav ${favs.includes(key) ? 'on' : ''}`}
                          onClick={() => toggleFav(key)}
                          aria-label={`Favourite ${c.label}`}
                        >
                          <Heart size={14} fill={favs.includes(key) ? 'currentColor' : 'none'} />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
        {!visible.length && <p className="no-match">No menu matches “{query}”.</p>}
      </nav>
    </aside>
  );
}
