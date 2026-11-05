import { Link, useOutletContext } from 'react-router-dom';
import {
  BookOpen, CalendarDays, ClipboardCheck, GraduationCap, Megaphone, MessageSquareText,
  UserPlus, Users, Wallet, Library, TrendingUp, FileText,
} from 'lucide-react';
import StrengthChart from '../components/StrengthChart.jsx';
import { roleLabel } from '../auth.js';

const STAFF_STATS = [
  { label: 'Students Count', value: 220, icon: GraduationCap, cls: 'pink' },
  { label: 'Staff Strength', value: 55, icon: Users, cls: 'orange' },
  { label: 'Student Additions (CY)', value: 74, icon: UserPlus, cls: 'violet' },
  { label: 'Staff Additions (CY)', value: 12, icon: TrendingUp, cls: 'blue' },
];
const ROLE_STATS = {
  student: [
    { label: 'My Attendance', value: '94%', icon: ClipboardCheck, cls: 'pink' },
    { label: 'Pending Homework', value: 3, icon: BookOpen, cls: 'orange' },
    { label: 'Books Borrowed', value: 2, icon: Library, cls: 'violet' },
    { label: 'Upcoming Exams', value: 4, icon: FileText, cls: 'blue' },
  ],
  teacher: [
    { label: 'My Classes Today', value: 5, icon: BookOpen, cls: 'pink' },
    { label: 'Students Present', value: '38/42', icon: Users, cls: 'orange' },
    { label: 'Assignments to Grade', value: 17, icon: FileText, cls: 'violet' },
    { label: 'Leave Balance', value: 8, icon: CalendarDays, cls: 'blue' },
  ],
  guardian: [
    { label: 'Child Attendance', value: '96%', icon: ClipboardCheck, cls: 'pink' },
    { label: 'Fees Due', value: '₹0', icon: Wallet, cls: 'orange' },
    { label: 'New Messages', value: 2, icon: MessageSquareText, cls: 'violet' },
    { label: 'Upcoming Events', value: 3, icon: CalendarDays, cls: 'blue' },
  ],
};

const ATTENDANCE = [
  { label: 'Stud Attendance (Today)', value: 0, cls: 'a-blue' },
  { label: 'Stud Attendance (This wk)', value: 0, cls: 'a-green' },
  { label: 'Staff Attendance (Today)', value: 0, cls: 'a-red' },
  { label: 'Staff Attendance (This Wk)', value: 0, cls: 'a-orange' },
];

const QUICK = [
  { label: 'Admission', to: 'admission/new-enquiry', icon: UserPlus },
  { label: 'Attendance', to: 'attendance/mark-attendance', icon: ClipboardCheck },
  { label: 'Exams', to: 'exam/exam-schedule', icon: FileText },
  { label: 'Library', to: 'library/book-catalogue', icon: Library },
  { label: 'Account', to: 'account/my-profile', icon: Wallet },
  { label: 'Notices', to: 'school-updates/notice-board', icon: Megaphone },
];

const NOTICES = [
  { t: 'Annual Day rehearsals begin', d: '05 Nov', tag: 'Event' },
  { t: 'Unit Test II timetable published', d: '04 Nov', tag: 'Exam' },
  { t: 'Library new arrivals — 120 books', d: '02 Nov', tag: 'Library' },
  { t: 'Parent–Teacher meeting on Saturday', d: '01 Nov', tag: 'Notice' },
];

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
};

export default function Dashboard() {
  const { user } = useOutletContext();
  const isStaff = user.role === 'admin' || user.role === 'management';
  const stats = isStaff ? STAFF_STATS : ROLE_STATS[user.role];

  return (
    <div className="dash">
      <section className="welcome">
        <div>
          <p className="eyebrow">Current Academic Year · <b>2026–2027</b></p>
          <h2>{greeting()}, <span>{user.username}</span> 👋</h2>
          <p className="muted">Signed in as {roleLabel(user.role)}. Here’s what’s happening at school today.</p>
        </div>
        <div className="welcome-date">
          <CalendarDays size={18} />
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </section>

      <section className="stat-grid">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <article key={s.label} className={`stat ${s.cls}`} style={{ animationDelay: `${i * 70}ms` }}>
              <div><small>{s.label}</small><strong>{s.value}</strong></div>
              <Icon size={34} />
            </article>
          );
        })}
      </section>

      <section className="quick">
        {QUICK.map((q) => {
          const Icon = q.icon;
          return (
            <Link key={q.label} to={`/dashboard/${q.to}`} className="quick-item">
              <span><Icon size={20} /></span>{q.label}
            </Link>
          );
        })}
      </section>

      <section className="grid-2">
        <article className="card sms">
          <h3>SMS Usage</h3>
          {[['Yesterday', 'sms-y'], ['Current Week', 'sms-g'], ['Month to date…', 'sms-c']].map(([l, c]) => (
            <div key={l} className={`sms-row ${c}`}><div><b>SMS Used</b><small>{l}</small></div><strong>0</strong></div>
          ))}
        </article>
        <article className="card">
          <h3>Student Strength</h3>
          <StrengthChart />
        </article>
      </section>

      <section>
        <h3 className="sec-title">Attendance</h3>
        <div className="att-grid">
          {ATTENDANCE.map((a) => (
            <article key={a.label} className={`att ${a.cls}`}>
              <strong>{a.value.toFixed(2)}</strong>
              <div className="bar"><i style={{ width: `${a.value}%` }} /></div>
              <small>{a.label}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="card notices">
        <h3>Latest Updates</h3>
        <ul>
          {NOTICES.map((n) => (
            <li key={n.t}>
              <span className="tag">{n.tag}</span>
              <p>{n.t}</p>
              <time>{n.d}</time>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
