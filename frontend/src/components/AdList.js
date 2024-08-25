import React from 'react';
import AdCard from './AdCard';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

import classes from './AdList.module.scss';

export default function AdList({ ads, currentPage, totalPages, onPageChange }) {
  return (
    <div className={classes.ads}>
      <ul>
        {ads.map((ad) => (
          <li key={ad.id}>
            <Link to={`/ads/${ad.id}`}>
              <AdCard address={ad.address} />
            </Link>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
