import { BookOpen, ShoppingBag, Users, DollarSign } from 'lucide-react';
import { useBooks } from '../../hooks/useBooks';
import { useOrderStats } from '../../hooks/useOrders';
import { formatPrice, formatNumber } from '../../utils/formatPrice';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Spinner from '../../components/ui/Spinner';

const Dashboard = () => {
  const { data: booksData, isLoading: booksLoading } = useBooks();
  const { data: orderStats, isLoading: statsLoading } = useOrderStats();

  const stats = [
    {
      title: 'Total Books',
      value: booksLoading ? '...' : formatNumber(booksData?.books?.length || 0),
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Orders',
      value: statsLoading ? '...' : formatNumber(orderStats?.totalOrders || 0),
      icon: ShoppingBag,
      color: 'bg-green-500'
    },
    {
      title: 'Pending Orders',
      value: statsLoading ? '...' : formatNumber(orderStats?.pendingOrders || 0),
      icon: Users,
      color: 'bg-yellow-500'
    },
    {
      title: 'Total Revenue',
      value: statsLoading ? '...' : formatPrice(orderStats?.totalRevenue || 0),
      icon: DollarSign,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to the admin panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <a
                href="/admin/books/add"
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Add New Book</p>
                    <p className="text-sm text-gray-600">Add a new book to your inventory</p>
                  </div>
                </div>
              </a>
              
              <a
                href="/admin/orders"
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <ShoppingBag className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Manage Orders</p>
                    <p className="text-sm text-gray-600">View and update order status</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Database</span>
                <span className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                  Online
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Storage</span>
                <span className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                  Online
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Authentication</span>
                <span className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;