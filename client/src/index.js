import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Remove StrictMode in production for better performance
const isProduction = process.env.NODE_ENV === 'production';

root.render(
  isProduction ? <App /> : (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
);
