const mongoose = require('mongoose');

// Define Mongoose schema for book documents
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^[A-Za-z\s]+$/.test(v);
      },
      message: 'Author name should only contain alphabets and spaces'
    }
  },
  isbn: {
    type: String,
    required: [true, 'ISBN number is required'],
    unique: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[A-Za-z0-9-]+$/.test(v);
      },
      message: 'ISBN should only contain letters, numbers, and hyphens'
    }
  },
  year: {
    type: Number,
    required: [true, 'Publication year is required'],
    min: [1000, 'Year must be a valid 4-digit number'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create Book model from schema and export
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
