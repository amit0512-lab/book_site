# BookStore - E-commerce Web Application

A complete, production-ready e-commerce web application for selling books built with React, Firebase, and modern web technologies.

## 🚀 Features

### Customer Features
- **Browse & Search**: Explore books by genre, search by title/author with real-time results
- **Book Details**: Detailed book information with cover images, descriptions, and stock status
- **Shopping Cart**: Add/remove items, update quantities with persistent storage
- **Secure Checkout**: Complete order flow with shipping address collection
- **Order Management**: View order history and track order status
- **User Authentication**: Email/password registration and login with Firebase Auth
- **Responsive Design**: Mobile-first design that works on all devices

### Admin Features
- **Dashboard**: Overview of books, orders, and revenue statistics
- **Book Management**: Add, edit, delete books with image upload
- **Order Management**: View all orders, update order status
- **Inventory Control**: Track stock levels and featured book status

### Technical Features
- **Real-time Data**: Firestore real-time database integration
- **Image Storage**: Firebase Storage for book cover images
- **Security**: Comprehensive Firestore security rules
- **Performance**: Optimized with React Query for caching and state management
- **SEO Friendly**: Proper routing and meta tags
- **CI/CD**: Automated deployment with GitHub Actions

## 🛠 Tech Stack

- **Frontend**: React 18 + Vite
- **Routing**: React Router v6
- **Styling**: TailwindCSS v3
- **State Management**: React Context API + TanStack React Query
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Hosting**: Firebase Hosting
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
src/
├── assets/                 # Static assets
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components (Navbar, Footer, Sidebar)
│   └── books/             # Book-specific components
├── pages/                 # Page components
│   ├── admin/             # Admin panel pages
│   └── ...                # Customer pages
├── hooks/                 # Custom React hooks
├── context/               # React Context providers
├── services/              # Firebase services and API calls
├── utils/                 # Utility functions and validators
├── routes/                # Route protection components
└── App.jsx               # Main application component
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bookstore-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   
   a. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   
   b. Enable the following services:
   - Authentication (Email/Password)
   - Firestore Database
   - Storage
   - Hosting
   
   c. Get your Firebase configuration from Project Settings > General > Your apps
   
   d. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   e. Fill in your Firebase configuration in `.env`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Deploy Firestore Rules and Indexes**
   ```bash
   # Install Firebase CLI if not already installed
   npm install -g firebase-tools
   
   # Login to Firebase
   firebase login
   
   # Initialize Firebase in your project
   firebase init
   
   # Deploy security rules and indexes
   firebase deploy --only firestore:rules,firestore:indexes,storage
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 👤 Creating the First Admin User

Since the application uses role-based access control, you need to create the first admin user manually:

1. **Register a new account** through the application's registration page

2. **Update the user's role in Firestore**:
   - Go to Firebase Console > Firestore Database
   - Find the `users` collection
   - Locate your user document (by email)
   - Edit the document and change `role` from `"customer"` to `"admin"`

3. **Refresh the application** and you'll now have access to the admin panel at `/admin`

## 📚 Seeding Sample Data

To populate your database with sample books:

1. **Download Firebase Admin SDK key**:
   - Go to Firebase Console > Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save the JSON file as `scripts/serviceAccountKey.json`

2. **Run the seed script**:
   ```bash
   npm run seed
   ```

This will add 15 sample books to your Firestore database.

## 🚀 Deployment

### Automatic Deployment (Recommended)

The project includes GitHub Actions for automatic deployment:

1. **Set up GitHub Secrets**:
   - Go to your GitHub repository > Settings > Secrets and variables > Actions
   - Add the following secrets:
     ```
     VITE_FIREBASE_API_KEY
     VITE_FIREBASE_AUTH_DOMAIN
     VITE_FIREBASE_PROJECT_ID
     VITE_FIREBASE_STORAGE_BUCKET
     VITE_FIREBASE_MESSAGING_SENDER_ID
     VITE_FIREBASE_APP_ID
     FIREBASE_SERVICE_ACCOUNT (entire JSON content)
     FIREBASE_PROJECT_ID
     ```

2. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

The application will automatically build and deploy to Firebase Hosting.

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

## 🔒 Security

The application implements comprehensive security measures:

### Firestore Security Rules
- **Books**: Public read access, admin-only write access
- **Orders**: Users can create and read their own orders, admins can read/update all
- **Users**: Users can read/write their own profile, admins can read all profiles

### Storage Security Rules
- **Book Covers**: Public read access, admin-only upload access

### Authentication
- Email/password authentication with Firebase Auth
- Role-based access control (customer/admin)
- Protected routes for authenticated users
- Admin-only routes for administrative functions

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Skeleton loaders and spinners for better UX
- **Toast Notifications**: Real-time feedback for user actions
- **Empty States**: Helpful messages when no data is available
- **Optimistic Updates**: Immediate UI updates for better perceived performance
- **Error Handling**: Graceful error handling with user-friendly messages

## 📱 Payment Integration

Currently, the application supports **Cash on Delivery (COD)** only. To add payment gateway integration:

1. Choose a payment provider (Stripe, Razorpay, PayPal, etc.)
2. Install the provider's SDK
3. Update the checkout flow in `src/pages/Checkout.jsx`
4. Add payment status tracking to orders
5. Update the order schema to include payment information

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_FIREBASE_API_KEY` | Firebase API Key | Yes |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | Yes |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID | Yes |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | Yes |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID | Yes |
| `VITE_FIREBASE_APP_ID` | Firebase App ID | Yes |

## 🧪 Testing

To run tests (when implemented):

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:coverage
```

## 📈 Performance Optimization

The application includes several performance optimizations:

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Optimized images with proper sizing
- **Caching**: React Query for intelligent data caching
- **Lazy Loading**: Components loaded on demand
- **Bundle Optimization**: Vite's optimized build process

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/bookstore-app/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- Firebase for providing excellent backend services
- Tailwind CSS for the utility-first CSS framework
- React team for the amazing frontend library
- All open-source contributors who made this project possible

---

**Happy Coding! 📚✨**# book_site
