import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';

const BOOKS_COLLECTION = 'books';

export const bookService = {
  // Get all books with pagination and filters
  async getBooks(filters = {}) {
    try {
      let q = collection(db, BOOKS_COLLECTION);
      
      // Apply filters
      if (filters.genre && filters.genre !== 'all') {
        q = query(q, where('genre', '==', filters.genre));
      }
      
      if (filters.featured) {
        q = query(q, where('featured', '==', true));
      }
      
      // Apply sorting
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'newest':
            q = query(q, orderBy('createdAt', 'desc'));
            break;
          case 'price-low':
            q = query(q, orderBy('price', 'asc'));
            break;
          case 'price-high':
            q = query(q, orderBy('price', 'desc'));
            break;
          default:
            q = query(q, orderBy('createdAt', 'desc'));
        }
      } else {
        q = query(q, orderBy('createdAt', 'desc'));
      }
      
      // Apply pagination
      if (filters.limitCount) {
        q = query(q, limit(filters.limitCount));
      }
      
      if (filters.lastDoc) {
        q = query(q, startAfter(filters.lastDoc));
      }
      
      const snapshot = await getDocs(q);
      const books = [];
      
      snapshot.forEach((doc) => {
        books.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return {
        books,
        lastDoc: snapshot.docs[snapshot.docs.length - 1],
        hasMore: snapshot.docs.length === (filters.limitCount || 10)
      };
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },

  // Search books by title or author
  async searchBooks(searchTerm) {
    try {
      const booksRef = collection(db, BOOKS_COLLECTION);
      const snapshot = await getDocs(booksRef);
      
      const books = [];
      snapshot.forEach((doc) => {
        const book = { id: doc.id, ...doc.data() };
        const title = book.title.toLowerCase();
        const author = book.author.toLowerCase();
        const search = searchTerm.toLowerCase();
        
        if (title.includes(search) || author.includes(search)) {
          books.push(book);
        }
      });
      
      return books;
    } catch (error) {
      console.error('Error searching books:', error);
      throw error;
    }
  },

  // Get single book by ID
  async getBook(id) {
    try {
      const docRef = doc(db, BOOKS_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      } else {
        throw new Error('Book not found');
      }
    } catch (error) {
      console.error('Error fetching book:', error);
      throw error;
    }
  },

  // Add new book (admin only)
  async addBook(bookData, coverFile) {
    try {
      let coverUrl = '';
      
      if (coverFile) {
        coverUrl = await this.uploadCover(coverFile);
      }
      
      const docRef = await addDoc(collection(db, BOOKS_COLLECTION), {
        ...bookData,
        coverUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  },

  // Update book (admin only)
  async updateBook(id, bookData, coverFile) {
    try {
      let updateData = {
        ...bookData,
        updatedAt: serverTimestamp()
      };
      
      if (coverFile) {
        // Delete old cover if exists
        const existingBook = await this.getBook(id);
        if (existingBook.coverUrl) {
          await this.deleteCover(existingBook.coverUrl);
        }
        
        // Upload new cover
        updateData.coverUrl = await this.uploadCover(coverFile);
      }
      
      const docRef = doc(db, BOOKS_COLLECTION, id);
      await updateDoc(docRef, updateData);
      
      return id;
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  },

  // Delete book (admin only)
  async deleteBook(id) {
    try {
      // Get book to delete cover image
      const book = await this.getBook(id);
      
      // Delete cover image if exists
      if (book.coverUrl) {
        await this.deleteCover(book.coverUrl);
      }
      
      // Delete book document
      const docRef = doc(db, BOOKS_COLLECTION, id);
      await deleteDoc(docRef);
      
      return true;
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  },

  // Upload book cover to Firebase Storage
  async uploadCover(file) {
    try {
      const timestamp = Date.now();
      const fileName = `covers/${timestamp}_${file.name}`;
      const storageRef = ref(storage, fileName);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading cover:', error);
      throw error;
    }
  },

  // Delete book cover from Firebase Storage
  async deleteCover(coverUrl) {
    try {
      const storageRef = ref(storage, coverUrl);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Error deleting cover:', error);
      // Don't throw error for cover deletion failure
    }
  },

  // Get featured books
  async getFeaturedBooks(limitCount = 6) {
    return this.getBooks({ featured: true, limitCount });
  },

  // Get books by genre
  async getBooksByGenre(genre, limitCount = 10) {
    return this.getBooks({ genre, limitCount });
  }
};