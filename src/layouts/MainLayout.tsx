import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const MainLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Plane className="h-8 w-8 text-primary-600" />
                <span className="text-xl font-bold text-primary-800">SkyWays</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/flights/search" 
                className={`font-medium ${location.pathname.includes('/flights') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'}`}
              >
                Find Flights
              </Link>
              <Link 
                to="#" 
                className="font-medium text-gray-700 hover:text-primary-600"
              >
                Deals
              </Link>
              <Link 
                to="#" 
                className="font-medium text-gray-700 hover:text-primary-600"
              >
                About
              </Link>
              <Link 
                to="#" 
                className="font-medium text-gray-700 hover:text-primary-600"
              >
                Contact
              </Link>
              
              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 font-medium text-gray-700 hover:text-primary-600">
                    <User className="h-5 w-5" />
                    <span>{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/dashboard/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button 
                      onClick={logout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/login" 
                    className="font-medium text-gray-700 hover:text-primary-600"
                  >
                    Sign in
                  </Link>
                  <Link 
                    to="/register" 
                    className="btn-primary"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="text-gray-700">
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 animate-slide-up">
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/flights/search" 
                  className={`font-medium ${location.pathname.includes('/flights') ? 'text-primary-600' : 'text-gray-700'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Find Flights
                </Link>
                <Link 
                  to="#" 
                  className="font-medium text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Deals
                </Link>
                <Link 
                  to="#" 
                  className="font-medium text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="#" 
                  className="font-medium text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                
                {user ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="font-medium text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/dashboard/profile" 
                      className="font-medium text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center font-medium text-gray-700"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Sign out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link 
                      to="/login" 
                      className="btn-secondary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link 
                      to="/register" 
                      className="btn-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white pt-10 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Plane className="h-8 w-8 text-primary-400" />
                <span className="text-xl font-bold text-white">SkyWays</span>
              </div>
              <p className="text-gray-400 mb-4">
                Book your flights with ease. Travel the world with confidence.
              </p>
              <div className="flex space-x-4">
                {/* Social media icons would go here */}
              </div>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li><Link to="/flights/search" className="text-gray-400 hover:text-white">Search Flights</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Special Deals</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Destinations</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Travel Guides</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-4">Support</h5>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-400 hover:text-white">FAQs</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Customer Service</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Cancellation Policy</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-lg font-semibold mb-4">Contact Us</h5>
              <ul className="space-y-2">
                <li className="text-gray-400">Email: contact@skyways.com</li>
                <li className="text-gray-400">Phone: +1 (555) 123-4567</li>
                <li className="text-gray-400">Address: 123 Aviation Way, Sky City, SC 12345</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} SkyWays. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;