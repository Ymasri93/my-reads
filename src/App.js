import React from 'react';
import './App.css';
import { Link, Route } from 'react-router-dom';
import Home from './Home';
import Search from './Search';
import BookDetails from './BookDetails';

function App() {
  return (
    <div className="app">
      <div className="header">
        <Link to={'/'}>Home</Link>
        <Link to={'/search'}>Search</Link>
      </div>
      <Route exact path={'/'} component={Home} />
      <Route path={'/search'} component={Search} />
      <Route path={'/book/:bookId'} component={BookDetails} />
    </div>
  );
}

export default App;
