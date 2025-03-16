import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import Landing from "./pages/Landing";
import { LandingWrapper } from "./components/Home/wrapper/LandingWrapper";
import { TeamWrapper } from "./components/Home/wrapper/TeamWrapper";

import { Verfication } from "./pages/Verfication";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CompanyInfo } from "./components/Verfication/components/CompanyInfo";
import { ProtectedRoute } from "./components/Auth/components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/verification" element={<Verfication />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />}>
              <Route path="dashboard" element={<LandingWrapper />} />
              <Route path="comp-info" element={<CompanyInfo />} />
              <Route path="team" element={<TeamWrapper />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
