import { useState } from 'react';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const BookDetail = ({ book }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isInCart, getItemQuantity } = useCart();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(book);
    }
    setQuantity(1);
  };

  const incrementQuantity = () => {
    if (quantity < book.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const currentCartQuantity = getItemQuantity(book.id);
  const maxQuantity = book.stock - currentCartQuantity;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Book Cover */}
      <div className="space-y-4">
        <div className="relative">
          <img
            src={book.coverUrl || '/placeholder-book.jpg'}
            alt={book.title}
            className="w-full max-w-md mx-auto rounded-lg shadow-lg"
          />
          
          {book.featured && (
            <Badge variant="primary" className="absolute top-4 left-4">
              Featured
            </Badge>
          )}
        </div>
      </div>

      {/* Book Details */}
      <div className="space-y-6">
        <div>
          <Badge variant="default" className="mb-2">
            {book.genre}
          </Badge>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {book.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-4">
            by {book.author}
          </p>
          
          <div className="text-3xl font-bold text-blue-600 mb-4">
            {formatPrice(book.price)}
          </div>
        </div>

        {/* Stock Status */}
        <div>
          {book.stock > 0 ? (
            <div className="flex items-center space-x-2">
              <Badge variant="success">In Stock</Badge>
              <span className="text-sm text-gray-600">
                {book.stock} available
              </span>
            </div>
          ) : (
            <Badge variant="danger">Out of Stock</Badge>
          )}
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-700 leading-relaxed">
            {book.description}
          </p>
        </div>

        {/* Book Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-900">ISBN:</span>
            <p className="text-gray-600">{book.isbn}</p>
          </div>
          <div>
            <span className="font-medium text-gray-900">Published:</span>
            <p className="text-gray-600">{book.publishedYear}</p>
          </div>
        </div>

        {/* Add to Cart */}
        {book.stock > 0 && maxQuantity > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= maxQuantity}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-gray-600">
                Max: {maxQuantity}
              </span>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full sm:w-auto"
              size="lg"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart - {formatPrice(book.price * quantity)}
            </Button>
          </div>
        )}

        {currentCartQuantity > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              You have {currentCartQuantity} of this book in your cart
            </p>
          </div>
        )}

        {book.stock <= 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">
              This book is currently out of stock
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;