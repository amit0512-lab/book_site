import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Clock } from 'lucide-react';
import { useOrder } from '../hooks/useOrders';
import { formatPrice } from '../utils/formatPrice';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Spinner from '../components/ui/Spinner';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const { data: order, isLoading, error } = useOrder(orderId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
          <Link to="/orders">
            <Button>View All Orders</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your order. We'll send you updates via email.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Order #{order.id}
              </h2>
              <p className="text-gray-600">
                Placed on {order.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
              </p>
            </div>
            <Badge variant={order.status}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>

          {/* Order Items */}
          <div className="space-y-4 mb-6">
            <h3 className="font-medium text-gray-900">Items Ordered</h3>
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
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

          {/* Order Total */}
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Amount</span>
              <span className="text-blue-600">{formatPrice(order.total)}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Payment Method: Cash on Delivery</p>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">{order.shippingAddress.name}</p>
              <p className="text-gray-600">{order.shippingAddress.phone}</p>
              <p className="text-gray-600">
                {order.shippingAddress.street}, {order.shippingAddress.city}
              </p>
              <p className="text-gray-600">
                {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="font-medium text-blue-900 mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            What happens next?
          </h3>
          <div className="space-y-2 text-blue-800">
            <p className="flex items-start">
              <span className="font-medium mr-2">1.</span>
              We'll process your order and prepare it for shipping
            </p>
            <p className="flex items-start">
              <span className="font-medium mr-2">2.</span>
              You'll receive a confirmation email with tracking details
            </p>
            <p className="flex items-start">
              <span className="font-medium mr-2">3.</span>
              Your order will be delivered within 3-5 business days
            </p>
            <p className="flex items-start">
              <span className="font-medium mr-2">4.</span>
              Pay cash when you receive your books
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/orders">
            <Button variant="outline" className="w-full sm:w-auto">
              <Package className="h-4 w-4 mr-2" />
              View All Orders
            </Button>
          </Link>
          <Link to="/shop">
            <Button className="w-full sm:w-auto">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;