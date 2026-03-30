import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing";
import Authentication from "./pages/authentication";
import { AuthProvider } from "./Contexts/AuthProvider";

import VideoMeet from "./pages/VideoMeet";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentication />} />
           <Route path='/:url' element={<VideoMeet />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;