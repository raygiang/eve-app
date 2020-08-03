import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEqual } from 'lodash';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import Loading from '../../general/loading/Loading';
import GuideList from './guide-list/GuideList';
import './WeeklyStudyGuides.scss';

const WeeklyStudyGuides = (): JSX.Element => {
  useFirestoreConnect([
    {
      collection: 'weekly-study-guides',
      // startAt: new Date(),
      // endBefore: new Date(),
      orderBy: ['startDate', 'asc'],
      storeAs: 'weekly-study-guides' },
  ]);

  const studyGuides = useSelector(({ firestore: { ordered } }: any) => ordered['weekly-study-guides'], isEqual);

  if(!isLoaded(studyGuides)) return <Loading />;

  return (
    <section className="study-guides-admin">
      <div className="study-guides-admin__wrapper page-wrapper">
        <h1 className="study-guides-admin__heading">Weekly Study Guides</h1>
        <p className="study-guides-admin__description">
          This is the interface for editing groups inside of a subcategory.
        </p>
        <div className="study-guides-admin__add-container">
          <Link to="/admin-dashboard/add-study-guide" className="study-guides-admin__add-link">
            Add New Study Guide
          </Link>
        </div>
        <GuideList studyGuides={studyGuides} />
      </div>
    </section>
  )
}

export default WeeklyStudyGuides;
