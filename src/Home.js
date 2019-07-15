import React, { Component } from 'react';
import './Home.css';
import BooksShelf from './BooksShelf';
import * as BooksApi from './services/BooksApi';

class Home extends Component {
  state = {
    wantToRead: [],
    read: [],
    currentlyReading: []
  };

  updateShelf = async (book, shelf) => {
    const bookIds = await BooksApi.update(book, shelf);
    const read = await Promise.all(
      bookIds.read.map(bookId => BooksApi.get(bookId))
    );
    const wantToRead = await Promise.all(
      bookIds.wantToRead.map(bookId => BooksApi.get(bookId))
    );
    const currentlyReading = await Promise.all(
      bookIds.currentlyReading.map(bookId => BooksApi.get(bookId))
    );
    this.setState({
      read,
      wantToRead,
      currentlyReading
    });
  };

  componentDidMount() {
    BooksApi.getAll().then(books => {
      this.setState({
        wantToRead: books.filter(book => book.shelf === 'wantToRead'),
        read: books.filter(book => book.shelf === 'read'),
        currentlyReading: books.filter(
          book => book.shelf === 'currentlyReading'
        )
      });
    });
  }

  render() {
    const { wantToRead, read, currentlyReading } = this.state;
    return (
      <div className="wrapper">
        <h1>Currently Reading</h1>
        <BooksShelf books={currentlyReading} updateShelf={this.updateShelf} />
        <h1>Want to Read</h1>
        <BooksShelf books={wantToRead} updateShelf={this.updateShelf} />
        <h1>Read</h1>
        <BooksShelf books={read} updateShelf={this.updateShelf} />
      </div>
    );
  }
}

export default Home;
