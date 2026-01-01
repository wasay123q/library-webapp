const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const Book = require('./models/Book');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for cross-origin requests from frontend

// Connect to MongoDB
connectDB();

// ==================== API ROUTES ====================

// GET /api/books - Retrieve all books from database
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve books',
      error: error.message
    });
  }
});

// POST /api/books - Add a new book to the database
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, isbn, year } = req.body;

    // Validate required fields
    if (!title || !author || !isbn || !year) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, author, isbn, year'
      });
    }

    // Create new book
    const book = await Book.create({
      title,
      author,
      isbn,
      year
    });

    res.status(201).json({
      success: true,
      message: 'Book added successfully',
      data: book
    });
  } catch (error) {
    console.error('Error adding book:', error);
    
    // Handle duplicate ISBN error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A book with this ISBN already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to add book',
      error: error.message
    });
  }
});

// DELETE /api/books/:id - Remove a book by ID
app.delete('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: book
    });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete book',
      error: error.message
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

// Start server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
