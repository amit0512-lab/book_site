import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const BookCard = ({ book }) => {
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book);
  };

  return (
    <div className="card group hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden">
        <img
          src={book.coverUrl || '/placeholder-book.jpg'}
          alt={book.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {book.featured && (
          <Badge variant="primary" className="absolute top-2 left-2">
            Featured
          </Badge>
        )}
        
        {book.stock <= 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Badge variant="danger">Out of Stock</Badge>
          </div>
        )}
        
        {book.stock > 0 && book.stock <= 5 && (
          <Badge variant="warning" className="absolute top-2 right-2">
            Only {book.stock} left
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <Badge variant="default" className="text-xs">
            {book.genre}
          </Badge>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
          {book.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-2">
          by {book.author}
        </p>
        
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {book.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">
            {formatPrice(book.price)}
          </span>
          
          <div className="flex items-center space-x-2">
            <Link to={`/book/${book.id}`}>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
            
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={book.stock <= 0 || isInCart(book.id)}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {isInCart(book.id) ? 'Added' : 'Add'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;