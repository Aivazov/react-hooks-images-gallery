import React from 'react';

export default function Button({ onClick }) {
  return (
    <button
      type="button"
      className="btn btn-primary mt-3 mb-3"
      onClick={onClick}
    >
      Load More
    </button>
  );
}
