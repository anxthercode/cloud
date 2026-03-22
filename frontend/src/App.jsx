import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Topnav from './components/Topnav';
import Toast from './components/Toast';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForcePwPage from './pages/ForcePwPage';
import OverviewPage from './pages/OverviewPage';
import VMList from './pages/VMList';
import CreateVMPage from './pages/CreateVMPage';
import TenantsPage from './pages/TenantsPage';
import UsersPage from './pages/UsersPage';
import NetworkPage from './pages/NetworkPage';
import QuotaPage from './pages/QuotaPage';
import AuditPage from './pages/AuditPage';
import MonitoringPage from './pages/MonitoringPage';
import InfrastructurePage from './pages/InfrastructurePage';
import AnalyticsPage from './pages/AnalyticsPage';
import RequestsPage from './pages/RequestsPage';
import TasksPage from './pages/TasksPage';
import ChatWidget from './components/ChatWidget';

function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <Topnav />
      <div className="main-content">{children}</div>
      <ChatWidget />
    </div>
  );
}

function Guard({ children }) {
  const { role, loading } = useApp();
  if (loading) {
    return (
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        height: '100vh', fontSize: 16, color: '#94a3b2', flexDirection: 'column', gap: 12,
        background: '#060708',
      }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#eceef2' }}>Cloud IaaS</div>
        <div>Загрузка…</div>
      </div>
    );
  }
  if (!role) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/force-pw" element={<ForcePwPage />} />

        <Route path="/dashboard" element={<Navigate to="/overview" replace />} />

        <Route path="/overview" element={
          <Guard><AppLayout><OverviewPage /></AppLayout></Guard>
        } />

        <Route path="/instances" element={
          <Guard><AppLayout><VMList /></AppLayout></Guard>
        } />
        <Route path="/instances/create" element={
          <Guard><AppLayout><CreateVMPage /></AppLayout></Guard>
        } />

        <Route path="/networking" element={
          <Guard><AppLayout><NetworkPage /></AppLayout></Guard>
        } />
        <Route path="/usage" element={
          <Guard><AppLayout><QuotaPage /></AppLayout></Guard>
        } />
        <Route path="/team" element={
          <Guard><AppLayout><UsersPage /></AppLayout></Guard>
        } />
        <Route path="/activity" element={
          <Guard><AppLayout><AuditPage /></AppLayout></Guard>
        } />

        <Route path="/platform/workspaces" element={
          <Guard><AppLayout><TenantsPage /></AppLayout></Guard>
        } />
        <Route path="/platform/infrastructure" element={
          <Guard><AppLayout><InfrastructurePage /></AppLayout></Guard>
        } />
        <Route path="/platform/tasks" element={
          <Guard><AppLayout><TasksPage /></AppLayout></Guard>
        } />
        <Route path="/platform/analytics" element={
          <Guard><AppLayout><AnalyticsPage /></AppLayout></Guard>
        } />
        <Route path="/platform/audit" element={
          <Guard><AppLayout><AuditPage /></AppLayout></Guard>
        } />
        <Route path="/platform/access-requests" element={
          <Guard><AppLayout><RequestsPage /></AppLayout></Guard>
        } />

        <Route path="/monitoring" element={
          <Guard><AppLayout><MonitoringPage /></AppLayout></Guard>
        } />
        <Route path="/access-requests" element={
          <Guard><AppLayout><RequestsPage /></AppLayout></Guard>
        } />

        {/* Legacy paths → redirects */}
        <Route path="/vms" element={<Navigate to="/instances" replace />} />
        <Route path="/vms/create" element={<Navigate to="/instances/create" replace />} />
        <Route path="/network" element={<Navigate to="/networking" replace />} />
        <Route path="/quota" element={<Navigate to="/usage" replace />} />
        <Route path="/users" element={<Navigate to="/team" replace />} />
        <Route path="/audit" element={<Navigate to="/activity" replace />} />
        <Route path="/requests" element={<Navigate to="/access-requests" replace />} />
        <Route path="/tenants" element={<Navigate to="/platform/workspaces" replace />} />
        <Route path="/infrastructure" element={<Navigate to="/platform/infrastructure" replace />} />
        <Route path="/tasks" element={<Navigate to="/platform/tasks" replace />} />
        <Route path="/analytics" element={<Navigate to="/platform/analytics" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
