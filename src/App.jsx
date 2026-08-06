import React, { useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { MessageProvider } from "./contexts/MessageContext";
import { AppointmentProvider } from "./contexts/AppointmentContext";
import { OfflineProvider } from "./contexts/OfflineContext";
import Layout from "./components/common/Layout";
import LoadingSpinner from "./components/common/LoadingSpinner";
import CursorBurst from "./components/common/CursorBurst";
import ScrollToTop from "./components/common/ScrollToTop";
import { Toaster } from "react-hot-toast";
import "./index.css";

// Lazy Loaded Pages & Components
const LandingPage = lazy(() => import("./pages/LandingPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const PatientDashboard = lazy(() => import("./components/patient/PatientDashboard"));
const DoctorDashboard = lazy(() => import("./components/doctor/DoctorDashboard"));
const PharmacistDashboard = lazy(() => import("./components/pharmacist/PharmacistDashboard"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AIHealthAssistant = lazy(() => import("./components/ai/AIHealthAssistant"));
const Prescriptions = lazy(() => import("./components/patient/Prescriptions"));
const Appointments = lazy(() => import("./components/patient/Appointments"));
const Schedule = lazy(() => import("./components/doctor/Schedule"));
const HealthLogs = lazy(() => import("./components/patient/HealthLogs"));
const Blog = lazy(() => import("./pages/Blog"));
const Career = lazy(() => import("./pages/Career1"));
const Notifications = lazy(() => import("./pages/Notifications"));
const PrivacyPolicy = lazy(() => import("./pages/privacy"));
const Feature = lazy(() => import("./pages/Feature"));
const Patients = lazy(() => import("./components/doctor/Patients"));
const NewPatientForm = lazy(() => import("./components/doctor/NewPatientForm"));
const Messages = lazy(() => import("./components/common/Messages"));
const Settings = lazy(() => import("./components/common/Settings"));
const Inventory = lazy(() => import("./components/patient/Inventory"));
const Prescription = lazy(() => import("./components/pharmacist/Prescriptions"));
const PharmacistInventory = lazy(() => import("./components/pharmacist/Inventory"));
const CookiePolicy = lazy(() => import("./pages/Policy"));
const GDPRCompliance = lazy(() => import("./pages/GDPRCompliance"));
const TermsOfServices = lazy(() => import("./pages/TermsOfServices"));
const LicensePage = lazy(() => import("./pages/License"));
const Contributors = lazy(() => import("./components/common/Contributor"));

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole && user.role !== requiredRole)
    return <Navigate to={`/${user.role}`} replace />;

  return children;
};

// Public Route Component
const PublicRoute = ({ children, authOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (user && authOnly) return <Navigate to={`/${user.role}`} replace />;
  return children;
};

// Main App Routes
const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <LoadingSpinner size="xl" />
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
            Loading PulseCare AI...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
          <LoadingSpinner size="lg" />
        </div>
      }
    >
    <>
      {/* Add CursorBurst component - only show if user is not on auth pages */}
      {!window.location.pathname.includes('/login') && 
       !window.location.pathname.includes('/register') && 
       !window.location.pathname.includes('/forgot-password') && 
       <CursorBurst />}
      
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <LandingPage />
            </>
          }
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/feature" element={<Feature />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/gdpr-compliance" element={<GDPRCompliance />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/career" element={<Career />} />
        <Route path="/terms" element={<TermsOfServices />} />
        <Route path="/contributor" element={<Contributors />} />
        <Route path="/license" element={<LicensePage />} />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute authOnly={true}>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute authOnly={true}>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute authOnly={true}>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        {/* Shared Authenticated Routes */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/notifications" element={<Notifications />} />
        </Route>

        {/* Patient Routes */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute requiredRole="patient">
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<PatientDashboard />} />
          <Route path="ai-assistant" element={<AIHealthAssistant />} />
          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="health-logs" element={<HealthLogs />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="inventory" element={<Inventory />} />
        </Route>

        {/* Doctor Routes */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute requiredRole="doctor">
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DoctorDashboard />} />
          <Route path="ai-assistant" element={<AIHealthAssistant />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients/new" element={<NewPatientForm />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Pharmacist Routes */}
        <Route
          path="/pharmacist"
          element={
            <ProtectedRoute requiredRole="pharmacist">
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<PharmacistDashboard />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="prescriptions" element={<Prescription />} />
          <Route path="inventory" element={<PharmacistInventory />} />
        </Route>

        {/* Catch-All Redirect */}
        <Route
          path="*"
          element={
            user ? (
              <Navigate to={`/${user.role}`} replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
      </>
    </Suspense>
  );
};

function App() {
  useEffect(() => {
    if (
      "serviceWorker" in navigator &&
      window.location.hostname !== "localhost"
    ) {
      navigator.serviceWorker
        .register("/service-worker.js", { scope: "/" })
        .then((registration) => {
          console.log("Service Worker registered with scope: ", registration.scope);
        })
        .catch((error) => {
          console.error("Service Worker Registration failed: ", error);
        });
    }
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <AppointmentProvider>
          <OfflineProvider>
            <MessageProvider>
              <Router>
                <ScrollToTop />
                <div className="App bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
                  <AppRoutes />
                  <Toaster
                    position="bottom-right"
                    toastOptions={{
                      duration: 4000,
                      style: {
                        background: "var(--toast-bg, #fff)",
                        color: "var(--toast-color, #333)",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                        border: "1px solid var(--toast-border, #e5e7eb)",
                      },
                      success: {
                        iconTheme: {
                          primary: "#10b981",
                          secondary: "#fff",
                        },
                        style: {
                          background: "#f0fdf4",
                          color: "#065f46",
                          border: "1px solid #bbf7d0",
                        },
                      },
                      error: {
                        iconTheme: {
                          primary: "#ef4444",
                          secondary: "#fff",
                        },
                        style: {
                          background: "#fef2f2",
                          color: "#991b1b",
                          border: "1px solid #fecaca",
                        },
                      },
                    }}
                    containerStyle={{
                      top: 20,
                      right: 20,
                    }}
                  />
                </div>
              </Router>
            </MessageProvider>
          </OfflineProvider>
        </AppointmentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;