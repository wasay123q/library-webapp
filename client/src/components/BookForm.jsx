import React, { useState, memo } from 'react';
import './BookForm.css';

const BookForm = memo(({ onBookAdded }) => {
  // State for form input fields
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    year: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Update form state when input values change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  // Submit new book to backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    // Validate author name (only alphabets and spaces)
    const authorRegex = /^[A-Za-z\s]+$/;
    if (!authorRegex.test(formData.author.trim())) {
      setError('Author name should only contain alphabets and spaces.');
      setIsSubmitting(false);
      return;
    }

    // Validate ISBN (only alphanumeric and hyphens)
    const isbnRegex = /^[A-Za-z0-9-]+$/;
    if (!isbnRegex.test(formData.isbn.trim())) {
      setError('ISBN should only contain letters, numbers, and hyphens.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          author: formData.author.trim(),
          isbn: formData.isbn.trim(),
          year: parseInt(formData.year)
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(data.message || 'Book added successfully!');
        
        // Reset form fields after successful submission
        setFormData({
          title: '',
          author: '',
          isbn: '',
          year: ''
        });
        
        // Notify parent component to update book list
        if (onBookAdded) {
          onBookAdded(data.data);
        }
      } else {
        // Display user-friendly error message from server
        setError(data.message || 'Failed to add book. Please try again.');
      }
    } catch (err) {
      // Handle network or connection errors
      setError('Unable to connect to server. Please check your connection and try again.');
      console.error('Network error adding book:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="book-form-container">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit} className="book-form">
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="form-group">
          <label htmlFor="title">Book Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author Name *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="isbn">ISBN Number *</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="Enter ISBN number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="year">Publication Year *</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Enter publication year"
            min="1000"
            max={new Date().getFullYear()}
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding Book...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
});

export default BookForm;
