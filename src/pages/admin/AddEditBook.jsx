import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { useBook, useAddBook, useUpdateBook } from '../../hooks/useBooks';
import { 
  validateRequired, 
  validatePrice, 
  validateStock, 
  validateYear, 
  validateISBN 
} from '../../utils/validators';
import AdminSidebar from '../../components/layout/AdminSidebar';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Spinner from '../../components/ui/Spinner';

const AddEditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const { data: existingBook, isLoading: bookLoading } = useBook(id);
  const addBookMutation = useAddBook();
  const updateBookMutation = useUpdateBook();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    stock: '',
    genre: 'Fiction',
    isbn: '',
    publishedYear: '',
    featured: false
  });

  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const genres = [
    'Fiction',
    'Non-Fiction',
    'Science',
    'History',
    'Biography',
    'Technology',
    'Business',
    'Self-Help',
    'Romance',
    'Mystery',
    'Fantasy'
  ];

  // Load existing book data for editing
  useEffect(() => {
    if (isEditing && existingBook) {
      setFormData({
        title: existingBook.title || '',
        author: existingBook.author || '',
        description: existingBook.description || '',
        price: existingBook.price?.toString() || '',
        stock: existingBook.stock?.toString() || '',
        genre: existingBook.genre || 'Fiction',
        isbn: existingBook.isbn || '',
        publishedYear: existingBook.publishedYear?.toString() || '',
        featured: existingBook.featured || false
      });
      setCoverPreview(existingBook.coverUrl || '');
    }
  }, [isEditing, existingBook]);

  const validateForm = () => {
    const newErrors = {};

    if (!validateRequired(formData.title)) {
      newErrors.title = 'Title is required';
    }

    if (!validateRequired(formData.author)) {
      newErrors.author = 'Author is required';
    }

    if (!validateRequired(formData.description)) {
      newErrors.description = 'Description is required';
    }

    if (!validatePrice(formData.price)) {
      newErrors.price = 'Please enter a valid price';
    }

    if (!validateStock(formData.stock)) {
      newErrors.stock = 'Please enter a valid stock quantity';
    }

    if (!validateRequired(formData.isbn)) {
      newErrors.isbn = 'ISBN is required';
    } else if (!validateISBN(formData.isbn)) {
      newErrors.isbn = 'Please enter a valid ISBN';
    }

    if (!validateYear(formData.publishedYear)) {
      newErrors.publishedYear = 'Please enter a valid year';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCoverImage = () => {
    setCoverFile(null);
    setCoverPreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const bookData = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        genre: formData.genre,
        isbn: formData.isbn.trim(),
        publishedYear: parseInt(formData.publishedYear),
        featured: formData.featured
      };

      if (isEditing) {
        await updateBookMutation.mutateAsync({
          id,
          bookData,
          coverFile
        });
      } else {
        await addBookMutation.mutateAsync({
          bookData,
          coverFile
        });
      }

      navigate('/admin/books');
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isEditing && bookLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/admin/books">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Books
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? 'Edit Book' : 'Add New Book'}
            </h1>
            <p className="text-gray-600">
              {isEditing ? 'Update book information' : 'Add a new book to your inventory'}
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <Input
                    label="Title *"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    error={errors.title}
                    placeholder="Enter book title"
                  />

                  <Input
                    label="Author *"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    error={errors.author}
                    placeholder="Enter author name"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                        errors.description ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Enter book description"
                    />
                    {errors.description && (
                      <p className="text-sm text-red-600 mt-1">{errors.description}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Price (₹) *"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      error={errors.price}
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />

                    <Input
                      label="Stock Quantity *"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => handleInputChange('stock', e.target.value)}
                      error={errors.stock}
                      placeholder="0"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Genre *
                    </label>
                    <select
                      value={formData.genre}
                      onChange={(e) => handleInputChange('genre', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {genres.map((genre) => (
                        <option key={genre} value={genre}>
                          {genre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Input
                    label="ISBN *"
                    value={formData.isbn}
                    onChange={(e) => handleInputChange('isbn', e.target.value)}
                    error={errors.isbn}
                    placeholder="978-0-123456-78-9"
                  />

                  <Input
                    label="Published Year *"
                    type="number"
                    value={formData.publishedYear}
                    onChange={(e) => handleInputChange('publishedYear', e.target.value)}
                    error={errors.publishedYear}
                    placeholder="2023"
                    min="1000"
                    max={new Date().getFullYear()}
                  />

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => handleInputChange('featured', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                      Mark as featured book
                    </label>
                  </div>
                </div>

                {/* Right Column - Cover Image */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Book Cover
                    </label>
                    
                    {coverPreview ? (
                      <div className="relative">
                        <img
                          src={coverPreview}
                          alt="Cover preview"
                          className="w-full max-w-xs mx-auto rounded-lg shadow-md"
                        />
                        <button
                          type="button"
                          onClick={removeCoverImage}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4">
                          <label htmlFor="cover-upload" className="cursor-pointer">
                            <span className="mt-2 block text-sm font-medium text-gray-900">
                              Upload cover image
                            </span>
                            <span className="mt-1 block text-sm text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </span>
                          </label>
                          <input
                            id="cover-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </div>
                      </div>
                    )}
                    
                    {!coverPreview && (
                      <div className="mt-2">
                        <label htmlFor="cover-upload">
                          <Button type="button" variant="outline" className="w-full">
                            <Upload className="h-4 w-4 mr-2" />
                            Choose Image
                          </Button>
                        </label>
                        <input
                          id="cover-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                <Link to="/admin/books">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button
                  type="submit"
                  loading={loading || addBookMutation.isPending || updateBookMutation.isPending}
                >
                  {isEditing ? 'Update Book' : 'Add Book'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditBook;