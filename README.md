# Employee Dashboard

A modern employee management dashboard built with React, TypeScript, and Vite, featuring employee listing, search, filtering, and leave balance visualization.

---

## Features

- **Employee Table**
  - Desktop table with columns: Employee, Position, Department, Join Date, Actions
  - Responsive card view on mobile devices
  - Search by name, email, and department
  - Department and sort filtering

- **Dashboard & KPIs**
  - Employee count and filters
  - Responsive Pie chart for leave balance
  - View employee details in a modal

- **Tech Stack**
  - React 19 + TypeScript
  - Vite for fast dev & build
  - TanStack Query (React Query) for data fetching & caching
  - React Router DOM for routing
  - Shadcn UI + Tailwind CSS for components & styling
  - React Testing Library + Vitest for unit and integration tests

---

## Quick Start

1. **Clone the project**

   ```bash
   git clone https://github.com/your-username/employee-dashboard.git
   cd employee-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the dev server**

   ```bash
   npm run dev
   ```

The app will be available at http://localhost:5173.

---

## Testing

This project uses:

- **Vitest** as the test runner
- **React Testing Library** for React component testing
- **@testing-library/user-event** for simulating user interactions
- **TanStack Query** and QueryClientProvider for testing useEmployees

### How to run tests

```bash
# Run in watch mode (default)
npm run test

# Open interactive test UI (recommended)
npm run test:ui

# Run with coverage
npm run test:coverage
```

### Test Coverage

Tests are written at three levels:

- **EmployeeTable.test.tsx** – Component renders correctly in desktop/mobile.
- **useEmployees.test.tsx** – Custom hook returns correct data, loading, error states.
- **Dashboard.test.tsx** – Integration: page renders, filters, sorts, shows skeletons and errors.

