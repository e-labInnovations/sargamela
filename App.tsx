import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LivePage from "./pages/LivePage";
import NotFoundPage from "./pages/NotFoundPage";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Mobile HomePage Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/scores" element={<HomePage />} />
      <Route path="/scoreboard" element={<HomePage />} />
      <Route path="/details" element={<HomePage />} />
      <Route path="/categories" element={<HomePage />} />
      <Route path="/news" element={<HomePage />} />

      {/* Big Screen Display */}
      <Route path="/live" element={<LivePage />} />

      {/* 404 Not Found - Must be last */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
