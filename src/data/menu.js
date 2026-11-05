import {
  User, Newspaper, Globe, CalendarDays, UserPlus, GraduationCap, Users,
  ClipboardCheck, Bell, Building2, Award, Clock, BookOpenCheck, FileText,
  Settings2, FileBarChart, BarChart3, Database, Briefcase, Repeat,
  ShieldCheck, Lock, Library, Wallet,
} from 'lucide-react';

const ALL = ['student', 'admin', 'management', 'teacher', 'guardian'];
const STAFF = ['admin', 'management'];

// Sidebar structure. `roles` controls which login role can see a group.
export const MENU = [
  {
    id: 'my-corner', label: 'My Corner', icon: User, roles: ALL,
    children: [
      'My Inbox', 'Message Outbox', 'Transport Details', 'School Committee',
      'Canteen Transactions', 'Online Support', 'GatePass PreApproval', 'LeaveRequest',
    ],
  },
  {
    id: 'school-updates', label: 'School Updates', icon: Newspaper, roles: ALL,
    children: ['Notice Board', 'News & Events', 'Circulars', 'Gallery'],
  },
  {
    id: 'website', label: 'Website Controls', icon: Globe, roles: STAFF,
    children: ['Banners', 'Pages', 'Blog Posts', 'Social Media'],
  },
  {
    id: 'calendar', label: 'Calendar', icon: CalendarDays, roles: ALL,
    children: ['Academic Calendar', 'Holidays', 'Events'],
  },
  {
    id: 'admission', label: 'Admission', icon: UserPlus, roles: STAFF,
    children: ['New Enquiry', 'Application Form', 'Admission Status', 'Fee Structure', 'Admission Reports'],
  },
  {
    id: 'student', label: 'Student', icon: GraduationCap, roles: [...STAFF, 'teacher'],
    children: ['Student List', 'Student Profile', 'Promotions', 'Transfer Certificate', 'ID Cards'],
  },
  {
    id: 'staff', label: 'School Staff', icon: Users, roles: STAFF,
    children: ['Staff List', 'Add Staff', 'Staff Roles', 'Staff Documents'],
  },
  {
    id: 'attendance', label: 'Attendance', icon: ClipboardCheck, roles: ALL,
    children: ['Mark Attendance', 'Attendance Report', 'Staff Attendance', 'Leave Summary'],
  },
  {
    id: 'alerts', label: 'Alerts', icon: Bell, roles: ALL,
    children: ['SMS Alerts', 'Email Alerts', 'App Notifications'],
  },
  {
    id: 'school-info', label: 'School Information', icon: Building2, roles: ALL,
    children: ['About School', 'Departments', 'Facilities', 'Contact Details'],
  },
  {
    id: 'alumni', label: 'Alumini', icon: Award, roles: STAFF,
    children: ['Alumni Directory', 'Alumni Events', 'Success Stories'],
  },
  {
    id: 'timetable', label: 'Time Table', icon: Clock, roles: ALL,
    children: ['Class Time Table', 'Teacher Time Table', 'Exam Time Table', 'Substitutions'],
  },
  {
    id: 'lesson', label: 'Lesson Management', icon: BookOpenCheck, roles: ['admin', 'management', 'teacher', 'student'],
    children: ['Syllabus', 'Lesson Plans', 'Homework', 'Study Material'],
  },
  {
    id: 'exam', label: 'Exam Management', icon: FileText, roles: ALL,
    children: ['Exam Schedule', 'Marks Entry', 'Results', 'Admit Cards'],
  },
  {
    id: 'eval-setting', label: 'Evaluation Setting', icon: Settings2, roles: [...STAFF, 'teacher'],
    children: ['Grading Scale', 'Assessment Types', 'Skill Areas'],
  },
  {
    id: 'report-card', label: 'Report Card Settings', icon: FileBarChart, roles: STAFF,
    children: ['Templates', 'Remarks', 'Publish Report Cards'],
  },
  {
    id: 'eval-reports', label: 'Evaluation Reports', icon: BarChart3, roles: ALL,
    children: ['Class Performance', 'Student Progress', 'Subject Analysis'],
  },
  {
    id: 'master-setup', label: 'Master Setup', icon: Database, roles: ['admin'],
    children: ['Academic Year', 'Classes & Sections', 'Subjects', 'Houses', 'Fee Heads'],
  },
  {
    id: 'hr', label: 'HR', icon: Briefcase, roles: STAFF,
    children: ['Payroll', 'Recruitment', 'Leave Policy', 'Performance'],
  },
  {
    id: 'rollover', label: 'Roll Over', icon: Repeat, roles: ['admin'],
    children: ['Year Roll Over', 'Class Promotion'],
  },
  {
    id: 'user-management', label: 'User Management', icon: Users, roles: ['admin'],
    children: ['Create User', 'Reset Password', 'Login Activity'],
  },
  {
    id: 'permissions', label: 'Permissions', icon: ShieldCheck, roles: ['admin'],
    children: ['Role Permissions', 'Menu Access'],
  },
  {
    id: 'reports', label: 'Reports & Analysis', icon: Lock, roles: STAFF,
    children: ['Fee Collection', 'Attendance Summary', 'Enrollment Trends', 'Custom Reports'],
  },
  // ---- Added as requested: Library & Account ----
  {
    id: 'library', label: 'Library', icon: Library, roles: ALL, isNew: true,
    children: ['Book Catalogue', 'Issue / Return', 'My Borrowed Books', 'Reservations', 'Library Fines', 'E-Books'],
  },
  {
    id: 'account', label: 'Account', icon: Wallet, roles: ALL, isNew: true,
    children: ['My Profile', 'Fee Payments', 'Receipts', 'Change Password', 'Settings'],
  },
].map((g) => ({
  ...g,
  children: g.children.map((label) => ({
    label,
    slug: label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  })),
}));

export const menuForRole = (role) => MENU.filter((g) => g.roles.includes(role));

export function findModule(pathname) {
  const [, , groupId, slug] = pathname.split('/');
  const group = MENU.find((g) => g.id === groupId);
  const child = group?.children.find((c) => c.slug === slug);
  return { group, child };
}
