import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookService } from '../services/bookService';
import toast from 'react-hot-toast';

export const useBooks = (filters = {}) => {
  return useQuery({
    queryKey: ['books', filters],
    queryFn: () => bookService.getBooks(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useBook = (id) => {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => bookService.getBook(id),
    enabled: !!id,
  });
};

export const useSearchBooks = (searchTerm) => {
  return useQuery({
    queryKey: ['books', 'search', searchTerm],
    queryFn: () => bookService.searchBooks(searchTerm),
    enabled: !!searchTerm && searchTerm.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useFeaturedBooks = (limit = 6) => {
  return useQuery({
    queryKey: ['books', 'featured', limit],
    queryFn: () => bookService.getFeaturedBooks(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useAddBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ bookData, coverFile }) => bookService.addBook(bookData, coverFile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Book added successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add book');
    },
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, bookData, coverFile }) => bookService.updateBook(id, bookData, coverFile),
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['book', id] });
      toast.success('Book updated successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update book');
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => bookService.deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Book deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete book');
    },
  });
};