import { useNavigation } from 'react-router-dom';

import classes from './Pagination.module.scss';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const navigation = useNavigation();

  const pageNumbers = [];
  const maxPagesToShow = 5;

  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  const adjustedStartPage = Math.max(1, endPage - maxPagesToShow + 1);

  if (currentPage > 3) {
    pageNumbers.push('prev');
  }

  for (let i = adjustedStartPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (currentPage < totalPages - 2) {
    pageNumbers.push('next');
  }
  const isLoading = navigation.state === 'loading';
  console.log(isLoading);

  return (
    <div>
      {pageNumbers.map((number) =>
        number === 'prev' ? (
          <button
            className={classes.button}
            key="prev"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
          >
            &laquo; Previous
          </button>
        ) : number === 'next' ? (
          <button
            className={classes.button}
            key="next"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
          >
            Next &raquo;
          </button>
        ) : (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`${classes.button} ${
              number === currentPage ? 'active' : ''
            }`}
            disabled={isLoading}
          >
            {number}
          </button>
        )
      )}
    </div>
  );
}
