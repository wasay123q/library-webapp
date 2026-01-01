const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const Book = require('./models/Book');

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Apply middleware for JSON parsing and CORS
app.use(express.json()); 
app.use(cors()); 

// Enable HTTP cache headers for better performance
app.use((req, res, next) => {
  // Cache static resources for 1 hour, but always revalidate API data
  if (req.url.startsWith('/api/')) {
    res.set('Cache-Control', 'no-cache');
  } else {
    res.set('Cache-Control', 'public, max-age=3600');
  }
  next();
});

// Establish MongoDB database connection
connectDB();

// ==================== API ROUTES ====================

// GET /api/books - Retrieve all books from database
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }); 
    
    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    console.error('Database error fetching books:', error.message);
    
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve books from database. Please try again later.'
    });
  }
});

// POST /api/books - Add a new book to database
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, isbn, year } = req.body;

    // Validate all required fields are present
    if (!title || !author || !isbn || !year) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required. Please fill in title, author, ISBN, and year.'
      });
    }

    // Validate year is a valid number
    const yearNum = parseInt(year);
    if (isNaN(yearNum) || yearNum < 1000 || yearNum > new Date().getFullYear()) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid publication year.'
      });
    }

    // Create new book document in database
    const book = await Book.create({
      title: title.trim(),
      author: author.trim(),
      isbn: isbn.trim(),
      year: yearNum
    });

    res.status(201).json({
      success: true,
      message: 'Book added successfully!',
      data: book
    });
  } catch (error) {
    console.error('Database error adding book:', error.message);
    
    // Handle duplicate ISBN constraint violation
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A book with this ISBN already exists in the library.'
      });
    }

    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid book data. Please check your inputs.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to add book to database. Please try again.'
    });
  }
});

// DELETE /api/books/:id - Remove a book by ID from database
app.delete('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID format.'
      });
    }

    // Attempt to find and delete book
    const book = await Book.findByIdAndDelete(id);

    // Check if book exists in database
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found in the library.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully!',
      data: book
    });
  } catch (error) {
    console.error('Database error deleting book:', error.message);
    
    res.status(500).json({
      success: false,
      message: 'Failed to delete book from database. Please try again.'
    });
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Library Management System API',
    version: '1.0.0'
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
