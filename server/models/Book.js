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
    trim: true
  },
  isbn: {
    type: String,
    required: [true, 'ISBN number is required'],
    unique: true,
    trim: true
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
