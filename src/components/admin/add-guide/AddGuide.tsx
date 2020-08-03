import React from 'react';
import GuideForm from './guide-form/GuideForm';
import './AddGuide.scss';

const AddGuide = (): JSX.Element => {
  return (
    <section className="add-guide">
      <div className="add-guide__wrapper page-wrapper">
        <h1 className="add-guide__heading">Add a Weekly Study Guide</h1>
        <p className="add-guide__description">
          This is the interface for adding a new weekly study guide.
        </p>
        <GuideForm />
      </div>
    </section>
  )
}

export default AddGuide;
