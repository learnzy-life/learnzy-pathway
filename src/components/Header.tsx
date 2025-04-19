import { Menu, User, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuth()
  const location = useLocation()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const handleSignOut = async () => {
    await signOut()
    closeMenu()
  }

  const navItems = [
    { name: 'Home', path: '/' }
  ]

  return (
    <header className="fixed w-full bg-white border-b border-gray-100 z-50 top-4 sm:top-6">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className="font-display font-bold text-xl text-learnzy-dark">
              Learnzy
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center text-learnzy-dark hover:text-learnzy-purple transition-colors"
                >
                  <User className="w-5 h-5 mr-1" />
                  <span>{user.email?.split('@')[0] || 'Profile'}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="button-secondary"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link to="/auth" className="button-primary">
                Sign In
              </Link>
            )}
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-learnzy-dark" />
            ) : (
              <Menu className="h-6 w-6 text-learnzy-dark" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={closeMenu}
                  className={`py-2 ${
                    location.pathname === item.path
                      ? 'text-learnzy-purple font-medium'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="py-2 text-muted-foreground"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="py-2 text-left text-red-500"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={closeMenu}
                  className="py-2 text-learnzy-purple font-medium"
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
