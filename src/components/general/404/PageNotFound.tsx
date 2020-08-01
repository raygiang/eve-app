import React from 'react';
import './PageNotFound.scss';

const PageNotFound = (): JSX.Element => {
  return (
    <section className="page-not-found">
      <div className="page-not-found__wrapper page-wrapper">
        <h1 className="page-not-found__message">This page does not exist.</h1>
      </div>
    </section>
  )
}

export default PageNotFound;
