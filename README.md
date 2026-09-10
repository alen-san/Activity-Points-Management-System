#  Activity Points Management System (React.js)

A modern, responsive front-end web application for managing and tracking student co-curricular, extracurricular, technical, professional, social, and leadership activity points.

Built according to the **Web Programming Assignment** guidelines and styled with a sleek, dark-slate emerald green user interface inspired by modern fintech and analytics dashboards.

---

##  Visual Theme & Design Inspiration

The user interface is designed in a modern dark-slate aesthetic:
- **Palette**: Charcoal/slate backgrounds (`#0B0F15`, `#151A23`), subtle borders (`#1F2735`), and neon emerald green accents (`#10B981` / `#00E599`).
- **Dashboard Metrics**: Glowing stat cards including **Total Points Balance**, **Points Earned (This Month)**, **Pending Approvals**, and **Remaining Points to Graduate**.
- **Interactive Trend Chart**: Custom SVG bezier curve chart depicting student activity point accumulation over the last 6 months with gradient area fills and hover tooltips.
- **Top Contributors / Leaderboard**: Honors ranking with gold, silver, and bronze badges, avatars, and points.
- **Recent Activities Feed**: Clean data feed table with green point badges (`+500`) and status tags (`Approved`, `Pending`, `Rejected`).

---

##  Features Checklist (Assignment Specifications)

- [x] **Student Login Page**: 
  - Login using UID and password, validated against `students.json`.
  - Includes convenient 1-click **Demo Login** buttons for easy evaluation.
- [x] **Dashboard**:
  - Displays student name, UID, department, semester, and batch in an academic header banner.
  - KPI Stat Cards: Total activity points earned, target points (100 PTS), and remaining points.
  - Points Earning Trend chart (last 6 months) and Top Contributors leaderboard.
  - Recent activity feed with interactive detail modal.
- [x] **Activity List**:
  - Interactive table displaying completed/submitted activities with name, category, date, points claimed, points approved, and status.
  - Real-time search by title or description.
  - Category and status filters (All, Approved, Pending, Rejected).
  - Modal view to inspect proof of participation and faculty verification remarks.
- [x] **Add Activity Form**:
  - Comprehensive form to enter activity title, category, date, description, and points claimed.
  - Preset quick point selector buttons (+10, +15, +20, +25, +30).
  - Simulated certificate/proof document file upload with preview.
  - Optional *Instant Faculty Approval* simulation toggle for demo purposes.
  - Interactive confetti animation on successful submission!
- [x] **Activity Categories**:
  - Detailed overview of standard categories: Technical & Professional, Sports & Games, Cultural, Social Service & Volunteering, Entrepreneurship & Innovation, Leadership & Management.
  - Displays category descriptions, point ceilings (caps), allowable activities, and personal progress towards the cap.
- [x] **Student Profile**:
  - Academic credentials (UID, Department, Semester, Batch, Email, Institution).
  - Degree graduation readiness progress meter (Target: 100 PTS).
  - Category-wise points breakdown bars.
  - Print/Export official transcript report button (`window.print()`).
- [x] **JSON Data Source**:
  - Initial data loaded cleanly from `src/data/students.json`, `src/data/activities.json`, and `src/data/categories.json`.
  - Seamless `localStorage` persistence so newly added activities remain saved across page refreshes.
- [x] **React Core Concepts Used**:
  - Functional Components & Modular Architecture
  - JSX & Props passing
  - `useState` & `useEffect` hooks
  - React Context API for central state (`AuthContext`, `ActivityContext`)
  - React Router (`HashRouter` for zero-configuration GitHub Pages hosting)
  - Conditional rendering (role badges, approval pills, modal dialogs)
  - Controlled form handling with input validation
- [x] **GitHub Pages Deployment Ready**:
  - Configured with `gh-pages` and relative base path (`./`).

---

##  Sample Student Login Credentials

You can test logging in with any of the following accounts (or click any of the 1-click buttons on the login page):

| Student Name | UID | Password | Department | Semester |
|---|---|---|---|---|
| **Sarah Jenkins** | `u248010` | `pass` | Computer Science & Engineering | Semester 6 |
| **Mark Chen** | `u248012` | `pass` | Electronics & Communication | Semester 6 |
| **Chloe Dubois** | `u248018` | `pass` | Mechanical Engineering | Semester 6 |
| **Alen Sanjith** | `u248025` | `pass` | Information Technology | Semester 6 |

---

## 🛠️ Project Structure

```
activiy point/
├── public/
├── src/
│   ├── components/
│   │   ├── ActivityModal.jsx     # Proof & verification inspection modal
│   │   ├── Leaderboard.jsx       # Top contributors & honors badge card
│   │   ├── Navbar.jsx            # Header with AP logo, notifications & user profile
│   │   ├── ProtectedRoute.jsx    # Authentication route guard
│   │   ├── Sidebar.jsx           # Dark navigation bar with active emerald pill
│   │   ├── StatCard.jsx          # KPI card with emerald border & badge
│   │   ├── TrendChart.jsx        # Smooth SVG curved trend line chart
│   │   └── UserAvatar.jsx        # Initials badge avatar component (no photos)
│   ├── context/
│   │   ├── ActivityContext.jsx   # Activities & point calculation state
│   │   └── AuthContext.jsx       # Student authentication state
│   ├── data/
│   │   ├── activities.json       # Sample activity submissions
│   │   ├── categories.json       # Categories with point caps and rules
│   │   └── students.json         # Student profiles and credentials
│   ├── pages/
│   │   ├── ActivityList.jsx      # Filterable & searchable activities record
│   │   ├── AddActivity.jsx       # Activity submission form with preview
│   │   ├── Categories.jsx        # Activity categories & cap guidelines
│   │   ├── Dashboard.jsx         # Main analytics dashboard (matches screenshot)
│   │   ├── LeaderboardPage.jsx   # Department members & leaderboard rankings
│   │   ├── Login.jsx             # Student authentication page
│   │   └── Profile.jsx           # Student profile & transcript summary
│   ├── App.jsx                   # Routing and layout shell
│   ├── index.css                 # Dark emerald theme & Tailwind utilities
│   └── main.jsx                  # React application entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

##  Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation & Run

1. Clone or navigate to the project directory:
   ```bash
   cd "activiy point"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at the displayed local URL (typically `http://localhost:5173`).

---

##  Deploying to GitHub Pages

This project is configured with `gh-pages` and `base: './'` in `vite.config.js`.

To deploy to GitHub Pages:

1. Initialize git and link your remote repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Activity Points Management System"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git
   git push -u origin main
   ```

2. In `package.json`, update the `"homepage"` field with your GitHub repository URL:
   ```json
   "homepage": "https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>"
   ```

3. Run the automated deploy command:
   ```bash
   npm run deploy
   ```
   This command will build the production bundle into `dist` and publish it directly to the `gh-pages` branch.

4. On GitHub, navigate to **Settings > Pages** and ensure the source is set to `gh-pages` branch. Your website will be live at `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/`!

---

##  Academic Note
The activity point rules modeled in this project align with typical technical university guidelines (such as KTU / AICTE), requiring **100 activity points** earned across diverse co-curricular, sports, cultural, social, and technical activities for degree award.
