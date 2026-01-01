# 🚀 Quick Start Guide

Follow these steps to run the Smart Library Management System:

## Prerequisites Check

1. **Node.js installed?** 
   ```powershell
   node --version
   ```

2. **MongoDB installed and running?**
   ```powershell
   # Check if MongoDB service is running
   Get-Service -Name MongoDB
   ```

## Step-by-Step Setup

### 1️⃣ Install Backend Dependencies

```powershell
cd server
npm install
```

### 2️⃣ Install Frontend Dependencies

```powershell
cd ../client
npm install
```

### 3️⃣ Start MongoDB

Make sure MongoDB is running. If not:
- Open Services (Win + R, type `services.msc`)
- Find "MongoDB" service
- Right-click and select "Start"

### 4️⃣ Start Backend Server (Terminal 1)

```powershell
cd server
npm start
```

You should see:
```
Server is running on port 5000
MongoDB Connected: localhost
```

### 5️⃣ Start Frontend (Terminal 2 - New Terminal)

```powershell
cd client
npm start
```

Browser will automatically open at `http://localhost:3000`

## 🎯 Testing the Application

1. **Add a Book:**
   - Fill in the form with book details
   - Click "Add Book"
   - Book should appear in the list below

2. **Delete a Book:**
   - Click the "Delete" button on any book card
   - Confirm the deletion
   - Book should be removed from the list

3. **Check Responsiveness:**
   - Resize your browser window
   - Open DevTools (F12) and toggle device toolbar
   - Test on different screen sizes

## 🔧 If Something Goes Wrong

### Backend won't start?
- Check if MongoDB is running
- Check if port 5000 is available
- Verify `.env` file exists in server folder

### Frontend won't start?
- Check if backend is running first
- Check if port 3000 is available
- Clear npm cache: `npm cache clean --force`

### Can't connect to database?
- Verify MongoDB URI in `.env`: `mongodb://localhost:27017/library_db`
- Restart MongoDB service

## 📝 Ready to Push to GitHub?

```powershell
cd "E:\BSCS\5th semester\Web dev\Lab final"
git add .
git commit -m "Complete MERN Library Management System"
git push origin main
```

---

**Need help?** Check the main README.md for detailed documentation.
