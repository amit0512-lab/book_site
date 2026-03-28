import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Eye, ShoppingBag } from 'lucide-react';
import { useUserOrders } from '../hooks/useOrders';
import { formatPrice } from '../utils/formatPrice';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import Spinner from '../components/ui/Spinner';

const OrderHistory = () => {
  const { data: orders, isLoading, error } = useUserOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Orders</h2>
          <p className="text-gray-600 mb-6">There was an error loading your orders.</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
          <Link to="/shop">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <Link to="/shop">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order #{order.id}
                  </h3>
                  <p className="text-gray-600">
                    Placed on {order.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant={order.status}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-semibold text-blue-600">{formatPrice(order.total)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Items</p>
                  <p className="font-semibold">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)} books
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment</p>
                  <p className="font-semibold">Cash on Delivery</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Delivery Address</p>
                  <p className="font-semibold">{order.shippingAddress.city}</p>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="flex items-center space-x-4 overflow-x-auto">
                {order.items.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex-shrink-0 flex items-center space-x-2">
                    <img
                      src={item.coverUrl || '/placeholder-book.jpg'}
                      alt={item.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate max-w-32">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
                {order.items.length > 3 && (
                  <div className="flex-shrink-0 text-sm text-gray-600">
                    +{order.items.length - 3} more items
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Order Detail Modal */}
        <Modal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          title={`Order #${selectedOrder?.id}`}
          size="lg"
        >
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Status */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">
                    Placed on {selectedOrder.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                  </p>
                </div>
                <Badge variant={selectedOrder.status}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </Badge>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.coverUrl || '/placeholder-book.jpg'}
                        alt={item.title}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                        <p className="text-sm text-gray-600">{formatPrice(item.price)} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total Amount</span>
                  <span className="text-blue-600">{formatPrice(selectedOrder.total)}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Payment Method: Cash on Delivery</p>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">{selectedOrder.shippingAddress.name}</p>
                  <p className="text-gray-600">{selectedOrder.shippingAddress.phone}</p>
                  <p className="text-gray-600">
                    {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}
                  </p>
                  <p className="text-gray-600">
                    {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default OrderHistory;