import { Brain, Mail, Phone, MapPin, Zap, Bot, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-500 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-pink-500 rounded-full blur-xl animate-ping"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* AI Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Brain className="h-10 w-10 text-purple-400 animate-pulse" />
                <div className="absolute -inset-1 bg-purple-500/20 rounded-full blur-sm"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                AI BookStore
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your intelligent destination for discovering books through artificial intelligence. 
              Experience the future of personalized reading recommendations.
            </p>
            <div className="flex items-center space-x-2 text-purple-300">
              <Bot className="h-5 w-5" />
              <span className="text-sm">Powered by Advanced AI</span>
            </div>
          </div>

          {/* AI Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Zap className="h-5 w-5 text-yellow-400 mr-2" />
              AI Features
            </h3>
            <div className="space-y-3">
              <Link to="/" className="block text-gray-400 hover:text-purple-300 transition-colors group">
                <span className="flex items-center">
                  <Brain className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                  Smart Recommendations
                </span>
              </Link>
              <Link to="/shop" className="block text-gray-400 hover:text-blue-300 transition-colors group">
                <span className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 group-hover:animate-spin" />
                  Intelligent Search
                </span>
              </Link>
              <Link to="/cart" className="block text-gray-400 hover:text-cyan-300 transition-colors group">
                <span className="flex items-center">
                  <Bot className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                  AI Shopping Assistant
                </span>
              </Link>
              <Link to="/orders" className="block text-gray-400 hover:text-pink-300 transition-colors group">
                <span className="flex items-center">
                  <Zap className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                  Predictive Delivery
                </span>
              </Link>
            </div>
          </div>

          {/* AI Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Sparkles className="h-5 w-5 text-cyan-400 mr-2" />
              AI Categories
            </h3>
            <div className="space-y-2">
              <Link to="/shop?genre=AI & Machine Learning" className="block text-gray-400 hover:text-purple-300 transition-colors">
                AI & Machine Learning
              </Link>
              <Link to="/shop?genre=Data Science" className="block text-gray-400 hover:text-blue-300 transition-colors">
                Data Science
              </Link>
              <Link to="/shop?genre=Robotics" className="block text-gray-400 hover:text-green-300 transition-colors">
                Robotics & Automation
              </Link>
              <Link to="/shop?genre=Future Tech" className="block text-gray-400 hover:text-orange-300 transition-colors">
                Future Technology
              </Link>
            </div>
          </div>

          {/* AI Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Bot className="h-5 w-5 text-pink-400 mr-2" />
              Connect with AI
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400 group hover:text-purple-300 transition-colors">
                <Mail className="h-4 w-4 group-hover:animate-bounce" />
                <span>ai@bookstore.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 group hover:text-blue-300 transition-colors">
                <Phone className="h-4 w-4 group-hover:animate-pulse" />
                <span>+91 AI-BOOKS (24-26657)</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 group hover:text-cyan-300 transition-colors">
                <MapPin className="h-4 w-4 group-hover:animate-ping" />
                <span>AI Valley, Tech City 2050</span>
              </div>
            </div>
            
            {/* AI Status Indicator */}
            <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-purple-500/30 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-300">AI Systems Online</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Neural networks active • ML models updated
              </div>
            </div>
          </div>
        </div>

        {/* AI Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400 flex items-center justify-center md:justify-start">
                <Brain className="h-4 w-4 mr-2 animate-pulse" />
                &copy; 2026 AI BookStore. Powered by Advanced Machine Learning.
              </p>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="flex items-center">
                <Zap className="h-3 w-3 mr-1 text-yellow-400" />
                99.9% AI Uptime
              </span>
              <span className="flex items-center">
                <Bot className="h-3 w-3 mr-1 text-purple-400" />
                24/7 AI Support
              </span>
              <span className="flex items-center">
                <Sparkles className="h-3 w-3 mr-1 text-cyan-400" />
                Smart & Secure
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;