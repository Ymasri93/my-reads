import React from 'react';
import { Link } from 'react-router-dom';
import './Book.css';

function Book({ book, updateShelf }) {
  let authors = [];
  if (book.authors) {
    authors = `By ${book.authors.join(', ')}`;
  }

  let options = [
    { value: 'currentlyReading', name: 'Currently Reading' },
    {
      value: 'wantToRead',
      name: 'Want to Read'
    },
    { value: 'read', name: 'Read' },
    {
      value: 'none',
      name: 'None'
    }
  ];
  let imageUrl = 'http://via.placeholder.com/128x193?text=No%20Cover';
  if (book.imageLinks && book.imageLinks.smallThumbnail) {
    imageUrl = book.imageLinks.smallThumbnail;
  }

  return (
    <div className={'book'}>
      <Link
        to={{
          pathname: `/book/${book.id}`,
          state: { book }
        }}
      >
        <img
          alt={book.title}
          className="book-image"
          width={250}
          src={imageUrl}
        />
      </Link>
      <small>{book.title}</small>
      <small>{authors}</small>
      <br />
      <select
        name={'shelf'}
        defaultValue={book.shelf || 'none'}
        onChange={event => {
          updateShelf(book, event.target.value);
        }}
      >
        {' '}
        {options.map(option => (
          <option key={option.name} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Book;
