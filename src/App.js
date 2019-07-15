import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import Search from './Search';
import BookDetails from './BookDetails';
import * as BooksApi from './services/BooksApi';
import { Link, Route } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      read: [],
      wantToRead: [],
      currentlyReading: []
    };
  }

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

  render() {
    const { read, wantToRead, currentlyReading } = this.state;
    return (
      <div className="app">
        <div className="header">
          <Link to={'/'}>Home</Link>
          <Link to={'/search'}>Search</Link>
        </div>
        <Route
          exact
          path={'/'}
          render={() => {
            return (
              <Home
                updateShelf={this.updateShelf}
                read={read}
                currentlyReading={currentlyReading}
                wantToRead={wantToRead}
              />
            );
          }}
        />
        <Route
          path={'/search'}
          render={() => {
            return <Search updateShelf={this.updateShelf} />;
          }}
        />
        <Route path={'/book/:bookId'} component={BookDetails} />
      </div>
    );
  }
}

export default App;
