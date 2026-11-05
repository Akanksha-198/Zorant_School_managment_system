import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Hammer } from 'lucide-react';
import { findModule } from '../data/menu.js';

// Placeholder page for every sidebar item. Replace per module as you build features.
export default function ModulePage() {
  const { pathname } = useLocation();
  const { group, child } = findModule(pathname);

  if (!group) {
    return (
      <div className="card module">
        <h2>Page not found</h2>
        <Link className="btn primary" to="/dashboard">Back to dashboard</Link>
      </div>
    );
  }

  const Icon = group.icon;
  return (
    <div className="dash">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/dashboard">Dashboard</Link><ChevronRight size={14} />
        <span>{group.label}</span>
        {child && <><ChevronRight size={14} /><b>{child.label}</b></>}
      </nav>

      <section className="card module">
        <span className="module-icon"><Icon size={30} /></span>
        <h2>{child ? child.label : group.label}</h2>
        <p className="muted">
          <Hammer size={14} /> This screen is ready to be built — wire it to your API when the backend is available.
        </p>
        <div className="chips">
          {group.children.map((c) => (
            <Link key={c.slug} to={`/dashboard/${group.id}/${c.slug}`} className={`chip ${c.slug === child?.slug ? 'on' : ''}`}>
              {c.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
