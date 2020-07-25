import React from 'react';
import './Loading.scss';

const Loading = (): JSX.Element => {
  return (
    <section className="loading-page">
      <div className="loading-page__wrapper page-wrapper">
        <div className="loading-page__spinner" aria-hidden="true"></div>
        <h1 className="loading-page__message">Loading...</h1>
      </div>
    </section>
  )
}

export default Loading;
