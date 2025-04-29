
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './components/layout/AdminLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TeamMembersPage from './pages/TeamMembersPage';
import TeamMemberFormPage from './pages/TeamMemberFormPage';
import EventsPage from './pages/EventsPage';
import EventFormPage from './pages/EventFormPage';
import FoundersPage from './pages/FoundersPage';
import FounderFormPage from './pages/FounderFormPage';
import OrganizationPage from './pages/OrganizationPage';
import OrganizationFormPage from './pages/OrganizationFormPage';
import SettingsPage from './pages/SettingsPage';
import ErrorBoundary from './components/ErrorBoundary';
import 'react-toastify/dist/ReactToastify.css';

// We'll add more page imports for events, founders and organization as we create them

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Admin Routes */}
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<ErrorBoundary><DashboardPage /></ErrorBoundary>} />
            
            {/* Team Members Management */}
            <Route path="team-members" element={<ErrorBoundary><TeamMembersPage /></ErrorBoundary>} />
            <Route path="team-members/new" element={<ErrorBoundary><TeamMemberFormPage /></ErrorBoundary>} />
            <Route path="team-members/:id" element={<ErrorBoundary><TeamMemberFormPage /></ErrorBoundary>} />
            
            <Route path="events" element={<ErrorBoundary><EventsPage /></ErrorBoundary>} />
            <Route path="events/new" element={<ErrorBoundary><EventFormPage /></ErrorBoundary>} />
            <Route path="events/:id" element={<ErrorBoundary><EventFormPage /></ErrorBoundary>} />
            
            <Route path="founders" element={<ErrorBoundary><FoundersPage /></ErrorBoundary>} />
            <Route path="founders/new" element={<ErrorBoundary><FounderFormPage /></ErrorBoundary>} />
            <Route path="founders/:id" element={<ErrorBoundary><FounderFormPage /></ErrorBoundary>} />
            
            <Route path="organization" element={<ErrorBoundary><OrganizationPage /></ErrorBoundary>} />
            <Route path="organization/new" element={<ErrorBoundary><OrganizationFormPage /></ErrorBoundary>} />
            <Route path="organization/:id" element={<ErrorBoundary><OrganizationFormPage /></ErrorBoundary>} />
            <Route path="settings" element={<ErrorBoundary><SettingsPage /></ErrorBoundary>} />
          </Route>
          
          {/* Redirect any unmatched routes to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
