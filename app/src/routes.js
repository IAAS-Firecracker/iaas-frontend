import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ClusterManagementPage from './pages/ClusterManagementPage';
import ProfilePage from './pages/ProfilePage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import UserManagementPage from './pages/UserManagementPage';
import SystemImagesManager from './components/system-images/SystemImagesManager';
import VMOffersPage from './pages/VmOffersPage';
import VmManagement from './pages/VmManagement';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';

import { isTokenExpired, getTokenExpirationTime } from './utils/jwtUtils';
import { useTokenExpirationMonitor } from './hooks/useTokenExpirationMonitor';
// Common Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { AnimatePresence } from 'framer-motion';


// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, currentUser, token } = useSelector(state => state.user);

    console.log("Token expires in ", (new Date(getTokenExpirationTime(token))).toISOString());
    //console.log(isAuthenticated)
    if (!isAuthenticated || !token || isTokenExpired(token)) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser?.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
    const { isAuthenticated, currentUser } = useSelector(state => state.user);

    if (isAuthenticated) {
        // Role-based redirect
        const redirectTo = '/dashboard';

        console.log('User authenticated, redirecting to:', redirectTo);
        return <Navigate to={redirectTo} replace />;
    }

    return children;
};

// Layout Component
const Layout = ({ children, showHeader = true, showFooter = true }) => {
    return (
        <div className="min-h-screen flex flex-col">
            {showHeader && <Header />}
            <main className="flex-grow">
                {children}
            </main>
            {showFooter && <Footer />}
        </div>
    );
};


const AppContent = () => {
    // Monitor token expiration globally
    useTokenExpirationMonitor();

    return (<Routes>
        {/* Public Routes */}
        <Route
            path="/"
            element={
                <Layout showHeader={true}>
                    <LandingPage />
                </Layout>
            }
        />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Layout showHeader={true} showFooter={false}>
                <LoginPage />
              </Layout>
            </PublicRoute>
          } 
        />

         <Route 
          path="/register" 
          element={
            <PublicRoute>
              <Layout showHeader={true} showFooter={false}>
                <SignupPage />
              </Layout>
            </PublicRoute>
          } 
        />
         <Route 
          path="/signup" 
          element={
            <PublicRoute>
              <Layout showHeader={true} showFooter={false}>
                <SignupPage />
              </Layout>
            </PublicRoute>
          } 
        />

         <Route 
          path="/profile" 
          element={
            <PublicRoute>
              <Layout showHeader={true} showFooter={true}>
                <ProfilePage />
              </Layout>
            </PublicRoute>
          } 
        />
         <Route 
          path="/password-reset" 
          element={
            <PublicRoute>
              <Layout showHeader={true} showFooter={true}>
                <ResetPasswordPage />
              </Layout>
            </PublicRoute>
          } 
        />
         <Route 
          path="/users" 
          element={
            <PublicRoute>
              <Layout showHeader={true} showFooter={true}>
                <UserManagementPage />
              </Layout>
            </PublicRoute>
          } 
        />

         <Route 
          path="/clusters" 
          element={
            <PublicRoute>
              <Layout showHeader={true} showFooter={true}>
                <ClusterManagementPage />
              </Layout>
            </PublicRoute>
          } 
        />

         <Route 
          path="/system-images" 
          element={
            <PublicRoute>
              <Layout showHeader={true} showFooter={true}>
                <SystemImagesManager />
              </Layout>
            </PublicRoute>
          } 
        />

        <Route 
          path="/offers" 
          element={
            <PublicRoute>
              <Layout showHeader={true} showFooter={true}>
                <VMOffersPage />
              </Layout>
            </PublicRoute>
          } 
        />

         <Route 
          path="/vms" 
          element={
            <PublicRoute>
              <Layout showHeader={true} showFooter={true}>
                <VmManagement />
              </Layout>
            </PublicRoute>
          } 
        />
         <Route 
          path="/dashboard" 
          element={
            <PublicRoute>
              <Layout showHeader={true} showFooter={true}>
                <DashboardPage />
              </Layout>
            </PublicRoute>
          } 
        />

         {/* 404 Route */}
        <Route 
          path="*" 
          element={
            <Layout>
              <NotFoundPage />
            </Layout>
          } 
        />



    </Routes>)
}
const AppRoutes = () => {

    return (
        <Router>
            <AnimatePresence mode="wait">
                <AppContent />
            </AnimatePresence>

        </Router>
    );
};

export default AppRoutes;