import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  Clock, 
  Menu, 
  X, 
  Home,
  FileText,
  LogOut,
  Calendar
} from 'lucide-react';

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Clear from localStorage
    setIsAuthenticated(false);
    
    navigate('/');
  };
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const navLinks = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/form', label: 'Form', icon: FileText }
  ];

  return (
    <nav className="bg-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Main Navbar Content */}
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <img
              src="/Images/logo.png"
              alt="Police Logo"
              className="h-14 object-contain transition-transform duration-300 hover:scale-105"
            />
            <div className="border-l border-white/30 pl-4">
              <h1 className="text-white text-lg font-semibold">
                Greater Chennai Police
              </h1>
              <p className="text-white/80 text-sm">
                Traffic Division
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Date & Time Display */}
            <div className="flex items-center gap-6 text-white/90 mr-6">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span className="text-sm">{formatDate(currentTime)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span className="text-sm font-medium">{formatTime(currentTime)}</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 text-white hover:text-white/80 transition-colors px-3 py-2 rounded-lg
                    ${location.pathname === link.path ? 'bg-white/10' : ''}`}
                >
                  <link.icon size={18} />
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium 
                  hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${
          isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        } lg:hidden overflow-hidden transition-all duration-300 ease-in-out`}>
          <div className="pt-4 pb-2 space-y-2">
            {/* Mobile Date & Time */}
            <div className="text-white/80 space-y-2 px-2 py-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span className="text-sm">{formatDate(currentTime)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span className="text-sm font-medium">{formatTime(currentTime)}</span>
              </div>
            </div>

            {/* Mobile Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors
                  ${location.pathname === link.path ? 'bg-white/10' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}
            
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;