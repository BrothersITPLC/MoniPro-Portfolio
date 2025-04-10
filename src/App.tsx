import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import Landing from "./pages/Landing";
import { LandingWrapper } from "./components/Home/wrapper/LandingWrapper";
import { DeviceWrapper } from "./components/Home/wrapper/DeviceWrapper";
import { TeamWrapper } from "./components/Home/wrapper/TeamWrapper";
import { FAQ } from "./pages/FAQ";
import { Verfication } from "./pages/Verfication";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { CompanyInfo } from "@/components/Home/company/components/CompanyInfo";
import { ProtectedRoute } from "./components/Auth/components/ProtectedRoute";
import { ZabbixHosts } from "./components/Home/zabbixHosts/components/zabbixhosts";
import { PublicRoute } from "./components/Auth/components/PublicRoute";

import { NotificationWrapper } from "./components/Home/wrapper/NotificationWrapper";
import { SecurityAlerts } from "./components/Home/notification/components/SecurityAlerts";
import { InsightSuggestion } from "./components/Home/notification/components/InsightSuggestion";
import { PerformanceAlerts } from "./components/Home/notification/components/PerformanceAlerts";
import { UpdateSubscription } from "./components/Home/company/components/UpdateSubscription";
import { ResetPassword } from "./pages/ResetPassword";
import { GoogleCallback } from "./components/Auth/components/GoogleCallback";
import  {PersonalInfoUpdate}  from "./components/Home/company/components/Infoupdate";

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
            <Route path="/faq" element={<FAQ />} />
            <Route path="/password-reset" element={<ResetPassword />} />
            <Route
              path="/social/auth/google/callback"
              element={<GoogleCallback />}
            />
          </Route>

          {/* Protected Routes - Accessible only when authenticated */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />}>
              <Route path="dashboard" element={<LandingWrapper />} />
              <Route
                path="subscription"
                element={<UpdateSubscription />}
              />{" "}
              <Route path="comp-info" element={<CompanyInfo />} />
              <Route path="info-update" element={<PersonalInfoUpdate />} />
              <Route path="device-mangment" element={<DeviceWrapper />} />
              <Route path="notification" element={<NotificationWrapper />}>
                <Route path="security" element={<SecurityAlerts />} />
                <Route
                  path="insight-suggestion"
                  element={<InsightSuggestion />}
                />
                <Route path="performance" element={<PerformanceAlerts />} />
              </Route>
              <Route path="team" element={<TeamWrapper />} />
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="zabbixhost/:hostId" element={<ZabbixHosts />} />
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
