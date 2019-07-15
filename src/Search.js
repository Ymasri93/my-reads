import React, { Component } from 'react';
import { search } from './services/BooksApi';
import BooksShelf from './BooksShelf';
import { throttle } from 'throttle-debounce';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      books: []
    };
    this.updateQueryThrottled = throttle(50, this.updateQuery);
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
    const { query, books } = this.state;
    const { updateShelf } = this.props;
    return (
      <div>
        <input
          type={'text'}
          placeholder={'Search Book'}
          value={query}
          onChange={event => this.updateQueryThrottled(event.target.value)}
        />
        {books.length > 0 && (
          <BooksShelf books={books} updateShelf={updateShelf} />
        )}
      </div>
    );
  }
}

export default Search;
