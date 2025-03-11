
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HeaderWithDashboard = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="fixed w-full bg-white z-50 shadow-subtle">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-learnzy-purple font-bold text-2xl">Learnzy</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg ${
                isActive('/') ? 'text-learnzy-purple font-medium' : 'text-muted-foreground hover:text-learnzy-dark'
              }`}
            >
              Home
            </Link>
            <Link
              to="/subjects"
              className={`px-4 py-2 rounded-lg ${
                isActive('/subjects') ? 'text-learnzy-purple font-medium' : 'text-muted-foreground hover:text-learnzy-dark'
              }`}
            >
              Tests
            </Link>
            <Link
              to="/learn-more"
              className={`px-4 py-2 rounded-lg ${
                isActive('/learn-more') ? 'text-learnzy-purple font-medium' : 'text-muted-foreground hover:text-learnzy-dark'
              }`}
            >
              About
            </Link>
          </nav>
          
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className={`px-3 py-1 flex items-center ${
                    isActive('/profile') ? 'text-learnzy-purple font-medium' : 'text-muted-foreground hover:text-learnzy-dark'
                  }`}
                >
                  <User className="w-4 h-4 mr-1" />
                  <span className="hidden md:inline">{user.email?.split('@')[0]}</span>
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="button-secondary-small flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  <span className="hidden md:inline">Sign Out</span>
                </button>
              </>
            ) : (
              <Link to="/auth" className="button-primary-small">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderWithDashboard;
