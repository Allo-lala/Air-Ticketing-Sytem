import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Menu, X, Plane, User, LogOut, Home, 
  Briefcase, Users, Settings, ChevronDown,
  Bell, Search
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isAdmin = user.role === 'admin';
  const isAgent = user.role === 'agent';
  const isAccountant = user.role === 'accountant';

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow bg-primary-800 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Link to="/" className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">SkyWays</span>
            </Link>
          </div>
          <div className="mt-8 flex-1 flex flex-col">
            <nav className="flex-1 px-4 space-y-1">
              <Link
                to="/dashboard"
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
                  location.pathname === '/dashboard'
                    ? 'bg-primary-700 text-white'
                    : 'text-primary-100 hover:bg-primary-700'
                }`}
              >
                <Home className="mr-3 h-5 w-5" />
                Dashboard
              </Link>

              <Link
                to="/dashboard/bookings"
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
                  location.pathname === '/dashboard/bookings'
                    ? 'bg-primary-700 text-white'
                    : 'text-primary-100 hover:bg-primary-700'
                }`}
              >
                <Briefcase className="mr-3 h-5 w-5" />
                Bookings
              </Link>

              {(isAdmin || isAgent) && (
                <Link
                  to="/dashboard/users"
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
                    location.pathname === '/dashboard/users'
                      ? 'bg-primary-700 text-white'
                      : 'text-primary-100 hover:bg-primary-700'
                  }`}
                >
                  <Users className="mr-3 h-5 w-5" />
                  Users
                </Link>
              )}

              <Link
                to="/dashboard/profile"
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
                  location.pathname === '/dashboard/profile'
                    ? 'bg-primary-700 text-white'
                    : 'text-primary-100 hover:bg-primary-700'
                }`}
              >
                <User className="mr-3 h-5 w-5" />
                Profile
              </Link>

              {isAdmin && (
                <Link
                  to="/dashboard/settings"
                  className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
                    location.pathname === '/dashboard/settings'
                      ? 'bg-primary-700 text-white'
                      : 'text-primary-100 hover:bg-primary-700'
                  }`}
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Settings
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-40 flex md:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        ></div>

        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-primary-800">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <Link to="/" className="flex items-center space-x-2">
                <Plane className="h-8 w-8 text-white" />
                <span className="text-xl font-bold text-white">SkyWays</span>
              </Link>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              <Link
                to="/dashboard"
                className={`flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  location.pathname === '/dashboard'
                    ? 'bg-primary-700 text-white'
                    : 'text-primary-100 hover:bg-primary-700'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Home className="mr-3 h-5 w-5" />
                Dashboard
              </Link>

              <Link
                to="/dashboard/bookings"
                className={`flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  location.pathname === '/dashboard/bookings'
                    ? 'bg-primary-700 text-white'
                    : 'text-primary-100 hover:bg-primary-700'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Briefcase className="mr-3 h-5 w-5" />
                Bookings
              </Link>

              {(isAdmin || isAgent) && (
                <Link
                  to="/dashboard/users"
                  className={`flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    location.pathname === '/dashboard/users'
                      ? 'bg-primary-700 text-white'
                      : 'text-primary-100 hover:bg-primary-700'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Users className="mr-3 h-5 w-5" />
                  Users
                </Link>
              )}

              <Link
                to="/dashboard/profile"
                className={`flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  location.pathname === '/dashboard/profile'
                    ? 'bg-primary-700 text-white'
                    : 'text-primary-100 hover:bg-primary-700'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <User className="mr-3 h-5 w-5" />
                Profile
              </Link>

              {isAdmin && (
                <Link
                  to="/dashboard/settings"
                  className={`flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    location.pathname === '/dashboard/settings'
                      ? 'bg-primary-700 text-white'
                      : 'text-primary-100 hover:bg-primary-700'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Settings
                </Link>
              )}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-primary-700 p-4">
            <div className="flex items-center">
              <div>
                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs font-medium text-primary-300">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 md:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              {location.pathname === '/dashboard' && 'Dashboard'}
              {location.pathname === '/dashboard/bookings' && 'Bookings Management'}
              {location.pathname === '/dashboard/users' && 'User Management'}
              {location.pathname === '/dashboard/profile' && 'My Profile'}
              {location.pathname === '/dashboard/settings' && 'System Settings'}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <div className="relative">
                <button className="text-gray-600 hover:text-gray-900">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                </button>
              </div>
              <div className="relative">
                <button className="flex items-center text-gray-700 hover:text-primary-600">
                  <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <span className="ml-2 hidden lg:block">{user.name}</span>
                  <ChevronDown className="ml-1 h-4 w-4 hidden lg:block" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 md:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;