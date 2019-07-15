import React from 'react';
import './BooksShelf.css';
import Book from './Book';

function BooksShelf({ books, updateShelf }) {
  return (
    <div className="miniwrapper">
      <div className="bookshelf" />
      <div
        className="books-container"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          padding: '20px'
        }}
      >
        {books.map(book => (
          <Book key={book.id} book={book} updateShelf={updateShelf} />
        ))}
      </div>
      <div className="bookshelf" />
    </div>
  );
}

export default BooksShelf;
