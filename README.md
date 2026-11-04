# EduSphere – School Management System (Frontend)

React + Vite frontend. **No database / backend** – login is a demo (any username + password works).

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
```

## Flow

1. **Login page** (`src/pages/Login.jsx`) – role dropdown: Student, Admin, School Management, Teacher, Guardian.
2. **Dashboard** (`src/pages/Dashboard.jsx`) – stat cards, quick actions, SMS usage, student-strength chart, attendance, updates.
3. **Sidebar** (`src/data/menu.js`) – My Corner, School Updates, Website Controls, Calendar, Admission, Student, School Staff, Attendance, Alerts, School Information, Alumini, Time Table, Lesson/Exam Management, Evaluation, Report Card, Master Setup, HR, Roll Over, User Management, Permissions, Reports & Analysis, plus the newly added **Library** and **Account**.
   Menu items are filtered by the role chosen at login.
4. Every sidebar item opens a placeholder page (`src/pages/ModulePage.jsx`) – build real screens one by one.

## Customize

- **Menu / roles:** edit `src/data/menu.js` (`roles` array per group).
- **Login image:** the login page uses an original SVG (`src/components/HeroIllustration.jsx`). To use your own photo, put it in `public/images/login-hero.jpg` and replace `<HeroIllustration />` in `Login.jsx` with `<img className="hero-svg" src="/images/login-hero.jpg" alt="" />`.
- **Colors / fonts:** CSS variables at the top of `src/styles/global.css`.
- **School name / logo:** `src/components/Topbar.jsx`.
- **Real auth later:** replace the functions in `src/auth.js` with API calls.

## Responsive

Desktop: collapsible sidebar. Tablet/mobile: sidebar becomes a slide-in drawer, cards reflow into 2 / 1 columns. Light/dark theme toggle in the top bar.
"# Zorant_School_managment_system" 
