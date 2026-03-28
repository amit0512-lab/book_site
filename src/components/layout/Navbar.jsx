import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Brain, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, userProfile, logout, isAdmin } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const cartItemsCount = getCartItemsCount();

  return (
    <nav className="bg-gray-900 shadow-2xl sticky top-0 z-40 border-b border-purple-500/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* AI Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Brain className="h-8 w-8 text-purple-400 group-hover:text-purple-300 transition-colors animate-pulse" />
              <div className="absolute -inset-1 bg-purple-500/20 rounded-full blur-sm group-hover:bg-purple-400/30 transition-colors"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AI BookStore
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-purple-400 transition-colors font-medium relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/shop" className="text-gray-300 hover:text-blue-400 transition-colors font-medium relative group">
              AI Shop
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
            </Link>
            {user && (
              <Link to="/orders" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium relative group">
                My Orders
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
              </Link>
            )}
            {isAdmin() && (
              <Link to="/admin" className="text-gray-300 hover:text-pink-400 transition-colors font-medium relative group">
                AI Admin
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 transition-all group-hover:w-full"></span>
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* AI Cart */}
            <Link to="/cart" className="relative p-2 text-gray-300 hover:text-purple-400 transition-colors group">
              <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* AI User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-gray-800/50 backdrop-blur-sm"
                >
                  <User className="h-6 w-6" />
                  <span className="hidden md:block font-medium">{userProfile?.name || user.displayName}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-2xl py-2 z-50 border border-purple-500/30">
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/20 hover:text-purple-300 font-medium transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    {isAdmin() && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-pink-500/20 hover:text-pink-300 font-medium transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="inline h-4 w-4 mr-2" />
                        AI Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-red-500/20 hover:text-red-300 font-medium transition-colors"
                    >
                      <LogOut className="inline h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="border-purple-400/50 text-purple-300 hover:bg-purple-400/20 hover:border-purple-400 bg-transparent">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
                    Join AI
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-purple-400 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-purple-500/30 py-4 bg-gray-800/50 backdrop-blur-sm">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="block px-4 py-2 text-gray-300 hover:bg-purple-500/20 hover:text-purple-300 rounded font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="block px-4 py-2 text-gray-300 hover:bg-blue-500/20 hover:text-blue-300 rounded font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Shop
              </Link>
              {user && (
                <Link
                  to="/orders"
                  className="block px-4 py-2 text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-300 rounded font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Orders
                </Link>
              )}
              {isAdmin() && (
                <Link
                  to="/admin"
                  className="block px-4 py-2 text-gray-300 hover:bg-pink-500/20 hover:text-pink-300 rounded font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  AI Admin Panel
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;