import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Firebase Admin SDK
// You need to download your service account key from Firebase Console
// and place it in the scripts folder as 'serviceAccountKey.json'
try {
  const serviceAccount = JSON.parse(
    readFileSync(join(__dirname, 'serviceAccountKey.json'), 'utf8')
  );
  
  initializeApp({
    credential: cert(serviceAccount)
  });
} catch (error) {
  console.error('Error loading service account key:', error.message);
  console.log('Please download your service account key from Firebase Console');
  console.log('and save it as scripts/serviceAccountKey.json');
  process.exit(1);
}

const db = getFirestore();

const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
    price: 299,
    stock: 25,
    genre: "Fiction",
    isbn: "978-0-7432-7356-5",
    publishedYear: 1925,
    featured: true,
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A gripping tale of racial injustice and childhood innocence in the American South.",
    price: 349,
    stock: 30,
    genre: "Fiction",
    isbn: "978-0-06-112008-4",
    publishedYear: 1960,
    featured: true,
    coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop"
  },
  {
    title: "1984",
    author: "George Orwell",
    description: "A dystopian social science fiction novel about totalitarian control and surveillance.",
    price: 279,
    stock: 40,
    genre: "Fiction",
    isbn: "978-0-452-28423-4",
    publishedYear: 1949,
    featured: true,
    coverUrl: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400&h=600&fit=crop"
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "A romantic novel that critiques the British landed gentry at the end of the 18th century.",
    price: 259,
    stock: 35,
    genre: "Romance",
    isbn: "978-0-14-143951-8",
    publishedYear: 1813,
    featured: false,
    coverUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop"
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description: "A controversial novel about teenage rebellion and alienation in post-war America.",
    price: 329,
    stock: 20,
    genre: "Fiction",
    isbn: "978-0-316-76948-0",
    publishedYear: 1951,
    featured: false,
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop"
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    description: "An exploration of how Homo sapiens came to dominate the world through cognitive, agricultural, and scientific revolutions.",
    price: 599,
    stock: 45,
    genre: "History",
    isbn: "978-0-06-231609-7",
    publishedYear: 2011,
    featured: true,
    coverUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop"
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    description: "A methodology for developing businesses and products that aims to shorten product development cycles.",
    price: 449,
    stock: 25,
    genre: "Business",
    isbn: "978-0-307-88789-4",
    publishedYear: 2011,
    featured: false,
    coverUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=600&fit=crop"
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    description: "A landmark volume in science writing that explores the nature of time and the universe.",
    price: 399,
    stock: 30,
    genre: "Science",
    isbn: "978-0-553-38016-3",
    publishedYear: 1988,
    featured: true,
    coverUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    description: "A philosophical book about following your dreams and listening to your heart.",
    price: 249,
    stock: 50,
    genre: "Fiction",
    isbn: "978-0-06-231500-7",
    publishedYear: 1988,
    featured: true,
    coverUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    description: "A comprehensive guide to breaking bad habits and adopting good ones through small changes.",
    price: 499,
    stock: 35,
    genre: "Self-Help",
    isbn: "978-0-7352-1129-2",
    publishedYear: 2018,
    featured: false,
    coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop"
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    description: "An epic high-fantasy novel about the quest to destroy the One Ring and defeat the Dark Lord Sauron.",
    price: 799,
    stock: 15,
    genre: "Fantasy",
    isbn: "978-0-544-00341-5",
    publishedYear: 1954,
    featured: true,
    coverUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop"
  },
  {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    description: "The exclusive biography of Apple co-founder Steve Jobs, based on extensive interviews.",
    price: 549,
    stock: 20,
    genre: "Biography",
    isbn: "978-1-4516-4853-9",
    publishedYear: 2011,
    featured: false,
    coverUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=600&fit=crop"
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    description: "A mystery thriller that follows symbologist Robert Langdon as he investigates a murder in the Louvre.",
    price: 379,
    stock: 25,
    genre: "Mystery",
    isbn: "978-0-307-47427-5",
    publishedYear: 2003,
    featured: false,
    coverUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop"
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    description: "A handbook of agile software craftsmanship that teaches the principles of writing clean, readable code.",
    price: 649,
    stock: 18,
    genre: "Technology",
    isbn: "978-0-13-235088-4",
    publishedYear: 2008,
    featured: false,
    coverUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop"
  },
  {
    title: "The Notebook",
    author: "Nicholas Sparks",
    description: "A romantic novel about a young couple's love story that spans decades.",
    price: 299,
    stock: 40,
    genre: "Romance",
    isbn: "978-0-446-60523-4",
    publishedYear: 1996,
    featured: false,
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop"
  }
];

async function seedBooks() {
  try {
    console.log('Starting to seed books...');
    
    const booksCollection = db.collection('books');
    
    for (const book of sampleBooks) {
      const bookData = {
        ...book,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const docRef = await booksCollection.add(bookData);
      console.log(`Added book: ${book.title} with ID: ${docRef.id}`);
    }
    
    console.log(`Successfully seeded ${sampleBooks.length} books!`);
    console.log('You can now view them in your application.');
    
  } catch (error) {
    console.error('Error seeding books:', error);
  }
}

// Run the seed function
seedBooks();