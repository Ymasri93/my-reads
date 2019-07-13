import React from 'react';
import './App.css';
import BooksShelf from './BooksShelf';

function App() {
  return (
    <div className="wrapper">
      <BooksShelf />
      <BooksShelf />
      <BooksShelf />
    </div>
  );
}

export default App;
