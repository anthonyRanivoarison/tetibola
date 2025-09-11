# Tetibola Frontend Documentation

## Description

Tetibola Frontend is a **React + TypeScript + Vite** application for managing personal expenses and incomes.  
It provides a responsive user interface, allowing users to view dashboards, manage categories, add/edit expenses and
incomes, and visualize statistics.

---

## Usage

### 1️⃣ Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/anthonyRanivoarison/tetibola.git
cd Tetibola/apps/client
npm install
```

### 2 ⃣ Run Development Server

```bash
npm run dev
```

By default, the frontend will be served at: http://localhost:5173/

### 3 ⃣ Structure

apps/client/
├─ src/
│ ├─ api/ # Axios instance and API calls
│ ├─ components/ # Reusable UI components
│ ├─ hooks/ # Custom React hooks
│ ├─ pages/ # Route components
│ ├─ types/ # TypeScript type definitions
│ ├─ App.tsx # Main App component
│ └─ main.tsx # Entry point
├─ public/ # Static assets
├─ index.html
└─ package.json