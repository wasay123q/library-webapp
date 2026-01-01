# Library Management System - Backend

Backend API server for the Smart Library Management System.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start server
npm start

# Development mode with auto-restart
npm run dev
```

## 📋 Environment Variables

Create a `.env` file in this directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library_db
```

## 🔌 API Endpoints

- `GET /api/books` - Get all books
- `POST /api/books` - Add a new book
- `DELETE /api/books/:id` - Delete a book

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Enable CORS
- **dotenv** - Environment variables

## 🗃️ Database Schema

**Book Model:**
```javascript
{
  title: String (required),
  author: String (required),
  isbn: String (required, unique),
  year: Number (required),
  timestamps: true
}
```

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
