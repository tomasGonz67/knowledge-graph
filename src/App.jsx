// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import your two components
import KnowledgeGraphManager from "./components/KnowledgeGraphManager";
import EntityAnalysisDashboard from "./components/EntityAnalysisDashboard";
import Custom3D from "./components/Custom3D";

export default function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4 flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/manager">Manager</Link>
          <Link to="/analysis">Analysis</Link>
          <Link to="/3-d">Custom 3D</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>Welcome to My Knowledge Graph System</h1>
                <p>Use the navigation links above to explore.</p>
              </div>
            }
          />
          <Route path="/manager" element={<KnowledgeGraphManager />} />
          <Route path="/analysis" element={<EntityAnalysisDashboard />} />

          <Route path="/3-d" element={<Custom3D />} />
        </Routes>
      </div>
    </Router>
  );
}
