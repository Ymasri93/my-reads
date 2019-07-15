import React from 'react';

function BookDetails({ location }) {
  return <div>{JSON.stringify(location.state.book)}</div>;
}

export default BookDetails;
