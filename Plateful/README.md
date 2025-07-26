# Plateful - Smart Recipe Search App

**Plateful** is a fast, beautiful, and intelligent recipe search application built with **React**, **Tailwind CSS**, and the **Edamam API**. It lets users search for recipes with ease, view detailed ingredients, and enjoy a modern, responsive experience. Designed for performance, usability, and simplicity.

---

## 🚀 Features

- 🔍 **Live Recipe Search** — Query recipes by ingredients or dish name using Edamam's public API
- 📄 **Recipe Cards** — See dish title, image, calories, and ingredients with expand/collapse support
- 🧭 **Dynamic Routing** — Navigate between Home (`/`) and Search (`/search?query=`) pages
- 📱 **Fully Responsive** — Optimized for mobile and desktop with smooth scroll and animations
- ⚡ **Performance Optimized** — Includes debounced search and client-side caching
- 🧠 **Smart Header** — Header hides on scroll-down, appears on scroll-up
- 🧩 **Error and Empty States** — Graceful fallback UI for no results or API issues

---

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or newer)
- Edamam API credentials (free at [Edamam Developer](https://developer.edamam.com/))

### Setup

1. **Clone the Repository**:
```bash
git clone https://github.com/your-username/plateful.git
cd plateful
```

2. **Install Dependencies**:
```bash
npm install
```

3. **Configure Environment Variables**:
Create a `.env` file in the root with your API keys:
```env
VITE_APP_ID=your-edamam-app-id
VITE_APP_KEY=your-edamam-app-key
```

4. **Run in Development**:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for Production**:
```bash
npm run build
```

---

## 🧪 Usage

1. Start from the Home page (`/`) with smooth scroll effects.
2. Click "Get Started" or search directly via URL `/search?query=pasta`
3. Browse cards with recipe image, name, calories, and ingredients
4. Click **VIEW INGREDIENTS** to toggle detailed ingredients
5. Scroll to see header auto-hide and reappear on scroll-up
6. If API rate limit hits, retry or wait 1 min

---

## 🔍 API Integration

### Edamam Recipe API (v2)
- **Base URL**: `https://api.edamam.com/api/recipes/v2`
- **Required Params**:
  - `type=public`
  - `q=your-query`
  - `app_id=your-id`
  - `app_key=your-key`
  - Optional: `from` & `to` for pagination (20 per page)

**Example Request:**
```http
GET https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=xxx&app_key=yyy&from=0&to=40
```

---

## 🧱 Project Structure
```
src/
├── components/
│   ├── RecipeCard.jsx        # Displays individual recipe info
│   └── RecipeSearch.jsx      # Handles fetching & displaying recipe grid
├── pages/
│   └── Home.jsx              # Hero section with scroll-to-search button
├── App.jsx                   # Main router with routes
├── main.jsx                  # App entry point
├── styles.css                # Tailwind setup
└── .env                      # API credentials
```

---

## ✨ Code Snippet: Routing Setup
```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipeSearch from './components/RecipeSearch';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<RecipeSearch />} />
      </Routes>
    </Router>
  );
};

export default App;
```

---

## 🛠 Tech Stack

| Tool         | Purpose                         |
|--------------|----------------------------------|
| React        | Frontend logic & components      |
| Vite         | Build & dev server               |
| Tailwind CSS | Utility-first styling            |
| React Router | Page navigation                  |
| Lodash       | Debounce utility for search      |
| Edamam API   | Recipe database                  |

---

## 🤝 Contributing

1. Fork the repo
2. Create your branch: `git checkout -b feature/awesome-feature`
3. Commit changes: `git commit -m "Added awesome feature"`
4. Push to GitHub: `git push origin feature/awesome-feature`
5. Create a Pull Request 🚀

---

## 📄 License

This project is licensed under the **MIT License**.

---

### 🍽️ Built with ❤️ by Kanhiya — because finding recipes should be fast, beautiful, and delightful.

---

[🔗 Visit Edamam API Docs](https://developer.edamam.com/)  ·  [🌐 Live Demo Coming Soon]
