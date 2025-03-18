import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import Landing from "./pages/Landing";
import { LandingWrapper } from "./components/Home/wrapper/LandingWrapper";
import { TeamWrapper } from "./components/Home/wrapper/TeamWrapper";

import { Verfication } from "./pages/Verfication";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { CompanyInfo } from "./components/Verfication/components/CompanyInfo";
import { ProtectedRoute } from "./components/Auth/components/ProtectedRoute";
import { PublicRoute } from "./components/Auth/components/PublicRoute";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* Public Routes - Accessible only when not authenticated */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/verification" element={<Verfication />} />
          </Route>

          {/* Protected Routes - Accessible only when authenticated */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />}>
              <Route path="dashboard" element={<LandingWrapper />} />
              <Route path="comp-info" element={<CompanyInfo />} />
              <Route path="team" element={<TeamWrapper />} />
              {/* <Route path="users" element={<TeamWrapper />} /> */}
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>
          </Route>

          {/* Fallback route - Redirect to appropriate location based on auth status */}
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
