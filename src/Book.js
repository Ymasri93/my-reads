import React from 'react';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize';
import './Book.css';

function Book({ book, updateShelf }) {
  let authors = [];
  if (book.authors) {
    authors = `By ${book.authors.join(', ')}`;
  }

  const handleSubmit = e => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    updateShelf(book, values.shelf);
  };

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
  const displayedOptions = options.filter(
    option => option.value !== book.shelf
  );
  return (
    <div className={'book'}>
      {book.imageLinks && book.imageLinks.smallThumbnail && (
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
            src={book.imageLinks.smallThumbnail}
          />
        </Link>
      )}
      <small>{book.title}</small>
      <small>{authors}</small>
      <br />
      <form className={'book-form'} onSubmit={event => handleSubmit(event)}>
        <select name={'shelf'}>
          {displayedOptions.map(option => (
            <option key={option.name} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <button>Change status</button>
      </form>
    </div>
  );
}

export default Book;
