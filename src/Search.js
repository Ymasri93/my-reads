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

    books = books.filter(book => {
      return (
        !wantToRead.includes(book) &&
        !read.includes(book) &&
        !currentlyReading.includes(book)
      );
    });
    const { updateShelf } = this.props;
    return (
      <div>
        <DebounceInput
          debounceTimeout={1000}
          type={'text'}
          placeholder={'Search Book'}
          value={query}
          onChange={event => this.updateQuery(event.target.value)}
        />
        {books.length > 0 && (
          <BooksShelf books={books} updateShelf={updateShelf} />
        )}
      </div>
    );
  }
}

export default Search;
