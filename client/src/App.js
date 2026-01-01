import React, { useState, useEffect } from 'react';
import './App.css';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

function App() {
  // useState hook to manage book list
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // useEffect hook to fetch books from backend on component mount
  useEffect(() => {
    fetchBooks();
  }, []); // Empty dependency array means this runs once on mount

  // Fetch all books from the API
  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('/api/books');
      const data = await response.json();

      if (response.ok && data.success) {
        setBooks(data.data);
      } else {
        setError('Failed to load books');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error('Error fetching books:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle when a book is added - update UI dynamically without reloading
  const handleBookAdded = (newBook) => {
    setBooks(prevBooks => [newBook, ...prevBooks]);
  };

  // Handle when a book is deleted - update UI dynamically without reloading
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
        {error && <div className="error-banner">{error}</div>}
        
        {/* Book entry form component with props passing */}
        <BookForm onBookAdded={handleBookAdded} />
        
        {/* Book list component with props passing and component reusability */}
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
