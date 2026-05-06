import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { AuthProvider } from './context/AuthProvider';
import { ThemeProvider } from './context/ThemeProvider';
import useAuth from './context/useAuth';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LogisticsPage from './pages/LogisticsPage';
import ExportPage from './pages/ExportPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetail from './pages/ServiceDetail';
import CloudPage from './pages/CloudPage';
import EnterprisePage from './pages/EnterprisePage';
import AIPage from './pages/AIPage';
import StaffingPage from './pages/StaffingPage';
import VerificationPage from './pages/VerificationPage';
import NetworkPage from './pages/NetworkPage';
import HealthcarePage from './pages/HealthcarePage';
import ImportExportPage from './pages/ImportExportPage';
import RecruitmentScamsPage from './pages/RecruitmentScamsPage';
import JobOpeningsPage from './pages/JobOpeningsPage';
import ApplicationFormPage from './pages/ApplicationFormPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BlogDetailPage from './pages/BlogDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// ScrollToTop component to ensure page starts at top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const RouteFallback = () => {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? '/' : '/login'} replace />;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="logistics" element={<LogisticsPage />} />
              <Route path="export" element={<ExportPage />} />
              <Route path="import-and-export" element={<ImportExportPage />} />
              <Route path="careers" element={<CareersPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="services" element={<ServicesPage />} />

              {/* Sub-Service Routes */}
              <Route path="services/cloud" element={<CloudPage />} />
              <Route path="services/enterprise" element={<EnterprisePage />} />
              <Route path="services/ai" element={<AIPage />} />
              <Route path="services/staffing" element={<StaffingPage />} />
              <Route path="services/verification" element={<VerificationPage />} />
              <Route path="services/network" element={<NetworkPage />} />
              <Route path="services/healthcare" element={<HealthcarePage />} />
              <Route path="recruitment-scams" element={<RecruitmentScamsPage />} />
              <Route path="latest-openings" element={<JobOpeningsPage />} />
              <Route path="apply" element={<ApplicationFormPage />} />
              <Route path="product/:id" element={<ProductDetailPage />} />
              <Route path="blog/:slug" element={<BlogDetailPage />} />
            </Route>
          </Route>

            <Route path="*" element={<RouteFallback />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
