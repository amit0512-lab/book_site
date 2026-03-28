import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCreateOrder } from '../hooks/useOrders';
import { formatPrice } from '../utils/formatPrice';
import { validateRequired, validatePhone, validatePincode } from '../utils/validators';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { user, userProfile } = useAuth();
  const createOrderMutation = useCreateOrder();

  const [shippingAddress, setShippingAddress] = useState({
    name: userProfile?.name || '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!validateRequired(shippingAddress.name)) {
      newErrors.name = 'Name is required';
    }

    if (!validateRequired(shippingAddress.phone)) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(shippingAddress.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!validateRequired(shippingAddress.street)) {
      newErrors.street = 'Street address is required';
    }

    if (!validateRequired(shippingAddress.city)) {
      newErrors.city = 'City is required';
    }

    if (!validateRequired(shippingAddress.state)) {
      newErrors.state = 'State is required';
    }

    if (!validateRequired(shippingAddress.pincode)) {
      newErrors.pincode = 'Pincode is required';
    } else if (!validatePincode(shippingAddress.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setShippingAddress(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      const orderData = {
        userId: user.uid,
        items: cart.map(item => ({
          bookId: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          coverUrl: item.coverUrl
        })),
        total: getCartTotal(),
        shippingAddress,
        paymentMethod: 'cod'
      };

      const orderId = await createOrderMutation.mutateAsync(orderData);
      clearCart();
      navigate(`/order-success/${orderId}`);
    } catch (error) {
      console.error('Order creation error:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some books to proceed with checkout</p>
          <Button onClick={() => navigate('/shop')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Shipping Information
            </h2>

            <div className="space-y-4">
              <Input
                label="Full Name *"
                value={shippingAddress.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors.name}
                placeholder="Enter your full name"
              />

              <Input
                label="Phone Number *"
                type="tel"
                value={shippingAddress.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                error={errors.phone}
                placeholder="Enter 10-digit phone number"
              />

              <Input
                label="Street Address *"
                value={shippingAddress.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
                error={errors.street}
                placeholder="House no, Building, Street"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="City *"
                  value={shippingAddress.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  error={errors.city}
                  placeholder="City"
                />

                <Input
                  label="State *"
                  value={shippingAddress.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  error={errors.state}
                  placeholder="State"
                />
              </div>

              <Input
                label="Pincode *"
                value={shippingAddress.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                error={errors.pincode}
                placeholder="6-digit pincode"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.coverUrl || '/placeholder-book.jpg'}
                    alt={item.title}
                    className="w-16 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">by {item.author}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(getCartTotal())}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total</span>
                <span className="text-blue-600">{formatPrice(getCartTotal())}</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-blue-900 mb-2">Payment Method</h3>
              <p className="text-blue-800 text-sm">
                Cash on Delivery (COD) - Pay when you receive your order
              </p>
            </div>

            <Button
              onClick={handlePlaceOrder}
              loading={createOrderMutation.isPending}
              className="w-full"
              size="lg"
            >
              Place Order
            </Button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              By placing your order, you agree to our terms and conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;