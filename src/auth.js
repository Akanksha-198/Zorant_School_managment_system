// Frontend-only demo auth (no database). Replace with real API calls later.
const KEY = 'sms_user';

export const ROLES = [
  { value: 'student', label: 'Student' },
  { value: 'admin', label: 'Admin' },
  { value: 'management', label: 'School Management' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'guardian', label: 'Guardian' },
];

export const roleLabel = (value) =>
  ROLES.find((r) => r.value === value)?.label ?? value;

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}

export function login({ username, role }) {
  const user = { username, role };
  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem(KEY);
}
