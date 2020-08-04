import React from 'react';
import { Link } from 'react-router-dom';
import GuideForm from '../general/guide-form/GuideForm';
import './AddGuide.scss';

const AddGuide = (): JSX.Element => {
  return (
    <section className="add-guide">
      <div className="add-guide__wrapper page-wrapper">
        <div className="add-guide__header">
          <h1 className="add-guide__heading">Add a Weekly Study Guide</h1>
          <Link to="/admin-dashboard/weekly-study-guides">Back to Weekly Study Guides</Link>
        </div>
        <p className="add-guide__description">
          This is the interface for adding a new weekly study guide.
        </p>
        <GuideForm />
      </div>
    </section>
  )
}

export default AddGuide;
