import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing";
import Authentication from "./pages/authentication";
import { AuthProvider } from "./Contexts/AuthProvider";
import VideoMeetComponent from './pages/videoMeet';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentication />} />
           <Route path='/:url' element={<VideoMeetComponent />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;