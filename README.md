# Library Management System

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for managing a library's book collection. This system allows librarians to add, view, and remove books from the library database.

## 🚀 Features

### Frontend (React SPA)
- **Book Entry Form**: Add new books with title, author, ISBN, and publication year
- **Book List Display**: View all books in card format (mobile) or table format (desktop)
- **Responsive Design**: Mobile-first design supporting screens from 320px and above
- **State Management**: React hooks (useState, useEffect) for efficient state handling
- **Dynamic Updates**: Real-time UI updates without page reloads
- **Component Architecture**: Reusable components with proper props passing

### Backend (Node.js + Express)
- **RESTful API**: Clean API architecture with proper HTTP methods
- **MongoDB Integration**: Mongoose ODM for database operations
- **CORS Enabled**: Cross-origin resource sharing for frontend-backend communication
- **Data Validation**: Input validation and error handling
- **API Endpoints**:
  - `GET /api/books` - Retrieve all books
  - `POST /api/books` - Add a new book
  - `DELETE /api/books/:id` - Remove a book by ID

## 📁 Project Structure

```
library-management/
├── client/                    # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookForm.js           # Book entry form component
│   │   │   ├── BookForm.css          # Form styling
│   │   │   ├── BookList.js           # Book list component
│   │   │   └── BookList.css          # List styling
│   │   ├── App.js                    # Main app component
│   │   ├── App.css                   # App styling
│   │   ├── index.js                  # React entry point
│   │   └── index.css                 # Global styles
│   └── package.json
│
└── server/                    # Node.js backend
    ├── models/
    │   └── Book.js                   # Mongoose book schema
    ├── db.js                         # MongoDB connection
    ├── server.js                     # Express server & API routes
    ├── .env                          # Environment variables
    └── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library_db
```

4. Start MongoDB service (if using local MongoDB):
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

5. Start the server:
```bash
npm start
# or for development with auto-restart
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## 🌐 API Documentation

### GET /api/books
Retrieve all books from the database.

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "123abc",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "isbn": "978-0743273565",
      "year": 1925,
      "createdAt": "2026-01-01T00:00:00.000Z"
    }
  ]
}
```

### POST /api/books
Add a new book to the database.

**Request Body:**
```json
{
  "title": "To Kill a Mockingbird",
  "author": "Harper Lee",
  "isbn": "978-0061120084",
  "year": 1960
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book added successfully",
  "data": {
    "_id": "456def",
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "isbn": "978-0061120084",
    "year": 1960
  }
}
```

### DELETE /api/books/:id
Remove a book from the database.

**Response:**
```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": {
    "_id": "456def",
    "title": "To Kill a Mockingbird"
  }
}
```

## 📱 Responsive Design

The application is fully responsive and supports:
- **Mobile**: 320px - 768px (Card layout)
- **Tablet**: 769px - 1023px (Grid layout)
- **Desktop**: 1024px and above (Table layout)

## 🎨 Technologies Used

### Frontend
- React 18
- CSS3 (Flexbox & Grid)
- Fetch API for HTTP requests

### Backend
- Node.js
- Express.js 4
- MongoDB with Mongoose ODM
- CORS middleware
- dotenv for environment variables

## 🚀 Deployment on GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: Library Management System"
```

2. Create a new repository on GitHub

3. Push to GitHub:
```bash
git remote add origin https://github.com/yourusername/library-management.git
git branch -M main
git push -u origin main
```

### Deployment Options

**Frontend (React):**
- Vercel
- Netlify
- GitHub Pages

**Backend (Node.js):**
- Heroku
- Railway
- Render
- DigitalOcean

**Database:**
- MongoDB Atlas (Free tier available)

## 👨‍💻 Development

### Running in Development Mode

1. Start MongoDB service
2. Start backend server: `cd server && npm run dev`
3. Start frontend: `cd client && npm start`

### Building for Production

```bash
cd client
npm run build
```

## 🔒 Security Considerations

- Input validation on both client and server
- MongoDB injection prevention via Mongoose
- CORS properly configured
- Environment variables for sensitive data

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ using the MERN Stack**
