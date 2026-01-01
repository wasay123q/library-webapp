import React from 'react';
import './BookList.css';

const BookList = ({ books, onBookDeleted, isLoading }) => {
  // Handle delete book
  const handleDelete = async (bookId, bookTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${bookTitle}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Notify parent component to refresh book list
        if (onBookDeleted) {
          onBookDeleted(bookId);
        }
      } else {
        alert('Failed to delete book: ' + (data.message || 'Unknown error'));
      }
    } catch (err) {
      alert('Error connecting to server. Please try again.');
      console.error('Error:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="book-list-container">
        <h2>Book Collection</h2>
        <div className="loading">Loading books...</div>
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="book-list-container">
        <h2>Book Collection</h2>
        <div className="empty-state">
          <p>No books in the library yet.</p>
          <p>Add your first book using the form above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="book-list-container">
      <h2>Book Collection ({books.length})</h2>
      
      {/* Card Layout for smaller screens */}
      <div className="book-cards">
        {books.map((book) => (
          <div key={book._id} className="book-card">
            <div className="book-card-header">
              <h3 className="book-title">{book.title}</h3>
            </div>
            <div className="book-card-body">
              <div className="book-detail">
                <span className="detail-label">Author:</span>
                <span className="detail-value">{book.author}</span>
              </div>
              <div className="book-detail">
                <span className="detail-label">ISBN:</span>
                <span className="detail-value">{book.isbn}</span>
              </div>
              <div className="book-detail">
                <span className="detail-label">Year:</span>
                <span className="detail-value">{book.year}</span>
              </div>
            </div>
            <div className="book-card-footer">
              <button
                className="btn-delete"
                onClick={() => handleDelete(book._id, book.title)}
                title="Delete this book"
              >
                Delete Book
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Table Layout for larger screens */}
      <div className="book-table-wrapper">
        <table className="book-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td data-label="Title">{book.title}</td>
                <td data-label="Author">{book.author}</td>
                <td data-label="ISBN">{book.isbn}</td>
                <td data-label="Year">{book.year}</td>
                <td data-label="Actions">
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(book._id, book.title)}
                    title="Delete this book"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
