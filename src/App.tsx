import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import SearchFlightsPage from './pages/flights/SearchFlightsPage';
import FlightResultsPage from './pages/flights/FlightResultsPage';
import FlightDetailsPage from './pages/flights/FlightDetailsPage';
import BookingPage from './pages/booking/BookingPage';
import PaymentPage from './pages/booking/PaymentPage';
import BookingConfirmationPage from './pages/booking/BookingConfirmationPage';

// Dashboard Pages
import DashboardHomePage from './pages/dashboard/DashboardHomePage';
import BookingsManagementPage from './pages/dashboard/BookingsManagementPage';
import UserManagementPage from './pages/dashboard/UserManagementPage';
import ProfilePage from './pages/dashboard/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="flights/search" element={<SearchFlightsPage />} />
          <Route path="flights/results" element={<FlightResultsPage />} />
          <Route path="flights/:id" element={<FlightDetailsPage />} />
          <Route path="booking/:flightId" element={<BookingPage />} />
          <Route path="payment/:bookingId" element={<PaymentPage />} />
          <Route path="booking/confirmation/:bookingId" element={<BookingConfirmationPage />} />
        </Route>

        {/* Dashboard Routes (Protected) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHomePage />} />
          <Route path="bookings" element={<BookingsManagementPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;