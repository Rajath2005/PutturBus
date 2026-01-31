# 👨‍💻 PutturBus Developer Guide

This guide is intended for developers who want to contribute to the PutturBus project or understand its internal workings.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js)
*   [Git](https://git-scm.com/)

## ⚙️ Setup & Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Rajath2005/PutturBus.git
    cd PutturBus
    ```

2.  **Install Dependencies**
    We use `npm` for dependency management.
    ```bash
    npm install
    ```
    *Note: This might take a few minutes as it installs Next.js, React, Leaflet, and other core libraries.*

3.  **Run Development Server**
    Start the local development environment.
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

Here is a high-level overview of the codebase:

```bash
d:\DevWorkspace\Projects\KSRTC-Puttur
├── app/                 # Next.js 14 App Router (Pages & Layouts)
├── components/          # Reusable UI Components
│   ├── BusCard.tsx      # Main bus status component
│   ├── RouteMap.tsx     # Leaflet map wrapper
│   └── ...
├── data/                # Static Data (Routes, Stops, Schedules)
├── lib/                 # Core Business Logic
│   ├── geo.ts           # Geography utilities (Haversine, Bearing)
│   ├── route-engine.ts  # Logic for travel time & pathfinding
│   └── time.ts          # Time formatting & comparison tools
├── public/              # Static Assets (Images, Icons)
└── types/               # TypeScript Interfaces
```

## 📜 Key Scripts

*   `npm run dev`: Runs the app in development mode with hot-reloading.
*   `npm run build`: Builds the app for production.
*   `npm run start`: Starts the production build locally.
*   `npm run lint`: Runs ESLint to check for code style issues.

## 🤝 Contribution Guidelines

1.  **Branching**: Create a new branch for each feature or bug fix (`git checkout -b feature/my-feature`).
2.  **Commits**: Use descriptive commit messages.
3.  **Pull Requests**: detailed description of changes when opening a PR.

---

[⬅️ Back to README](../README.md)
