# TravelExplore

TravelExplore is a responsive single-page application (SPA) for discovering travel destinations, reading travel guides, and saving favorite places. This project milestone focuses on the static frontend, required folder structure, project documentation, and a draft database ERD.

## Current status

The frontend is implemented as a demo. The PHP backend and MySQL database are **not implemented or connected yet**. Login and registration are demo forms. Favorites are stored in the current browser using `localStorage`.

## Technology stack

- Frontend: HTML5, CSS3, JavaScript, jQuery, Bootstrap 5
- Planned backend: PHP with FlightPHP, PDO, and MySQL
- Local development: VS Code Live Server or XAMPP

## Folder structure

```text
TravelExplore-corrected/
├── .agents/
│   └── skills/
│       └── update-ai-log/
│           └── SKILL.md
├── .github/
│   └── agents/
│       ├── frontend.agent.md
│       ├── backend.agent.md
│       └── reviewer.agent.md
├── backend/
│   ├── config/
│   ├── dao/
│   ├── logs/
│   ├── middleware/
│   ├── routes/
│   └── services/
├── docs/
│   ├── AI_LOG.md
│   ├── API_PLAN.md
│   ├── ERD.md
│   ├── ERD.png
│   ├── PROJECT_OVERVIEW.md
│   ├── SETUP.md
│   └── TESTING_CHECKLIST.md
├── frontend/
│   ├── assets/
│   │   └── images/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── app.js
│   │   └── router.js
│   ├── static/
│   │   └── index.html
│   └── views/
│       ├── about.html
│       ├── dashboard.html
│       ├── destination-details.html
│       ├── destinations.html
│       ├── favorites.html
│       ├── home.html
│       ├── login.html
│       ├── profile.html
│       ├── register.html
│       └── travel-guides.html
├── .gitignore
├── AGENTS.md
└── README.md
```

## Pages and features

- Home page with featured destinations
- Destination list with text search and category filtering
- Destination detail views
- Travel guides
- About page
- Favorites stored in browser `localStorage`
- Demo login and registration forms
- Profile and dashboard placeholder pages
- Responsive layout using Bootstrap 5
- Planned weather API integration point on the destination details view

## SPA navigation

`frontend/static/index.html` is the application shell. `frontend/js/router.js` reads the URL hash and loads the matching HTML template from `frontend/views/` into the `#app` element without a full page reload. `frontend/js/app.js` contains demonstration destination data and frontend interactions.

## Database design

The proposed ERD includes six entities: `users`, `destinations`, `guides`, `favorites`, `reviews`, and `bookings`. Read [`docs/ERD.md`](docs/ERD.md) or view [`docs/ERD.png`](docs/ERD.png). This is a draft for a future milestone; the database is not connected.

## Documentation

- [`AGENTS.md`](AGENTS.md) — project rules for AI coding assistants
- [`docs/PROJECT_OVERVIEW.md`](docs/PROJECT_OVERVIEW.md) — goals, scope, current features, and limitations
- [`docs/SETUP.md`](docs/SETUP.md) — local setup and troubleshooting
- [`docs/API_PLAN.md`](docs/API_PLAN.md) — proposed endpoints and backend layer responsibilities
- [`docs/ERD.md`](docs/ERD.md) and [`docs/ERD.png`](docs/ERD.png) — database entities and relationships
- [`docs/TESTING_CHECKLIST.md`](docs/TESTING_CHECKLIST.md) — manual test plan
- [`docs/AI_LOG.md`](docs/AI_LOG.md) — AI assistance log to review and maintain honestly

## Known limitations

- Authentication is not real; demo forms do not create accounts or send credentials to a server.
- Favorites are stored locally and are not synchronized between devices.
- Destination and guide data are hard-coded demo content.
- Weather API integration is planned but not connected.
- The backend and MySQL database folders are prepared for a later milestone.
