import React from 'react';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize';

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
    { value: 'read', name: 'Read' }
  ];
  const displayedOptions = options.filter(
    option => option.value !== book.shelf
  );
  return (
    <div
      className={'book'}
      style={{ display: 'flex', flexDirection: 'column', marginRight: '25px' }}
    >
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
            style={{ height: '200px' }}
            width={250}
            src={book.imageLinks.smallThumbnail}
          />
        </Link>
      )}
      <small>{book.title}</small>
      <small>{authors}</small>
      <br />
      <form
        style={{ display: 'flex', flexDirection: 'row' }}
        onSubmit={event => handleSubmit(event)}
      >
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
