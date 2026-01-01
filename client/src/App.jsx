import React, { useState, useEffect } from 'react';
import './App.css';
import BookForm from './components/BookForm.jsx';
import BookList from './components/BookList.jsx';

function App() {
  // State management for books, loading, and error states
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch books from API when component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  // Retrieve all books from backend API
  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('/api/books');
      const data = await response.json();

      if (response.ok && data.success) {
        setBooks(data.data);
      } else {
        // Display user-friendly error message
        setError(data.message || 'Failed to load books. Please refresh the page.');
      }
    } catch (err) {
      // Handle network or connection errors
      setError('Unable to connect to server. Please check your connection and try again.');
      console.error('Network error fetching books:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add newly created book to the list without reloading
  const handleBookAdded = (newBook) => {
    setBooks(prevBooks => [newBook, ...prevBooks]);
  };

  // Remove deleted book from the list without reloading
  const handleBookDeleted = (bookId) => {
    setBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📚 Library Management System</h1>
        <p>Manage your book collection efficiently</p>
      </header>

      <main className="app-main">
        {/* Display error banner if any errors occur */}
        {error && <div className="error-banner">{error}</div>}
        
        {/* Book entry form with callback for adding books */}
        <BookForm onBookAdded={handleBookAdded} />
        
        {/* Book list display with delete functionality */}
        <BookList 
          books={books} 
          onBookDeleted={handleBookDeleted}
          isLoading={isLoading}
        />
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 Library Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
