import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';
import { getUser, logout } from '../auth.js';

export default function Layout() {
  const user = getUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [drawer, setDrawer] = useState(false); // mobile drawer
  const [collapsed, setCollapsed] = useState(false); // desktop collapse
  const [theme, setTheme] = useState(() => localStorage.getItem('sms_theme') || 'light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('sms_theme', theme);
  }, [theme]);

  useEffect(() => setDrawer(false), [pathname]);

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`app-shell ${collapsed ? 'is-collapsed' : ''}`}>
      <Sidebar
        role={user.role}
        open={drawer}
        collapsed={collapsed}
        onClose={() => setDrawer(false)}
        onToggleCollapse={() => setCollapsed((c) => !c)}
      />
      {drawer && <div className="scrim" onClick={() => setDrawer(false)} />}
      <div className="app-main">
        <Topbar
          user={user}
          theme={theme}
          onTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
          onMenu={() => setDrawer(true)}
          onLogout={onLogout}
        />
        <div className="content">
          <Outlet context={{ user }} />
        </div>
      </div>
    </div>
  );
}
