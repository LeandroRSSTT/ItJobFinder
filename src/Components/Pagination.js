import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center justify-center w-full mx-4 rounded-lg bg-base-200 text-base-content sm:w-auto">
        <button className="px-6 py-4 bg-primary text-primary-content text-lg font-bold" onClick={handlePrevPage}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div className="px-4 py-3 text-lg font-semibold">
          Page {currentPage} / {totalPages}
        </div>
        <button className="px-6 py-4 bg-primary text-primary-content text-lg font-bold" onClick={handleNextPage}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
