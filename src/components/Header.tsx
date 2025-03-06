
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, UserCircle, Sun, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const location = useLocation();
  const isTestPage = location.pathname.includes('/test');
  const { user, signOut } = useAuth();

  // Don't show header on the test page to avoid distractions
  if (isTestPage) return null;

  return (
    <header className="py-4 px-6 md:px-8 fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-gray-100">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group transition-all duration-300"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-learnzy-purple to-learnzy-blue rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
              <Book className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-display font-semibold text-learnzy-dark">
              Learnzy
            </span>
          </Link>

          <div className="flex items-center space-x-3">
            <button className="button-ghost !py-2 !px-3">
              <Sun className="w-5 h-5" />
            </button>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700 hidden md:inline">
                  {user.email}
                </span>
                <button 
                  onClick={() => signOut()}
                  className="button-ghost !py-2 !px-3 flex items-center"
                  title="Sign out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="button-ghost !py-2 !px-3">
                <UserCircle className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
