import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LifeBuoy, BookOpen, LayoutDashboard, Bell } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const isLandingPage = location.pathname === '/';
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isLandingPage 
          ? scrolled 
            ? 'bg-white shadow-md' 
            : 'bg-transparent'
          : 'bg-white shadow-md'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <LifeBuoy className={`w-8 h-8 ${isLandingPage && !scrolled ? 'text-white' : 'text-blue-600'}`} />
            <span className={`font-bold text-xl ${isLandingPage && !scrolled ? 'text-white' : 'text-gray-900'}`}>
              Recovery Road
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/dashboard" 
              className={`font-medium hover:text-blue-600 transition-colors ${
                isLandingPage && !scrolled 
                  ? 'text-white hover:text-blue-200' 
                  : isActive('/dashboard') 
                    ? 'text-blue-600' 
                    : 'text-gray-700'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/chat" 
              className={`font-medium hover:text-blue-600 transition-colors ${
                isLandingPage && !scrolled 
                  ? 'text-white hover:text-blue-200' 
                  : isActive('/chat') 
                    ? 'text-blue-600' 
                    : 'text-gray-700'
              }`}
            >
              Support Chat
            </Link>
            <Link 
              to="/resources" 
              className={`font-medium hover:text-blue-600 transition-colors ${
                isLandingPage && !scrolled 
                  ? 'text-white hover:text-blue-200' 
                  : isActive('/resources') 
                    ? 'text-blue-600' 
                    : 'text-gray-700'
              }`}
            >
              Resources
            </Link>
          </nav>
          
          {/* User Menu (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="relative">
              <Bell className={`w-5 h-5 ${isLandingPage && !scrolled ? 'text-white' : 'text-gray-700'}`} />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                3
              </span>
            </button>
            
            <Link 
              to="/profile" 
              className={`flex items-center space-x-1 ${
                isLandingPage && !scrolled 
                  ? 'text-white hover:text-blue-200' 
                  : 'text-gray-700 hover:text-blue-600'
              } transition-colors`}
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <span className="font-medium">Profile</span>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 focus:outline-none ${isLandingPage && !scrolled ? 'text-white' : 'text-gray-700'}`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 pb-4">
          <nav className="container mx-auto px-4 py-2 space-y-2">
            <Link 
              to="/dashboard" 
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <LayoutDashboard className="w-5 h-5 text-blue-600" />
              <span className={`font-medium ${isActive('/dashboard') ? 'text-blue-600' : 'text-gray-700'}`}>
                Dashboard
              </span>
            </Link>
            
            <Link 
              to="/chat" 
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <LifeBuoy className="w-5 h-5 text-blue-600" />
              <span className={`font-medium ${isActive('/chat') ? 'text-blue-600' : 'text-gray-700'}`}>
                Support Chat
              </span>
            </Link>
            
            <Link 
              to="/resources" 
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className={`font-medium ${isActive('/resources') ? 'text-blue-600' : 'text-gray-700'}`}>
                Resources
              </span>
            </Link>
            
            <Link 
              to="/profile" 
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="w-5 h-5 text-blue-600" />
              <span className={`font-medium ${isActive('/profile') ? 'text-blue-600' : 'text-gray-700'}`}>
                Profile
              </span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;