import React from 'react';
import './Home.css';
import BooksShelf from './BooksShelf';

function Home(props) {
  const { updateShelf, wantToRead, read, currentlyReading } = props;
  return (
    <div className="wrapper">
      <h1>Currently Reading</h1>
      <BooksShelf books={currentlyReading} updateShelf={updateShelf} />
      <h1>Want to Read</h1>
      <BooksShelf books={wantToRead} updateShelf={updateShelf} />
      <h1>Read</h1>
      <BooksShelf books={read} updateShelf={updateShelf} />
    </div>
  );
}

export default Home;
