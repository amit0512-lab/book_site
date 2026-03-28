import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Truck, Shield, Star, Brain, Zap, Sparkles, Bot, Angry } from 'lucide-react';
import { useFeaturedBooks } from '../hooks/useBooks';
import { isDemoMode } from '../services/firebase';
import BookGrid from '../components/books/BookGrid';
import Button from '../components/ui/Button';

const Home = () => {
  const { data: featuredBooksData, isLoading, error } = useFeaturedBooks(6);

  // AI-themed demo books
  const demoBooks = [
    {
      id: 'demo-1',
      title: 'Artificial Intelligence: A Modern Approach',
      author: 'Stuart Russell & Peter Norvig',
      description: 'The definitive guide to AI, covering machine learning, neural networks, and cognitive computing.',
      price: 899,
      stock: 25,
      genre: 'AI & Technology',
      featured: true,
      coverUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=600&fit=crop'
    },
    {
      id: 'demo-2',
      title: 'Deep Learning Revolution',
      author: 'Terrence J. Sejnowski',
      description: 'How deep neural networks are transforming our world and reshaping the future.',
      price: 749,
      stock: 30,
      genre: 'Machine Learning',
      featured: true,
      coverUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=600&fit=crop'
    },
    {
      id: 'demo-3',
      title: 'The Singularity is Near',
      author: 'Ray Kurzweil',
      description: 'A visionary exploration of the future of AI and human-machine convergence.',
      price: 649,
      stock: 40,
      genre: 'Future Tech',
      featured: true,
      coverUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=600&fit=crop'
    }
  ];

  const genres = [
    { name: 'AI & Machine Learning', icon: Brain, count: '500+', gradient: 'from-purple-500 to-pink-500' },
    { name: 'Data Science', icon: Zap, count: '300+', gradient: 'from-blue-500 to-cyan-500' },
    { name: 'Robotics', icon: Bot, count: '200+', gradient: 'from-green-500 to-teal-500' },
    { name: 'Future Tech', icon: Sparkles, count: '150+', gradient: 'from-orange-500 to-red-500' },
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Recommendations',
      description: 'Smart algorithms suggest books based on your reading patterns and preferences',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Search',
      description: 'Advanced search powered by machine learning for instant, relevant results',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Secure AI Transactions',
      description: 'Blockchain-secured payments with AI fraud detection for maximum security',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: Sparkles,
      title: 'Smart Delivery',
      description: 'AI-optimized logistics for predictive delivery and real-time tracking',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  // Use demo books if in demo mode or if no data is available
  const booksToShow = isDemoMode ? demoBooks : (featuredBooksData?.books || demoBooks);
  const showDemoNotice = isDemoMode || (!featuredBooksData?.books && !isLoading);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* AI Demo Notice */}
      {showDemoNotice && (
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 border-b border-purple-500/30 px-4 py-3">
          <div className="max-w-7xl mx-auto">
            <p className="text-purple-100 text-sm font-medium flex items-center">
              <Bot className="h-4 w-4 mr-2" />
              <strong>AI Demo Mode:</strong> Experience our intelligent bookstore with sample data. 
              Configure Firebase to unlock full AI capabilities. 
              <a href="#setup" className="underline ml-1 hover:text-purple-200">Setup Guide</a>
            </p>
          </div>
        </div>
      )}

      {/* Hero Section - AI Theme */}
      <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-blue-500 rounded-full blur-lg animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-500 rounded-full blur-md animate-ping"></div>
          <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-cyan-500 rounded-full blur-lg animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Brain className="h-16 w-16 text-purple-400 mr-4 animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              AI-Powered
              <span className="block text-white">BookStore</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Discover your next great read with artificial intelligence. Smart recommendations, 
              intelligent search, and personalized book discovery powered by advanced ML algorithms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 font-semibold px-8 py-4 shadow-lg shadow-purple-500/25">
                  <Brain className="mr-2 h-5 w-5" />
                  Explore AI Books
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/shop?featured=true">
                <Button variant="outline" size="lg" className="border-2 border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white font-semibold px-8 py-4 bg-transparent backdrop-blur-sm">
                  <Sparkles className="mr-2 h-5 w-5" />
                  AI Recommendations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
              <Zap className="h-10 w-10 text-yellow-400 mr-4" />
              Why Choose AI BookStore?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of book discovery with cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className={`bg-gradient-to-br ${feature.gradient} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI-Curated Books Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
              <Bot className="h-10 w-10 text-purple-400 mr-4 animate-pulse" />
              AI-Curated Collection
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Books selected by our advanced recommendation engine based on trending topics and user preferences
            </p>
          </div>
          
          <BookGrid 
            books={booksToShow} 
            loading={isLoading && !isDemoMode} 
            error={error && !isDemoMode ? error : null} 
          />
          
          {booksToShow?.length > 0 && (
            <div className="text-center mt-12">
              <Link to="/shop?featured=true">
                <Button variant="outline" size="lg" className="border-2 border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white bg-transparent font-semibold px-8 py-4">
                  <Brain className="mr-2 h-5 w-5" />
                  View All AI Recommendations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* AI Categories Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
              <Sparkles className="h-10 w-10 text-cyan-400 mr-4" />
              Explore AI Categories
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Dive deep into the world of artificial intelligence and emerging technologies
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {genres.map((genre, index) => {
              const Icon = genre.icon;
              return (
                <Link
                  key={index}
                  to={`/shop?genre=${genre.name}`}
                  className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className={`bg-gradient-to-br ${genre.gradient} h-48 flex flex-col items-center justify-center relative`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    <Icon className="h-16 w-16 text-white mb-4 z-10 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold text-white mb-2 z-10">{genre.name}</h3>
                    <p className="text-white/90 text-sm z-10">{genre.count} books</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Setup Guide Section - AI Theme */}
      {showDemoNotice && (
        <section id="setup" className="py-20 bg-gradient-to-br from-purple-900 to-blue-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
                <Bot className="h-10 w-10 text-purple-400 mr-4" />
                Activate AI Features
              </h2>
              <p className="text-xl text-purple-100 max-w-2xl mx-auto">
                Connect your Firebase backend to unlock the full power of our AI-driven bookstore
              </p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-purple-500/30">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Initialize AI Backend</h3>
                    <p className="text-gray-300">Create your Firebase project and enable AI-powered services</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Configure ML Services</h3>
                    <p className="text-gray-300">Enable Authentication, Firestore, and Storage for intelligent features</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Deploy AI Configuration</h3>
                    <p className="text-gray-300">Update your environment with real Firebase credentials to activate AI features</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* AI CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Brain className="h-16 w-16 mx-auto mb-6 text-white animate-pulse" />
          <h2 className="text-4xl font-bold mb-4">
            Ready to Experience AI-Powered Reading?
          </h2>
          <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            Join thousands of readers discovering their next favorite books through artificial intelligence
          </p>
          <Link to="/shop">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 border-0 font-semibold px-8 py-4 shadow-lg">
              <Zap className="mr-2 h-5 w-5" />
              Start AI Discovery
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;