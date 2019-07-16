import React, { Component } from 'react';
import { search } from './services/BooksApi';
import BooksShelf from './BooksShelf';
import { DebounceInput } from 'react-debounce-input';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      books: []
    };
  }

  updateQuery = query => {
    if (query !== '') {
      this.setState({ query }, () => {
        const trimmedQuery = query.trim();
        search(trimmedQuery).then(books => {
          if (Array.isArray(books)) {
            this.setState({
              books
            });
          } else {
            this.setState({
              books: []
            });
          }
        });
      });
    } else {
      this.setState({
        query: '',
        books: []
      });
    }
  };

  render() {
    const { query } = this.state;
    let { books } = this.state;
    const { wantToRead, read, currentlyReading } = this.props;
    const shelvedBooks = books.map(book => {
      wantToRead.find(b => {
        if (book.id === b.id) {
          book.shelf = 'wantToRead';
          return book;
        }
        return null;
      });
      read.find(b => {
        if (book.id === b.id) {
          book.shelf = 'read';
          return book;
        }
        return null;
      });
      currentlyReading.find(b => {
        if (book.id === b.id) {
          book.shelf = 'currentlyReading';
          return book;
        }
        return null;
      });
      return book;
    });
    const { updateShelf } = this.props;
    return (
      <div>
        <DebounceInput
          debounceTimeout={300}
          type={'text'}
          placeholder={'Search Book'}
          value={query}
          onChange={event => this.updateQuery(event.target.value)}
        />
        {books.length > 0 && (
          <BooksShelf books={shelvedBooks} updateShelf={updateShelf} />
        )}
      </div>
    );
  }
}

export default Search;
